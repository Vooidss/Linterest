package com.linterest.backend.DTO;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class PageDataDTO<T> {
    private List<T> data;
    private long totalCount;
}
