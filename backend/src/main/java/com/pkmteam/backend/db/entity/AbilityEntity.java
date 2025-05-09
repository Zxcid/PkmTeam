package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Data
@Entity
@Table(name = "ability", schema = "public", catalog = "postgres")
public class AbilityEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "pk_ability", nullable = false)
    private int pkAbility;
    @Basic
    @Column(name = "name", nullable = false, length = 50)
    private String name;
    @Basic
    @Column(name = "description", nullable = false, length = 1000)
    private String description;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AbilityEntity that = (AbilityEntity) o;
        return getPkAbility() == that.getPkAbility() && Objects.equals(getName(), that.getName()) && Objects.equals(getDescription(), that.getDescription());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getPkAbility(), getName(), getDescription());
    }
}
