package com.pkmteam.backend.db.repository;

import com.pkmteam.backend.db.entity.UserTeamEntity;
import com.pkmteam.backend.dto.UserTeamDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTeamRepository extends JpaRepository<UserTeamEntity, Integer> {
    List<UserTeamEntity> findAllByUser_FirebaseUid(String firebaseUid);
    int countByUser_FirebaseUid(String firebaseUid);
    boolean existsByUser_FirebaseUidAndNameIgnoreCase(String firebaseUid, String name);
}
