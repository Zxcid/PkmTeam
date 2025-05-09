package com.pkmteam.backend.db.repository;

import com.pkmteam.backend.db.entity.TeamPokemonEntity;
import com.pkmteam.backend.db.entity.UserTeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

public interface TeamPokemonRepository extends JpaRepository<TeamPokemonEntity, Integer> {
    @Modifying
    void deleteByTeam(UserTeamEntity team);
}
