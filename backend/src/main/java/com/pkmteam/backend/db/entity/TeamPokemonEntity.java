package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Entity
@Table(name = "team_pokemon")
@Data
public class TeamPokemonEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_team_pokemon")
    private Integer pkTeamPokemon;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_team", nullable = false)
    private UserTeamEntity team;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_pokemon", nullable = false)
    private PokemonEntity pokemon;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_ability")
    private AbilityEntity ability;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_nature")
    private NatureEntity nature;

    @Column(name = "team_member", nullable = false)
    private Short teamMember;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TeamPokemonEntity that = (TeamPokemonEntity) o;
        return Objects.equals(getPkTeamPokemon(), that.getPkTeamPokemon()) && Objects.equals(getTeam(), that.getTeam()) && Objects.equals(getPokemon(), that.getPokemon()) && Objects.equals(getAbility(), that.getAbility()) && Objects.equals(getNature(), that.getNature()) && Objects.equals(getTeamMember(), that.getTeamMember());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getPkTeamPokemon(), getTeam(), getPokemon(), getAbility(), getNature(), getTeamMember());
    }
}
