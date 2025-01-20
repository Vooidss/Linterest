package com.linterest.backend.DTO.Response;

import com.linterest.backend.DTO.ImageDTOV2;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class DefiniteImageResponse extends Response{
    private ImageDTOV2 image;
}
