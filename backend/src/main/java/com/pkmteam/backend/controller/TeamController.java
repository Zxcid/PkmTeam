package com.pkmteam.backend.controller;

import com.pkmteam.backend.config.auth.UserPrincipal;
import com.pkmteam.backend.dto.UserTeamDto;
import com.pkmteam.backend.dto.TeamRequestDto;
import com.pkmteam.backend.service.TeamService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @PostMapping("/save")
    public ResponseEntity<UserTeamDto> createTeam(@RequestBody TeamRequestDto request, @AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(teamService.createTeam(user.firebaseUid(), request));
    }

    @GetMapping("/check-name")
    public ResponseEntity<Boolean> checkTeamNameAvailability(@RequestParam String name,
                                                             @AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(teamService.checkTeamNameAvailability(user.firebaseUid(), name));
    }
}
