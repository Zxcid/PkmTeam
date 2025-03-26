package com.pkmteam.backend.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.concurrent.TimeUnit;

@Service
public class FirebaseStorageService {

    private final Storage storage;

    @Value("${firebase.storage.bucket.url}")
    private String bucketUrl;

    public FirebaseStorageService(GoogleCredentials credentials) {
        this.storage = StorageOptions.newBuilder()
                .setCredentials(credentials)
                .build()
                .getService();
    }

    public String getSignedDownloadUrl(String pathRef) {
        pathRef = pathRef.substring(1);
        BlobInfo blobInfo = BlobInfo.newBuilder(bucketUrl, pathRef).build();

        URL signedUrl = storage.signUrl(
                blobInfo,
                15, // URL valido per 15 minuti
                TimeUnit.MINUTES,
                Storage.SignUrlOption.withV4Signature()
        );

        return signedUrl.toString();
    }
}
