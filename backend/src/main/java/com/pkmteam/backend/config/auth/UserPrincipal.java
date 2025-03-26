package com.pkmteam.backend.config.auth;

public record UserPrincipal(String firebaseUid, String role) {
}
