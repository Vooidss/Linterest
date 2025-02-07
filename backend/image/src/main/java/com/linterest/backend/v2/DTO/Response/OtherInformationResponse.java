package com.linterest.backend.v2.DTO.Response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class OtherInformationResponse extends Response{
    public String description;
}
