package com.linterest.backend.Converters;

import com.linterest.backend.DTO.ImageDTOV2;
import com.linterest.backend.Models.Image;
import org.springframework.stereotype.Component;

@Component
public class ConvertImageToImageDTOV2 implements Convert<ImageDTOV2, Image> {

    private final ConvertByteToMultipartFile convertByteToMultipartFile;

    public ConvertImageToImageDTOV2(ConvertByteToMultipartFile convertByteToMultipartFile) {
        this.convertByteToMultipartFile = convertByteToMultipartFile;
    }

    @Override
    public ImageDTOV2 convert(Image obj) {
        ImageDTOV2 image = new ImageDTOV2();
        image.setName(obj.getName());
        image.setDescription(obj.getDescription());
        image.setTags(obj.getTags());
        image.setContentType(obj.getContentType());
        image.setFileName(obj.getFileName());
        image.setImage(obj.getImage());
        return image;
    }
}
