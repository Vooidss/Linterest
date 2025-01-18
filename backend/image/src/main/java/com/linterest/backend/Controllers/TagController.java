package com.linterest.backend.Controllers;

import com.linterest.backend.DTO.Response.TagsByInputWordResponse;
import com.linterest.backend.Services.TagService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/tag")
@CrossOrigin(origins = "http://localhost:3000")
public class TagController {

    private final TagService tagService;

    @GetMapping("/get/{word}")
    public ResponseEntity<TagsByInputWordResponse> getTagByLetters(
            @PathVariable String word){
        return tagService.getTagByLetters(word.toLowerCase());
    }

}
