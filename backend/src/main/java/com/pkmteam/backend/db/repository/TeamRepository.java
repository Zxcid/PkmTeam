package com.pkmteam.backend.db.repository;

import com.pkmteam.backend.db.entity.UserTeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<UserTeamEntity, Integer> {

    Optional<UserTeamEntity> findByUserFirebaseUidAndTeamNumber(String firebaseUid, Integer teamNumber);
}
