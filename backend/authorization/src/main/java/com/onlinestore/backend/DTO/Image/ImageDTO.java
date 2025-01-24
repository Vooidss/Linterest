package com.onlinestore.backend.DTO.Image;

import lombok.Data;

import java.util.List;

@Data
public class ImageDTO {
    private Long id;
    private String name;
    private String description;
    private String fileName;
    private String contentType;
    private List<TagDTO> tags;
    private byte[] image;
}
