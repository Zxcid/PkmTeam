package com.pkmteam.backend.controller;

import com.pkmteam.backend.dto.TeamDto;
import com.pkmteam.backend.dto.TeamRequestDto;
import com.pkmteam.backend.service.TeamService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @PostMapping("/save")
    //TODO get token in auth context, not from header. Now firebase auth is on backend!!
    public ResponseEntity<TeamDto> createOrUpdateTeam(@RequestBody TeamRequestDto request, HttpServletRequest httpServletRequest) {
        String firebaseUid = extractFirebaseUid(httpServletRequest);
        return ResponseEntity.ok(teamService.saveTeam(firebaseUid, request));
    }

    private String extractFirebaseUid(HttpServletRequest request) {
        String firebaseUid = request.getHeader("X-Firebase-Uid");
        if (firebaseUid == null || firebaseUid.isBlank()) {
            throw new IllegalArgumentException("Missing required header: X-Firebase-Uid");
        }
        return firebaseUid;
    }
}
