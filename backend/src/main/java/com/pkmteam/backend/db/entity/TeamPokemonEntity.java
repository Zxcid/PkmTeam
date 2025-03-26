package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Data
@Entity
@Table(name = "team_pokemon", schema = "public", catalog = "postgres")
public class TeamPokemonEntity {

    @EmbeddedId
    private TeamPokemonEntityPK id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userTeamId")
    @JoinColumn(name = "fk_user_team", nullable = false)
    private UserTeamEntity team;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_pokemon", nullable = false)
    private PokemonEntity pokemon;

}
