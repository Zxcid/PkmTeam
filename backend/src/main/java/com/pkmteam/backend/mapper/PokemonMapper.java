package com.pkmteam.backend.mapper;

import com.pkmteam.backend.db.entity.AbilityEntity;
import com.pkmteam.backend.db.entity.NatureEntity;
import com.pkmteam.backend.db.entity.PokemonEntity;
import com.pkmteam.backend.db.entity.PokemonTypeEntity;
import com.pkmteam.backend.dto.AbilityDto;
import com.pkmteam.backend.dto.NatureDto;
import com.pkmteam.backend.dto.PokemonDto;
import com.pkmteam.backend.service.FirebaseStorageService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class PokemonMapper {

    @Autowired
    protected FirebaseStorageService firebaseStorageService;

    public abstract AbilityDto abilityEntityToDto(AbilityEntity entity);
    public abstract List<AbilityDto> abilityEntityToDto(List<AbilityEntity> entities);

    public abstract NatureDto natureEntityToDto(NatureEntity entity);
    public abstract List<NatureDto> natureEntityToDto(List<NatureEntity> entities);

    @Mapping(target = "types", expression = "java(mapTypes(pokemonEntity.getPokemonTypes()))")
    @Mapping(target = "spriteUrl", expression = "java(firebaseStorageService.getSignedDownloadUrl(pokemonEntity.getSpriteRef()))")
    public abstract PokemonDto pokemonEntityToPokemonDto(PokemonEntity pokemonEntity);

    public List<PokemonDto> pokemonEntityToPokemonDto(List<PokemonEntity> entities) {
        return entities.stream()
                .map(this::pokemonEntityToPokemonDto)
                .toList();
    }

    protected List<String> mapTypes(List<PokemonTypeEntity> pokemonTypes) {
        return pokemonTypes.stream()
                .map(pokemonType -> pokemonType.getType().getName())
                .collect(Collectors.toList());
    }
}
