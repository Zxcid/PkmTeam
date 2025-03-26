package com.pkmteam.backend.mapper;

import com.pkmteam.backend.db.entity.UserEntity;
import com.pkmteam.backend.db.entity.UserRoleEntity;
import com.pkmteam.backend.db.repository.UserRoleRepository;
import com.pkmteam.backend.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class UserMapper {

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Mapping(target = "role", source = "role", qualifiedByName = "roleNameToUserRole")
    public abstract UserEntity userDtoToUserEntity(UserDto userDto);

    @Mapping(target = "role", source = "role.name")
    public abstract UserDto userEntityToUserDto(UserEntity userEntity);

    @Named("roleNameToUserRole")
    protected UserRoleEntity roleNameToUserRole(String roleName) {
        return userRoleRepository.findByName(roleName)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find user role with name: " + roleName));
    }
}
