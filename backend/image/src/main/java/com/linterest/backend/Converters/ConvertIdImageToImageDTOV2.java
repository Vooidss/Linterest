package com.linterest.backend.Converters;


import com.linterest.backend.DTO.ImageDTOV2;
import com.linterest.backend.Repositories.ImageRepositories;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Component
public class ConvertIdImageToImageDTOV2  implements Convert<ImageDTOV2, Long>{

    private final ImageRepositories imageRepositories;
    private final ConvertImageToImageDTOV2 convertImageToImageDTOV2;

    @Override
    @Transactional
    public ImageDTOV2 convert(Long id) {
        return convertImageToImageDTOV2.convert(imageRepositories.findById(id).get());
    }
}
