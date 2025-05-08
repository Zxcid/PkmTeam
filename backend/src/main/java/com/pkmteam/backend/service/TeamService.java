package com.pkmteam.backend.service;

import com.google.api.gax.rpc.NotFoundException;
import com.pkmteam.backend.db.entity.*;
import com.pkmteam.backend.db.repository.*;
import com.pkmteam.backend.dto.*;
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

    @Transactional
    public UserTeamDto update(String firebaseUid, TeamRequestDto request, Integer pkUserTeam) {
        UserTeamEntity team = userTeamRepository.findById(pkUserTeam)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Team to update not found."));

        if (!team.getUser().getFirebaseUid().equals(firebaseUid))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This team does not belong to you.");

        List<Integer> pkPokemons = request.teamPokemonRequest().stream()
                .map(TeamPokemonRequestDto::pkPokemon)
                .toList();        if (pkPokemons.size() > 6)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A team can have no more than 6 Pokémon!");

        List<PokemonEntity> pokemons = pokemonRepository.findAllById(pkPokemons);
        if (pokemons.size() != pkPokemons.size())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "One or more Pokémon not found.");

        team.getTeamMembers().removeAll(
                team.getTeamMembers()
        );

        List<TeamPokemonEntity> newMembers = createTeamMembers(team, request.teamPokemonRequest());
        team.getTeamMembers().addAll(newMembers);
        team.setName(request.teamName());

        return userTeamMapper.userTeamEntityToDto(
                userTeamRepository.save(team)
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
        var abilities = abilityRepository.findAllById(
                pokemons.stream().map(TeamPokemonRequestDto::pkAbility).filter(Objects::nonNull).toList()
        ).stream().collect(Collectors.toMap(AbilityEntity::getPkAbility, Function.identity()));

        var natures = natureRepository.findAllById(
                pokemons.stream().map(TeamPokemonRequestDto::pkNature).filter(Objects::nonNull).toList()
        ).stream().collect(Collectors.toMap(NatureEntity::getPkNature, Function.identity()));

        var pokemonMap = pokemonRepository.findAllById(
                pokemons.stream().map(TeamPokemonRequestDto::pkPokemon).toList()
        ).stream().collect(Collectors.toMap(PokemonEntity::getPkPokemon, Function.identity()));

        return IntStream.range(0, pokemons.size())
                .mapToObj(i -> {
                    var dto = pokemons.get(i);
                    var pokemon = Optional.ofNullable(pokemonMap.get(dto.pkPokemon()))
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pokemon not found with id: " + dto.pkPokemon()));

                    var ability = dto.pkAbility() == null ? null : Optional.ofNullable(abilities.get(dto.pkAbility()))
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ability not found with id: " + dto.pkAbility()));

                    var nature = dto.pkNature() == null ? null : Optional.ofNullable(natures.get(dto.pkNature()))
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nature not found with id: " + dto.pkNature()));

                    var memberId = new TeamPokemonEntityPK(team.getPkUserTeam(), (short) (i + 1));
                    var member = new TeamPokemonEntity();
                    member.setId(memberId);
                    member.setTeam(team);
                    member.setPokemon(pokemon);
                    member.setAbility(ability);
                    member.setNature(nature);
                    return member;
                }).toList();
    }
}
