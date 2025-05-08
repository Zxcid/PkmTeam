package com.pkmteam.backend.db.repository;

import com.pkmteam.backend.db.entity.AbilityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AbilityRepository extends JpaRepository<AbilityEntity, Integer> {
}
