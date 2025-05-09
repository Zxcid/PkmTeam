package com.pkmteam.backend.db.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * This native repository handles direct SQL operations on the team-related tables using {@link JdbcTemplate},
 * bypassing Hibernate's entity management for critical update operations.
 * <p>
 * The main reason for using native queries is to avoid well-known issues with Hibernate's orphan removal mechanism,
 * particularly when dealing with {@code @OneToMany} relationships and unique constraints.
 * </p>
 * <p>
 * In this case, updating a team involves deleting and re-inserting a set of {@code team_pokemon} rows
 * which share a unique constraint on {@code (fk_user_team, team_member)}.
 * Attempting to perform this operation using Hibernate often results in
 * {@code DataIntegrityViolationException} or {@code ObjectDeletedException}
 * due to conflicting entity states in the persistence context.
 * </p>
 * <p>
 * Native queries allow full control over the order and timing of SQL operations,
 * ensuring deterministic behavior, better performance, and no conflicts between deleted and inserted records.
 * </p>
 * <p>
 * For more context, see:
 * <a href="https://github.com/doctrine/orm/issues/6776">https://github.com/doctrine/orm/issues/6776</a>
 * </p>
 */
@Repository
@RequiredArgsConstructor
public class TeamNativeRepository {

    private final JdbcTemplate jdbcTemplate;

    public void deleteAllTeamMembers(Integer teamId) {
        jdbcTemplate.update("DELETE FROM team_pokemon WHERE fk_user_team = ?", teamId);
    }

    public void insertTeamMember(Integer teamId, int teamMember, Integer pkPokemon, Integer pkAbility, Integer pkNature) {
        jdbcTemplate.update("""
                    INSERT INTO team_pokemon (fk_user_team, team_member, fk_pokemon, fk_ability, fk_nature)
                    VALUES (?, ?, ?, ?, ?)
                """, teamId, teamMember, pkPokemon, pkAbility, pkNature);
    }

    public void updateTeamName(Integer teamId, String newName) {
        jdbcTemplate.update("UPDATE user_team SET name = ? WHERE pk_user_team = ?", newName, teamId);
    }
}
