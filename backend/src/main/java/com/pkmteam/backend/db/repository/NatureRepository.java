package com.pkmteam.backend.db.repository;

import com.pkmteam.backend.db.entity.NatureEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NatureRepository extends JpaRepository<NatureEntity, Integer> {
}
