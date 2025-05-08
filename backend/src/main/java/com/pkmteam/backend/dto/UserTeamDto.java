package com.pkmteam.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public record UserTeamDto (int pkUserTeam, String name, LocalDateTime createdAt, List<TeamPokemonDto> teamMembers) {
}
