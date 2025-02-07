package com.linterest.backend.v2.Services;

import com.linterest.backend.v2.Models.TagsForImage;
import com.linterest.backend.v2.Repositories.TagRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    protected List<TagsForImage> convertInTagsForImageByIds(List<Integer> ids){
        if(ids == null){
            return new ArrayList<>();
        }
        return ids.stream().map(tagRepository::findTagById).collect(Collectors.toList());
    }
}
