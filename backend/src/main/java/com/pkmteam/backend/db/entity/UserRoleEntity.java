package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_role", schema = "public", catalog = "postgres")
public class UserRoleEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "pk_role", nullable = false)
    private short pkRole;
    @Basic
    @Column(name = "name", nullable = false, length = 10)
    private String name;
}
