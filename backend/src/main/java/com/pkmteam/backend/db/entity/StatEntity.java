package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StatEntity that = (StatEntity) o;
        return getPkStat() == that.getPkStat() && Objects.equals(getName(), that.getName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getPkStat(), getName());
    }
}
