package com.linterest.backend.Services;

import com.linterest.backend.DTO.ImageDTO;
import com.linterest.backend.DTO.Response.CreateImageResponse;
import com.linterest.backend.DTO.Response.DefaultResponse;
import com.linterest.backend.DTO.Response.Response;
import com.linterest.backend.Models.Image;
import com.linterest.backend.Repositories.ImageRepositories;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.jgit.util.IO;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@AllArgsConstructor
@Slf4j
public class ImageService {

    private final ImageRepositories imageRepository;
    private final ModelMapper mapper;
    public ResponseEntity<Response> addNewImage(ImageDTO imageDTO) {

        Image image = mapper.map(imageDTO,Image.class);
        //TODO: ДОДЕЛАТЬ С РЕАЛЬНЫМИ ПОЛЬЗОВАТЕЛЯМИ
        image.setUserId(1L);
        try{
            image.setImage(imageDTO.getImage().getBytes());
        }catch(IOException io){
            log.error(io.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    DefaultResponse.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message("Ошибка на сервере при считывании файла.")
                            .build()
            );
        }

        imageRepository.save(image);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                CreateImageResponse.builder()
                        .image(image)
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .message("Пин успешно создан")
                        .build());
    }
}
