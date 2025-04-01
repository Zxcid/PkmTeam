package com.pkmteam.backend.service;

import com.pkmteam.backend.db.entity.*;
import com.pkmteam.backend.db.repository.PokemonRepository;
import com.pkmteam.backend.db.repository.UserRepository;
import com.pkmteam.backend.db.repository.UserTeamRepository;
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
import java.util.stream.IntStream;

import static com.pkmteam.backend.dto.enums.UserRole.PREMIUM;

@Slf4j
@Service
@RequiredArgsConstructor
public class TeamService {

    private final UserTeamRepository userTeamRepository;
    private final UserRepository userRepository;
    private final PokemonRepository pokemonRepository;
    private final UserTeamMapper userTeamMapper;
    private final GlobalConfigurationService globalConfigurationService;

    @Transactional(readOnly = true)
    public List<UserTeamDto> getByUser(String firebaseUid) {
        return this.userTeamRepository.findAllByUser_FirebaseUid(firebaseUid)
                .stream()
                .map(userTeamMapper::userTeamEntityToTeamDto)
                .toList();
    }

    @Transactional
    public UserTeamDto save(String firebaseUid, TeamRequestDto request) {

        UserEntity user = userRepository.findById(firebaseUid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found."));

        int maxTeams = globalConfigurationService.getIntValue(GlobalConfigKeys.BASIC_USER_MAX_TEAMS);

        int existingTeams = userTeamRepository.countByUser_FirebaseUid(firebaseUid);
        if (existingTeams >= maxTeams && !PREMIUM.toString().equalsIgnoreCase(user.getRole().getName()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can have max 3 teams. Upgrade to premium to unlock more!");

        List<Integer> pkPokemons = request.pkPokemons();
        if (pkPokemons.size() > 6)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A team can have no more then 6 pokemon in it!");

        List<PokemonEntity> pokemons = pokemonRepository.findAllById(pkPokemons);
        if (pokemons.size() != pkPokemons.size())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "One or more pokemon not found.");

        UserTeamEntity team = userTeamMapper.fromDto(request, user);

        team.setTeamMembers(
                createTeamMembers(team, pokemons)
        );

        return userTeamMapper.userTeamEntityToTeamDto(
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

    private List<TeamPokemonEntity> createTeamMembers(UserTeamEntity team, List<PokemonEntity> pokemons) {
        return IntStream.range(0, pokemons.size())
                .mapToObj(i -> {
                    var memberId = new TeamPokemonEntityPK(0, (short) (i + 1));
                    var member = new TeamPokemonEntity();
                    member.setId(memberId);
                    member.setTeam(team);
                    member.setPokemon(pokemons.get(i));
                    return member;
                })
                .toList();
    }
}
