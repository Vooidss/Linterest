package com.linterest.backend.Repositories;

import com.linterest.backend.Models.Image;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface ImageRepositories extends JpaRepository<Image,Long> {
    @Query("SELECT i FROM Image i WHERE i.id = :id")
    @Transactional
    public @NonNull Optional<Image> findById(@Value("id") @NonNull Long id);
}
