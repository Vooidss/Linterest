package com.linterest.backend.Converters;

import com.linterest.backend.DTO.TagDTO;
import com.linterest.backend.Models.TagsForImage;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class ConvertTagImageToTagDTO implements Convert<TagDTO, TagsForImage> {

    private final ModelMapper mapper;

    @Override
    public TagDTO convert(TagsForImage obj) {
        return mapper.map(obj,TagDTO.class);
    }
}
