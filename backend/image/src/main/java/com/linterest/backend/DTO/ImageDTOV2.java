package com.linterest.backend.DTO;

import com.linterest.backend.Models.TagsForImage;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ImageDTOV2 {
    private Long id;
    private String name;
    private String description;
    private String fileName;
    private String contentType;
    private List<TagsForImage> tags;    
    private byte[] image;
}
