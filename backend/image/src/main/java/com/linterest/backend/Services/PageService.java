package com.linterest.backend.Services;

import com.linterest.backend.Converters.ConvertImageToImageDTOV2;
import com.linterest.backend.DTO.ImageDTOV2;
import com.linterest.backend.DTO.PageDataDTO;
import com.linterest.backend.Models.Image;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PageService {

    private final ConvertImageToImageDTOV2 convertImageToImageDTOV2;

    public PageDataDTO<ImageDTOV2> createPage(Page<Image> pagedData){

        List<Image> images = pagedData.getContent();
        List<ImageDTOV2> resultImages = images.stream().map(convertImageToImageDTOV2::convert).toList();

        return PageDataDTO.<ImageDTOV2>builder()
                .data(resultImages)
                .totalCount(pagedData.getTotalElements())
                .build();
    }
}
