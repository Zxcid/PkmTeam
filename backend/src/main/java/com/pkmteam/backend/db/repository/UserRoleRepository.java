package com.pkmteam.backend.db.repository;

import com.pkmteam.backend.db.entity.UserRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRoleEntity, Short> {

    Optional<UserRoleEntity> findByName(String name);
}
