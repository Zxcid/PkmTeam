package com.pkmteam.backend.controller;

import com.pkmteam.backend.config.auth.UserPrincipal;
import com.pkmteam.backend.dto.UserTeamDto;
import com.pkmteam.backend.dto.TeamRequestDto;
import com.pkmteam.backend.service.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @PostMapping
    public ResponseEntity<UserTeamDto> save(@Valid @RequestBody TeamRequestDto request, @AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(teamService.save(user.firebaseUid(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserTeamDto> update(@PathVariable Integer id, @RequestBody TeamRequestDto request, @AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(teamService.update(user.firebaseUid(), request, id));
    }

    @GetMapping
    public ResponseEntity<List<UserTeamDto>> getByUser(@AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(teamService.getByUser(user.firebaseUid()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserTeamDto> getById(@PathVariable Integer id, @AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(teamService.getByUserAndId(id, user.firebaseUid()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id, @AuthenticationPrincipal UserPrincipal user) {
        this.teamService.delete(id, user.firebaseUid());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkTeamNameAvailability(@RequestParam String name,
                                                             @AuthenticationPrincipal UserPrincipal user) {
        return ResponseEntity.ok(teamService.checkNameAvailability(user.firebaseUid(), name));
    }
}
