package com.linterest.backend.Services;

import com.linterest.backend.Converters.ConvertByteToMultipartFile;
import com.linterest.backend.DTO.ImageDTO;
import com.linterest.backend.DTO.Response.TagsByInputWordResponse;
import com.linterest.backend.Models.TagsForImage;
import com.linterest.backend.Repositories.TagRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final ConvertByteToMultipartFile convertByteToMultipartFile;

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

    protected List<TagsForImage> convertInTagsForImageByIds(List<Integer> ids){
        if(ids == null){
            return new ArrayList<>();
        }
        return ids.stream().map(tagRepository::findTagById).collect(Collectors.toList());
    }

}
