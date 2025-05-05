package com.pkmteam.backend.db.repository;

import com.pkmteam.backend.db.entity.TeamPokemonEntity;
import com.pkmteam.backend.db.entity.TeamPokemonEntityPK;
import com.pkmteam.backend.db.entity.UserTeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

public interface TeamPokemonRepository extends JpaRepository<TeamPokemonEntity, TeamPokemonEntityPK> {
    @Modifying
    void deleteByTeam(UserTeamEntity team);
}
