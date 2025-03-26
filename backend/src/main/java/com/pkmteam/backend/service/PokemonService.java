package com.pkmteam.backend.service;

import com.pkmteam.backend.db.repository.PokemonRepository;
import com.pkmteam.backend.dto.PokemonDto;
import com.pkmteam.backend.mapper.PokemonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PokemonService {

    private final PokemonRepository pokemonRepository;
    private final PokemonMapper pokemonMapper;

    public List<PokemonDto> searchPokemonAutocomplete(String name) {
        return pokemonMapper.pokemonEntityToPokemonDto(
                pokemonRepository.findByNameIgnoreCase(name)
        );
    }
}
