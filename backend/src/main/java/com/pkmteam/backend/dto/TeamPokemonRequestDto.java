package com.pkmteam.backend.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record TeamPokemonRequestDto(
        @NotNull Integer pkPokemon,
        @PositiveOrZero @Nullable Integer pkAbility,
        @PositiveOrZero @Nullable Integer pkNature) {
}
