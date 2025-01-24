package com.onlinestore.backend.DTO.Image;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
public class ImageDTORequest{
    private HttpStatus status;
    private Integer statusCode ;
    private String message;
    private List<ImageDTO> images;
}
