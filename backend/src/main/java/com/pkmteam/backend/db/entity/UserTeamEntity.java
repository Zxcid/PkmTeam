package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.Objects;

@Data
@Entity
@Table(name = "user_team", schema = "public", catalog = "postgres")
public class UserTeamEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "pk_user_team", nullable = false)
    private int pkUserTeam;

    @Basic
    @Column(name = "name", nullable = false, length = 25)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_uid", nullable = false)
    private UserEntity user;

    @Basic
    @Column(name = "team_number", nullable = false)
    private int teamNumber;

    @OneToMany(mappedBy = "team", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TeamPokemonEntity> teamMembers;
}
