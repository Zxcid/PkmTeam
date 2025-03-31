package com.pkmteam.backend.db.repository;

import com.pkmteam.backend.db.entity.GlobalConfigurationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface GlobalConfigurationRepository extends JpaRepository<GlobalConfigurationEntity, Short> {

    Optional<GlobalConfigurationEntity> findByKey(String key);

    @Query("select gc.value from GlobalConfigurationEntity gc where gc.key = :key")
    Optional<String> getValueByKey(String key);
}
