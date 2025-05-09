package com.pkmteam.backend.service;

import com.pkmteam.backend.db.entity.*;
import com.pkmteam.backend.db.repository.*;
import com.pkmteam.backend.dto.TeamPokemonRequestDto;
import com.pkmteam.backend.dto.TeamRequestDto;
import com.pkmteam.backend.dto.UserTeamDto;
import com.pkmteam.backend.dto.enums.GlobalConfigKeys;
import com.pkmteam.backend.mapper.UserTeamMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static com.pkmteam.backend.dto.enums.UserRole.PREMIUM;

@Slf4j
@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamNativeRepository teamNativeRepository;
    private final UserTeamRepository userTeamRepository;
    private final UserRepository userRepository;
    private final PokemonRepository pokemonRepository;
    private final AbilityRepository abilityRepository;
    private final NatureRepository natureRepository;
    private final UserTeamMapper userTeamMapper;
    private final GlobalConfigurationService globalConfigurationService;

    @Transactional(readOnly = true)
    public List<UserTeamDto> getByUser(String firebaseUid) {
        return this.userTeamRepository.findAllByUser_FirebaseUid(firebaseUid)
                .stream()
                .map(userTeamMapper::userTeamEntityToDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public UserTeamDto getByUserAndId(Integer pkUserTeam, String firebaseUid) {
        UserTeamEntity team = userTeamRepository.findByPkUserTeamAndUser_FirebaseUid(pkUserTeam, firebaseUid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found."));

        return userTeamMapper.userTeamEntityToDto(team);
    }

    @Transactional
    public UserTeamDto save(String firebaseUid, TeamRequestDto request) {

        UserEntity user = userRepository.findById(firebaseUid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));

        int maxTeams = globalConfigurationService.getIntValue(GlobalConfigKeys.BASIC_USER_MAX_TEAMS);

        int existingTeams = userTeamRepository.countByUser_FirebaseUid(firebaseUid);
        if (existingTeams >= maxTeams && !PREMIUM.toString().equalsIgnoreCase(user.getRole().getName()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can have max 3 teams. Upgrade to premium to unlock more!");

        List<Integer> pkPokemons = request.teamPokemonRequest().stream()
                .map(TeamPokemonRequestDto::pkPokemon)
                .toList();
        if (pkPokemons.size() > 6)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A team can have no more then 6 pokemon in it!");

        List<PokemonEntity> pokemons = pokemonRepository.findAllById(pkPokemons);
        if (pokemons.size() != pkPokemons.size())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "One or more pokemon not found.");

        UserTeamEntity team = new UserTeamEntity();
        team.setUser(user);
        team.setName(request.teamName());
        team.setTeamMembers(
                createTeamMembers(team, request.teamPokemonRequest())
        );

        return userTeamMapper.userTeamEntityToDto(
                userTeamRepository.save(team)
        );
    }

    /**
     * Updates an existing team by replacing all its current members with the new configuration provided in the request.
     * <p>
     * This method performs the update by first executing a native SQL {@code DELETE} to remove all associated
     * {@code team_pokemon} entries, followed by a sequence of native {@code INSERT} statements to persist the new team members.
     * It also updates the team name if changed.
     * </p>
     * <p>
     * This approach avoids the known pitfalls of Hibernate's orphan removal and entity state conflicts,
     * particularly when working with {@code @OneToMany} associations and unique constraints on foreign keys.
     * </p>
     * <p>
     * For more context on the reasoning behind this native implementation, refer to the Javadoc of
     * {@link com.pkmteam.backend.db.repository.TeamNativeRepository}.
     * </p>
     *
     * @param firebaseUid the ID of the currently authenticated user
     * @param request      the new team configuration
     * @param pkUserTeam   the primary key of the team to update
     * @return the updated team DTO
     * @throws ResponseStatusException if the team is not found, does not belong to the user, or input is invalid
     */
    @Transactional
    public UserTeamDto update(String firebaseUid, TeamRequestDto request, Integer pkUserTeam) {
        UserTeamEntity team = userTeamRepository.findById(pkUserTeam)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team to update not found."));

        if (!team.getUser().getFirebaseUid().equals(firebaseUid))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This team does not belong to you.");

        List<Integer> pkPokemons = request.teamPokemonRequest().stream()
                .map(TeamPokemonRequestDto::pkPokemon)
                .toList();
        if (pkPokemons.size() > 6)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A team can have no more than 6 Pokémon!");

        List<PokemonEntity> pokemons = pokemonRepository.findAllById(pkPokemons);
        if (pokemons.size() != pkPokemons.size())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "One or more Pokémon not found.");

        teamNativeRepository.deleteAllTeamMembers(pkUserTeam);

        final var members = request.teamPokemonRequest();
        for (int i = 0; i < members.size(); i++) {
            var dto = members.get(i);
            teamNativeRepository.insertTeamMember(
                    pkUserTeam,
                    i + 1, // team_member 1..6
                    dto.pkPokemon(),
                    dto.pkAbility(),
                    dto.pkNature()
            );
        }

        teamNativeRepository.updateTeamName(pkUserTeam, request.teamName());

        return userTeamMapper.userTeamEntityToDto(
                userTeamRepository.findById(pkUserTeam)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Updated team not found."))
        );
    }

    @Transactional
    public void delete(Integer pkUserTeam, String firebaseUid) {
        UserTeamEntity team = userTeamRepository.findById(pkUserTeam)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team not found."));

        if (!team.getUser().getFirebaseUid().equals(firebaseUid))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only delete your own teams.");

        userTeamRepository.delete(team);
    }

    public boolean checkNameAvailability(String firebaseUid, String teamName) {
        return !userTeamRepository.existsByUser_FirebaseUidAndNameIgnoreCase(firebaseUid, teamName);
    }

    private List<TeamPokemonEntity> createTeamMembers(UserTeamEntity team, List<TeamPokemonRequestDto> pokemons) {
        final var abilities = abilityRepository.findAllById(
                pokemons.stream().map(TeamPokemonRequestDto::pkAbility).filter(Objects::nonNull).toList()
        ).stream().collect(Collectors.toMap(AbilityEntity::getPkAbility, Function.identity()));

        final var natures = natureRepository.findAllById(
                pokemons.stream().map(TeamPokemonRequestDto::pkNature).filter(Objects::nonNull).toList()
        ).stream().collect(Collectors.toMap(NatureEntity::getPkNature, Function.identity()));

        final var pokemonMap = pokemonRepository.findAllById(
                pokemons.stream().map(TeamPokemonRequestDto::pkPokemon).toList()
        ).stream().collect(Collectors.toMap(PokemonEntity::getPkPokemon, Function.identity()));

        return IntStream.range(0, pokemons.size())
                .mapToObj(i -> {
                    final var dto = pokemons.get(i);
                    final var member = new TeamPokemonEntity();
                    member.setTeam(team);
                    member.setTeamMember((short) (i + 1));
                    member.setPokemon(
                            Optional.ofNullable(pokemonMap.get(dto.pkPokemon()))
                                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pokemon not found with id: " + dto.pkPokemon()))
                    );
                    member.setAbility(dto.pkAbility() == null ? null :
                            Optional.ofNullable(abilities.get(dto.pkAbility()))
                                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ability not found with id: " + dto.pkAbility()))
                    );
                    member.setNature(dto.pkNature() == null ? null :
                            Optional.ofNullable(natures.get(dto.pkNature()))
                                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nature not found with id: " + dto.pkNature()))
                    );
                    return member;
                }).toList();
    }
}
