package com.pkmteam.backend.service;

import com.pkmteam.backend.db.repository.GlobalConfigurationRepository;
import com.pkmteam.backend.dto.enums.GlobalConfigKeys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GlobalConfigurationService {

    private final GlobalConfigurationRepository repository;

    public int getIntValue(GlobalConfigKeys key) {
        return Integer.parseInt(get(key));
    }

    public boolean getBooleanValue(GlobalConfigKeys key) {
        return Boolean.getBoolean(get(key));
    }

    private String get(GlobalConfigKeys key) {
        return repository.getValueByKey(key.getKey())
                .orElseThrow(() -> new IllegalStateException("Missing config key: " + key));
    }
}
