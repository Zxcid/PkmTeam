package com.pkmteam.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class TeamDto {
    private String name;
    private Integer teamNumber;
    private List<PokemonDto> teamMembers;
}
