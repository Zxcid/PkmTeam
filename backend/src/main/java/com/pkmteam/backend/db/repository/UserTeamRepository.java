package com.pkmteam.backend.db.repository;

import com.pkmteam.backend.db.entity.UserTeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTeamRepository extends JpaRepository<UserTeamEntity, Integer> {
    int countByUser_FirebaseUid(String firebaseUid);
}
