package com.pkmteam.backend.controller;

import com.pkmteam.backend.dto.AbilityDto;
import com.pkmteam.backend.dto.NatureDto;
import com.pkmteam.backend.dto.PokemonDto;
import com.pkmteam.backend.service.PokemonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/pokemon")
@RequiredArgsConstructor
public class PokemonController {

    private final PokemonService pokemonService;

    @GetMapping("/search-autocomplete")
    public ResponseEntity<List<PokemonDto>> searchPokemonAutocomplete(@RequestParam String name) {
        if (name.isBlank())
            return ResponseEntity.ok(Collections.emptyList());

        return ResponseEntity.ok(pokemonService.searchPokemonAutocomplete(name));
    }

    @GetMapping("/abilities")
    public ResponseEntity<List<AbilityDto>> getAllAbilities() {
        return ResponseEntity.ok(pokemonService.getAllAbilities());
    }

    @GetMapping("/natures")
    public ResponseEntity<List<NatureDto>> getAllNatures() {
        return ResponseEntity.ok(pokemonService.getAllNatures());
    }
}
