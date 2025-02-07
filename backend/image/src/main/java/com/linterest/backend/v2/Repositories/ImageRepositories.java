package com.linterest.backend.v2.Repositories;

import com.linterest.backend.v2.Models.Image;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface ImageRepositories extends JpaRepository<Image,String> {
    @Query("SELECT i FROM Image i WHERE i.hash = :hash")
    @Transactional
    public @NonNull Optional<Image> findById(@Value("hash") @NonNull String hash);
}
