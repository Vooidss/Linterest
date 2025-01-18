package com.linterest.backend.DTO.Response;

import com.linterest.backend.Models.TagsForImage;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class TagsByInputWordResponse extends Response{
    private List<TagsForImage> tags;
    private Integer count;
}
