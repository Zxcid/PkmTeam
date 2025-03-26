package com.pkmteam.backend.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class TeamPokemonEntityPK implements Serializable {

    @Column(name = "fk_user_team")
    private Integer userTeamId;

    @Column(name = "team_member")
    private Short teamMember;

}
