package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(
        name = "user_team",
        schema = "public",
        catalog = "postgres",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"fk_user_uid", "name"})
        },
        indexes = {
                @Index(name = "idx_user_team_created_at", columnList = "created_at"),
                @Index(name = "idx_user_team_user_created_at", columnList = "fk_user_uid, created_at")
        }
)
public class UserTeamEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pk_user_team", nullable = false)
    private int pkUserTeam;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_uid", nullable = false)
    private UserEntity user;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "team", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TeamPokemonEntity> teamMembers;
}
