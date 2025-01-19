package com.linterest.backend.DTO.Response;

import com.linterest.backend.DTO.ImageDTOV2;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class ImagesResponse extends Response{
    private List<ImageDTOV2> images;
}
