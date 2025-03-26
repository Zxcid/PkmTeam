package com.pkmteam.backend.dto;

import lombok.Value;

import java.util.List;

public record TeamRequestDto(String teamName, Integer teamNumber, List<Integer> pokemonIds) {
}
