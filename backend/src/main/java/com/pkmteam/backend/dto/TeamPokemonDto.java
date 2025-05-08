package com.pkmteam.backend.dto;

public record TeamPokemonDto(
        Integer userTeamId,
        Short teamMember,
        PokemonDto pokemon,
        AbilityDto ability,
        NatureDto nature
) {
}
