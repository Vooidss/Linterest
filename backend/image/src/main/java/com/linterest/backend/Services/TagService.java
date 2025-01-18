package com.linterest.backend.Services;

import com.linterest.backend.DTO.Response.TagsByInputWordResponse;
import com.linterest.backend.Models.TagsForImage;
import com.linterest.backend.Repositories.TagRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    public ResponseEntity<TagsByInputWordResponse> getTagByLetters(String word) {
        List<TagsForImage> listTags =  tagRepository.findTagByLetters(word);
        Integer countTags = tagRepository.countTagsByLetters(word);

        return ResponseEntity.ok().body(
                TagsByInputWordResponse
                        .builder()
                        .tags(listTags)
                        .count(countTags)
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message(String.format("Все тэги по запросы %s", word))
                        .build()
        );
    }
}
