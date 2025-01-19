package com.linterest.backend.Services;

import com.linterest.backend.Converters.ConvertByteToMultipartFile;
import com.linterest.backend.Converters.ConvertImageToImageDTOV2;
import com.linterest.backend.DTO.ImageDTO;
import com.linterest.backend.DTO.ImageDTOV2;
import com.linterest.backend.DTO.Response.CreateImageResponse;
import com.linterest.backend.DTO.Response.DefaultResponse;
import com.linterest.backend.DTO.Response.ImagesResponse;
import com.linterest.backend.DTO.Response.Response;
import com.linterest.backend.Models.Image;
import com.linterest.backend.Repositories.ImageRepositories;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class ImageService {

    private final ImageRepositories imageRepository;
    private final ModelMapper mapper;
    private final TagService tagService;
    private final ConvertImageToImageDTOV2 convertImageToImageDTOV2;

    public ResponseEntity<Response> addNewImage(ImageDTO imageDTO) {
        Image image = mapper.map(imageDTO,Image.class);
        image.setTags(tagService.convertInTagsForImageByIds(imageDTO.getIdsTag()));
        //TODO: ДОДЕЛАТЬ С РЕАЛЬНЫМИ ПОЛЬЗОВАТЕЛЯМИ
        image.setUserId(1L);
        try{
            image.setImage(imageDTO.getImage().getBytes());
            image.setContentType(imageDTO.getImage().getContentType());
            image.setFileName(imageDTO.getImage().getOriginalFilename());
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

    public ResponseEntity<ImagesResponse> findAll(PageRequest pageRequest) {
        Page<Image> imagePage = imageRepository.findAll(pageRequest);
        List<Image> images = imagePage.getContent();
        List<ImageDTOV2> resultImages= images.stream().map(convertImageToImageDTOV2::convert).toList();


        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(
                ImagesResponse.builder()
                        .images(resultImages)
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Данные успешно возвращены.")
                        .build()
        );
    }
}
