package com.pkmteam.backend.service;

import com.pkmteam.backend.db.entity.*;
import com.pkmteam.backend.db.repository.PokemonRepository;
import com.pkmteam.backend.db.repository.TeamRepository;
import com.pkmteam.backend.db.repository.UserRepository;
import com.pkmteam.backend.dto.TeamDto;
import com.pkmteam.backend.dto.TeamRequestDto;
import com.pkmteam.backend.mapper.TeamMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final PokemonRepository pokemonRepository;
    private final TeamMapper teamMapper;

    public TeamDto saveTeam(String firebaseUid, TeamRequestDto requestDto) {

        UserEntity user = userRepository.findById(firebaseUid)
                .orElseThrow(() -> new IllegalArgumentException("User not found with uid: " + firebaseUid));

        UserTeamEntity team = teamRepository.findByUserFirebaseUidAndTeamNumber(firebaseUid, requestDto.teamNumber())
                .orElseGet(() -> {
                    var newTeam = new UserTeamEntity();
                    newTeam.setUser(user);
                    newTeam.setTeamNumber(requestDto.teamNumber());
                    return newTeam;
                });

        team.setName(requestDto.teamName());

        if (requestDto.pokemonIds().size() > 6)
            throw new IllegalArgumentException("A team can't contain more than 6 pokemon.");

        List<TeamPokemonEntity> teamMembers = new ArrayList<>();
        short slotNumber = 1;
        for (Integer pokemonId : requestDto.pokemonIds()) {
            PokemonEntity pokemon = pokemonRepository.findById(pokemonId)
                    .orElseThrow(() -> new IllegalArgumentException("Pokemon not found with id: " + pokemonId));

            var teamPokemon = new TeamPokemonEntity();
            teamPokemon.setId(new TeamPokemonEntityPK(null, slotNumber));
            teamPokemon.setTeam(team);
            teamPokemon.setPokemon(pokemon);

            teamMembers.add(teamPokemon);
            slotNumber++;
        }

        team.setTeamMembers(teamMembers);

        return teamMapper.userTeamEntityToTeamDto(
                teamRepository.save(team)
        );
    }
}
