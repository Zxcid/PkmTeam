package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "type", schema = "public", catalog = "postgres")
public class TypeEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "pk_type", nullable = false)
    private int pkType;
    @Basic
    @Column(name = "name", nullable = false, length = 25)
    private String name;
}
