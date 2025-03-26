package com.pkmteam.backend.mapper;

import com.pkmteam.backend.db.entity.TeamPokemonEntity;
import com.pkmteam.backend.db.entity.UserTeamEntity;
import com.pkmteam.backend.dto.PokemonDto;
import com.pkmteam.backend.dto.TeamDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = PokemonMapper.class)
public interface TeamMapper {

    TeamMapper INSTANCE = Mappers.getMapper(TeamMapper.class);

    @Mapping(target = "teamMembers", source = "teamMembers", qualifiedByName = "mapTeamMembers")
    TeamDto userTeamEntityToTeamDto(UserTeamEntity entity);

    @Named("mapTeamMembers")
    default List<PokemonDto> mapTeamMembers(List<TeamPokemonEntity> teamMembers) {
        PokemonMapper pokemonMapper = INSTANCE.getPokemonMapper();

        return teamMembers.stream()
                .map(teamPokemonEntity -> pokemonMapper.pokemonEntityToPokemonDto(teamPokemonEntity.getPokemon()))
                .collect(Collectors.toList());
    }

    // Metodo per ottenere un'istanza di PokemonMapper (injected automaticamente da MapStruct quando usi componentModel = "spring")
    default PokemonMapper getPokemonMapper() {
        return Mappers.getMapper(PokemonMapper.class);
    }
}
