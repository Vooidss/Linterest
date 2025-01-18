package com.linterest.backend.Repositories;

import com.linterest.backend.Models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepositories extends JpaRepository<Image,Long> {

}
