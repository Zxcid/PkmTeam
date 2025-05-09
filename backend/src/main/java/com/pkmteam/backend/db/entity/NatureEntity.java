package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NatureEntity that = (NatureEntity) o;
        return getPkNature() == that.getPkNature() && Objects.equals(getName(), that.getName()) && Objects.equals(getMalusStat(), that.getMalusStat()) && Objects.equals(getBonusStat(), that.getBonusStat());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getPkNature(), getName(), getMalusStat(), getBonusStat());
    }
}
