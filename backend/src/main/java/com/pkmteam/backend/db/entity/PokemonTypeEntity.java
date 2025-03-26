package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "pokemon_type", schema = "public", catalog = "postgres")
public class PokemonTypeEntity {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_pokemon", nullable = false, foreignKey = @ForeignKey(name = "fk_pokemon"))
    private PokemonEntity pokemon;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_type", nullable = false, foreignKey = @ForeignKey(name = "fk_type"))
    private TypeEntity type;

    @Column(name = "type_order", nullable = false)
    private Short typeOrder;
}
