package com.linterest.backend.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ImageDTO {
    private MultipartFile image;
    private String name;
    private String description;
    private String tegs;
}
