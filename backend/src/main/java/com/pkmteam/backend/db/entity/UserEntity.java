package com.pkmteam.backend.db.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user", schema = "public", catalog = "postgres")
public class UserEntity {

    @Id
    @Column(name = "firebase_uid", nullable = false, length = 28)
    private String firebaseUid;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_role", nullable = false)
    private UserRoleEntity role;
}
