package com.pkmteam.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PokemonDto {
    private Integer pkPokemon;
    private Integer index;
    private String name;
    private Integer height;
    private Integer weight;
    private Integer baseExperience;
    private String spriteRef;
    private List<String> types;
}
