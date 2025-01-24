package com.linterest.backend.Controllers;

import com.linterest.backend.DTO.ImageDTO;
import com.linterest.backend.DTO.ImageDTOV2;
import com.linterest.backend.DTO.Response.DefiniteImageResponse;
import com.linterest.backend.DTO.Response.ImagesResponse;
import com.linterest.backend.DTO.Response.Response;
import com.linterest.backend.Services.ImageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/pins")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/getImageByUserId")
    public ResponseEntity<?> getImageByUserId(@RequestBody List<Integer> idImages){
        return imageService.getImageByUserId(idImages);
    }

    @PostMapping("/add")
    public ResponseEntity<Response> addNewImage(
            @ModelAttribute("image") ImageDTO imageDTO) {
        return imageService.addNewImage(imageDTO);
    }

    @GetMapping("/get")
    public ResponseEntity<ImagesResponse<ImageDTOV2>> findAll(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "25") int size
    ){
        System.out.println(page);
        System.out.println(size);
        return imageService.findAll(PageRequest.of(page,size));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<DefiniteImageResponse> findById(
            @PathVariable Long id){
        return imageService.findById(id);
    }

}
