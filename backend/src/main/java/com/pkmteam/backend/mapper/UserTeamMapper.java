package com.pkmteam.backend.mapper;

import com.pkmteam.backend.db.entity.TeamPokemonEntity;
import com.pkmteam.backend.db.entity.UserEntity;
import com.pkmteam.backend.db.entity.UserTeamEntity;
import com.pkmteam.backend.dto.PokemonDto;
import com.pkmteam.backend.dto.TeamRequestDto;
import com.pkmteam.backend.dto.UserTeamDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", uses = PokemonMapper.class)
public abstract class UserTeamMapper {

    @Autowired
    protected PokemonMapper pokemonMapper;

    @Mapping(target = "pkUserTeam", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "teamMembers", ignore = true)
    @Mapping(target = "user", source = "user")
    @Mapping(target = "name", source = "request.teamName")
    public abstract UserTeamEntity fromDto(TeamRequestDto request, UserEntity user);

    @Mapping(target = "teamMembers", source = "teamMembers")
    public abstract UserTeamDto userTeamEntityToTeamDto(UserTeamEntity entity);

    protected PokemonDto mapTeamPokemonEntityToPokemonDto(TeamPokemonEntity teamMember) {
        return pokemonMapper.pokemonEntityToPokemonDto(teamMember.getPokemon());
    }
}

