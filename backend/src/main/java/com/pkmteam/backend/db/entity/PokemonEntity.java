package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "pokemon", schema = "public", catalog = "postgres")
public class PokemonEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "pk_pokemon", nullable = false)
    private int pkPokemon;
    @Basic
    @Column(name = "index", nullable = false)
    private int index;
    @Basic
    @Column(name = "name", nullable = false, length = 50)
    private String name;
    @Basic
    @Column(name = "height", nullable = false)
    private int height;
    @Basic
    @Column(name = "weight", nullable = false)
    private int weight;
    @Basic
    @Column(name = "base_experience", nullable = false)
    private int baseExperience;
    @Basic
    @Column(name = "sprite_ref", nullable = false, length = 1000)
    private String spriteRef;
    @OneToMany(mappedBy = "pokemon", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<PokemonTypeEntity> pokemonTypes;
}
