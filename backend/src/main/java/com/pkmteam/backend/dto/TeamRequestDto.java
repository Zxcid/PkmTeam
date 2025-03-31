package com.pkmteam.backend.dto;

import java.util.List;

public record TeamRequestDto(String teamName, List<Integer> pkPokemons) {
}
