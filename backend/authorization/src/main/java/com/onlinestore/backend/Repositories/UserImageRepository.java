package com.onlinestore.backend.Repositories;

import com.onlinestore.backend.Models.UserImage.UserImage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserImageRepository extends JpaRepository<UserImage, Long> {
   @Query("SELECT u.userImage.imageId FROM UserImage u WHERE u.userImage.userId = :userId")
    List<Long> findAllByUserId(@Value("userId") int userId);
}
