package com.linterest.backend.v2.Services;
import com.linterest.backend.v2.Converters.ConvertMultipartFileToByteArrayResources;
import com.linterest.backend.v2.Converters.ConvertImageToMultipartFile;
import com.linterest.backend.v2.DTO.ImageDTO;
import com.linterest.backend.v2.DTO.Response.DefaultResponse;
import com.linterest.backend.v2.DTO.Response.GetHashesResponse;
import com.linterest.backend.v2.DTO.Response.OtherInformationResponse;
import com.linterest.backend.v2.DTO.Response.Response;
import com.linterest.backend.v2.Hashing.HashingNameImage;
import com.linterest.backend.v2.Models.Image;
import com.linterest.backend.v2.Repositories.ImageRepositories;
import jakarta.ws.rs.NotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.ByteArrayResource;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class ImageService {

    private final HashingNameImage hashing;
    private final ImageRepositories imageRepositories;
    private final ConvertMultipartFileToByteArrayResources convertMultipartFileToByteArrayResources;
    private final ConvertImageToMultipartFile convertImageToMultipartFile;

    public ResponseEntity<Response> saveImage(ImageDTO imageDTO) {
        if(imageDTO.getImage() == null || imageDTO.getUserId() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    DefaultResponse
                            .builder()
                            .status(HttpStatus.BAD_REQUEST)
                            .statusCode(HttpStatus.BAD_REQUEST.value())
                            .message("Не была получена картинка или Id пользователя.")
                            .build()
            );
        }

        MultipartFile savedFile = imageDTO.getImage();
        String nameFile = imageDTO.getImage().getOriginalFilename();

        try {
            assert nameFile != null;
            nameFile = hashing.SHA256hashing(nameFile);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

        String directory = "image/src/main/resources/static/images";
        File uploadDir = new File(directory);

        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        Path filePath = Path.of(directory,nameFile);

        try {
            Files.copy(savedFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        imageRepositories.save(Image.builder()
                        .hash(nameFile)
                        .userId(imageDTO.getUserId())
                        .description(imageDTO.getDescription())
                        .contentType(imageDTO.getImage().getContentType())
                        .fileName(imageDTO.getName())
                .build());

        return ResponseEntity.status(HttpStatus.OK).body(
                DefaultResponse
                        .builder()
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Картинка успешно сохранена.")
                        .build()
        );
    }

    public ResponseEntity<ByteArrayResource> getImageByHash(String hash){
        Image image = imageRepositories.findById(hash).orElseThrow(NotFoundException::new);
        MultipartFile multipartFile = convertImageToMultipartFile.convert(image);
        ByteArrayResource resource = convertMultipartFileToByteArrayResources.convert(multipartFile);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + multipartFile.getName())
                .header(HttpHeaders.CONTENT_TYPE, multipartFile.getContentType())
                .body(resource);
    }

    public ResponseEntity<Response> getAllHash() {
        List<Image> images = imageRepositories.findAll();
        List<String> hashes = images.stream().map(Image::getHash).toList();

        if(hashes.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(DefaultResponse.builder()
                    .status(HttpStatus.NOT_FOUND)
                    .statusCode(HttpStatus.NOT_FOUND.value())
                    .message(":(")
                    .build());
        }

        return ResponseEntity.ok()
                .body(GetHashesResponse.builder()
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message(":)")
                        .hashes(hashes)
                        .build());
    }

    public ResponseEntity<Response> getOtherInformationImage(String hash) {
        Image image = imageRepositories.findById(hash).orElseThrow(NotFoundException::new);
        return ResponseEntity.ok()
                .body(OtherInformationResponse.builder()
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .message("Дополнительная информация о картинке.")
                        .description(image.getDescription())
                        .build());
    }
}