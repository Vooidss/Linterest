package com.onlinestore.backend.Models.UserImage;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@Table(name = "user_image")
@AllArgsConstructor
@NoArgsConstructor
public class UserImage {
    @EmbeddedId
    @NonNull
    private UserImageId userImage;

    public UserImage(int userId, Long imageId){
         this.userImage = new UserImageId((long) userId,imageId);
    }

}
