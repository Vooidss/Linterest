package com.linterest.backend.v2.Converters;

import com.linterest.backend.v2.Models.Image;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Component
public class ConvertImageToMultipartFile implements Convert<MultipartFile, Image> {
    @Override
    public MultipartFile convert(Image image) {
        File file = new File(String.format("image/src/main/resources/static/images/%s",image.getHash()));
        System.out.println(file);
        try(FileInputStream input = new FileInputStream(file);){
            return new MockMultipartFile(
                    image.getFileName(),
                    file.getName(),
                    image.getContentType(),
                    FileCopyUtils.copyToByteArray(input)
            );
        }catch(IOException e){
            throw new RuntimeException(e);
        }
    }
}
