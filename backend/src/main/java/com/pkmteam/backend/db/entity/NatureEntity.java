package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "nature", schema = "public", catalog = "postgres")
public class NatureEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "pk_nature", nullable = false)
    private int pkNature;
    @Basic
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "malus_stat", nullable = false)
    private StatEntity malusStat;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bonus_stat", nullable = false)
    private StatEntity bonusStat;
}
