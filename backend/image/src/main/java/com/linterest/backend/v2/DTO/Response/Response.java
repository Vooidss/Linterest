package com.linterest.backend.v2.DTO.Response;

import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.http.HttpStatus;

@Data
@SuperBuilder
public abstract class Response {
    private HttpStatus status;
    private Integer statusCode ;
    private String message;
}
