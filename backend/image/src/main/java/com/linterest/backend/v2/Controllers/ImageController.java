package com.linterest.backend.v2.Controllers;


import com.linterest.backend.v2.DTO.ImageDTO;
import com.linterest.backend.v2.DTO.Response.Response;
import com.linterest.backend.v2.Services.ImageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/pins")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class ImageController{

    private final ImageService imageService;

    @PostMapping("/add")
    public ResponseEntity<Response> addNewImage(
            @ModelAttribute("image") ImageDTO imageDTO) {
        return imageService.saveImage(imageDTO);
    }

    @GetMapping("/get/{hash}")
    public ResponseEntity<ByteArrayResource> getImageByHash(@PathVariable String hash){
        return imageService.getImageByHash(hash);
    }

    @GetMapping("/get/other/{hash}")
    public ResponseEntity<Response> getOtherInformationImage(@PathVariable String hash){
        return imageService.getOtherInformationImage(hash);
    }

    @GetMapping("/get/all")
    public ResponseEntity<Response> getAllHash(){
        return imageService.getAllHash();
    }

}
