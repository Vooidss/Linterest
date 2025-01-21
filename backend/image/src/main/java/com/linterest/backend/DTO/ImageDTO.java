package com.linterest.backend.DTO;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ImageDTO {
    private Long userId;
    private MultipartFile image;
    private String name;
    private String description;
    private List<Integer> idsTag;
}
