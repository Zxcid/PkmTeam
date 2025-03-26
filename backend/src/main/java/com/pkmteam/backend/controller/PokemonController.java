package com.pkmteam.backend.controller;

import com.pkmteam.backend.dto.PokemonDto;
import com.pkmteam.backend.service.PokemonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
