package com.pkmteam.backend.service;

import com.pkmteam.backend.config.auth.UserPrincipal;
import com.pkmteam.backend.db.entity.UserEntity;
import com.pkmteam.backend.db.repository.UserRepository;
import com.pkmteam.backend.db.repository.UserRoleRepository;
import com.pkmteam.backend.dto.UserDto;
import com.pkmteam.backend.mapper.UserMapper;
import com.pkmteam.backend.utils.SecurityUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final UserMapper userMapper;

    @Transactional
    public UserDto loginUser() {
        UserPrincipal currentUser = SecurityUtils.getCurrentUser();
        String firebaseUid = currentUser.firebaseUid();

        UserEntity user = userRepository.findById(firebaseUid)
                .orElseGet(UserEntity::new);

        if (user.getFirebaseUid() == null) {
            user.setFirebaseUid(firebaseUid);
            user.setRole(
                    userRoleRepository.findByName("BASIC")
                            .orElseThrow(() -> new IllegalArgumentException("Cannot find user role: BASIC"))
            );
        }

        return userMapper.userEntityToUserDto(
                userRepository.saveAndFlush(user)
        );
    }
}
