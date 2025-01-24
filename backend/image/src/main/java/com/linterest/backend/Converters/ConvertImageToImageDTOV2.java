package com.linterest.backend.Converters;

import com.linterest.backend.DTO.ImageDTOV2;
import com.linterest.backend.Models.Image;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class ConvertImageToImageDTOV2 implements Convert<ImageDTOV2, Image> {
    private final ConvertTagImageToTagDTO convertTagImageToTagDTO;
    @Override
    public ImageDTOV2 convert(Image obj) {
        ImageDTOV2 image = new ImageDTOV2();
        image.setName(obj.getName());
        image.setDescription(obj.getDescription());
        image.setTags(obj.getTags().stream().map(convertTagImageToTagDTO::convert).toList());
        image.setContentType(obj.getContentType());
        image.setFileName(obj.getFileName());
        image.setImage(obj.getImage());
        image.setId(obj.getId());
        return image;
    }
}
