package com.linterest.backend.v2.Converters;

import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ConvertByteToMultipartFile {
    public MultipartFile byteArrayToMultipartFile(byte[] byteArray, String fileName, String contentType) {
        return new MockMultipartFile(fileName, fileName, contentType, byteArray);
    }
}
