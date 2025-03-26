package com.pkmteam.backend.db.repository;

import com.pkmteam.backend.db.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String> {
}
