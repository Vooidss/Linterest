package com.linterest.backend.Controllers;

import com.linterest.backend.DTO.ImageDTO;
import com.linterest.backend.DTO.Response.CreateImageResponse;
import com.linterest.backend.DTO.Response.DefiniteImageResponse;
import com.linterest.backend.DTO.Response.ImagesResponse;
import com.linterest.backend.DTO.Response.Response;
import com.linterest.backend.Services.ImageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;

@RestController
@AllArgsConstructor
@RequestMapping("/pins")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/add")
    public ResponseEntity<Response> addNewImage(
            @ModelAttribute("image") ImageDTO imageDTO) {
        return imageService.addNewImage(imageDTO);
    }

    @GetMapping("/get")
    public ResponseEntity<ImagesResponse> findAll(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size
    ){
        return imageService.findAll(PageRequest.of(page,size));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<DefiniteImageResponse> findById(
            @PathVariable Long id){
        return imageService.findById(id);
    }

}
