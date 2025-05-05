package com.pkmteam.backend.dto;

import java.util.List;

public record PokemonDto(
        Integer pkPokemon,
        Integer index,
        String name,
        Integer height,
        Integer weight,
        Integer baseExperience,
        String spriteRef,
        String spriteUrl,
        List<String> types) {
}
