package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Data
@Entity
@Table(name = "global_configuration", schema = "public", catalog = "postgres")
public class GlobalConfigurationEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "pk_global_configuration", nullable = false)
    private short pkGlobalConfiguration;
    @Basic
    @Column(name = "key", nullable = false, length = 25)
    private String key;
    @Basic
    @Column(name = "value", nullable = false, length = 255)
    private String value;
    @Basic
    @Column(name = "description", nullable = true, length = 255)
    private String description;
}
