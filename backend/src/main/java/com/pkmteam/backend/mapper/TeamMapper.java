package com.pkmteam.backend.mapper;

import com.pkmteam.backend.db.entity.TeamPokemonEntity;
import com.pkmteam.backend.db.entity.UserTeamEntity;
import com.pkmteam.backend.dto.PokemonDto;
import com.pkmteam.backend.dto.TeamDto;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = PokemonMapper.class)
public interface TeamMapper {
    @Mapping(target = "teamMembers", source = "teamMembers")
    TeamDto userTeamEntityToTeamDto(UserTeamEntity entity);

    /**
     * This method let mapstruct know how to convert a TeamPokemonEntity into a PokemonDto.
     * This is useful in order to let mapstruct use the PokemonMapper class automatically, without having to inject it.
     */
    default PokemonDto mapTeamPokemonEntityToPokemonDto(TeamPokemonEntity teamMember) {
        return pokemonMapper().pokemonEntityToPokemonDto(teamMember.getPokemon());
    }

    default PokemonMapper pokemonMapper() {
        throw new UnsupportedOperationException("This method should be implemented by MapStruct at runtime.");
    }
}
