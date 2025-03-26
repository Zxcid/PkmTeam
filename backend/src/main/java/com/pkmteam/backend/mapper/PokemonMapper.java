package com.pkmteam.backend.mapper;

import com.pkmteam.backend.db.entity.PokemonEntity;
import com.pkmteam.backend.db.entity.PokemonTypeEntity;
import com.pkmteam.backend.dto.PokemonDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PokemonMapper {

    @Mapping(target = "types", expression = "java(mapTypes(pokemonEntity.getPokemonTypes()))")
    PokemonDto pokemonEntityToPokemonDto(PokemonEntity pokemonEntity);

    @Mapping(target = "types", expression = "java(mapTypes(entities.get(0).getPokemonTypes()))")
    List<PokemonDto> pokemonEntityToPokemonDto(List<PokemonEntity> entities);

    default List<String> mapTypes(List<PokemonTypeEntity> pokemonTypes) {
        return pokemonTypes.stream()
                .map(pokemonType -> pokemonType.getType().getName())
                .collect(Collectors.toList());
    }
}
