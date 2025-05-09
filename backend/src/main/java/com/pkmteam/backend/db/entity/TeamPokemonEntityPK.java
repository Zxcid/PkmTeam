package com.pkmteam.backend.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class TeamPokemonEntityPK implements Serializable {

    @Column(name = "fk_user_team")
    private Integer userTeamId;

    @Column(name = "team_member")
    private Short teamMember;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TeamPokemonEntityPK that = (TeamPokemonEntityPK) o;
        return Objects.equals(getUserTeamId(), that.getUserTeamId()) && Objects.equals(getTeamMember(), that.getTeamMember());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserTeamId(), getTeamMember());
    }
}
