package com.pkmteam.backend.dto.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum GlobalConfigKeys {
    BASIC_USER_MAX_TEAMS("basicUserMaxTeams", "The max number of teams a basic user can have.");

    private final String key;
    private final String description;
}
