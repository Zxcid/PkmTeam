package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "stats", schema = "public", catalog = "postgres")
public class StatEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "pk_stat", nullable = false)
    private int pkStat;
    @Basic
    @Column(name = "name", nullable = false, length = 50)
    private String name;
}
