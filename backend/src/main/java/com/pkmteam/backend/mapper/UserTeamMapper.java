package com.pkmteam.backend.mapper;

import com.pkmteam.backend.db.entity.UserEntity;
import com.pkmteam.backend.db.entity.UserTeamEntity;
import com.pkmteam.backend.dto.TeamRequestDto;
import com.pkmteam.backend.dto.UserTeamDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", uses = PokemonMapper.class)
public abstract class UserTeamMapper {

    @Autowired
    protected PokemonMapper pokemonMapper;

    public abstract UserTeamDto userTeamEntityToDto(UserTeamEntity entity);

}

