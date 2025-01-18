package com.linterest.backend.DTO.Response;

import com.linterest.backend.Models.Image;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class CreateImageResponse extends Response{
    private Image image;
}
