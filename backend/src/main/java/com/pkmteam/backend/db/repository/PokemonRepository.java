package com.pkmteam.backend.db.repository;

import com.pkmteam.backend.db.entity.PokemonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PokemonRepository extends JpaRepository<PokemonEntity, Integer> {

    //@Query(value = "SELECT * FROM public.pokemon p WHERE p.name ILIKE CONCAT('%', :name, '%')", nativeQuery = true)
    @Query(value = "SELECT p FROM PokemonEntity p WHERE UPPER(p.name) LIKE UPPER(CONCAT('%', :name, '%'))")
    List<PokemonEntity> findByNameIgnoreCase(@Param("name") String name);
}
