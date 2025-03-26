package com.pkmteam.backend.dto;

import lombok.Data;

@Data
public class UserDto {
    private String firebaseUid;
    private String name;
    private String role;
}
