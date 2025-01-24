package com.onlinestore.backend.Services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlinestore.backend.DTO.DefaultResponse;
import com.onlinestore.backend.DTO.Image.ImageDTORequest;
import com.onlinestore.backend.DTO.LikeDTO;
import com.onlinestore.backend.Kafka.KafkaProducer;
import com.onlinestore.backend.Models.UserImage.UserImage;
import com.onlinestore.backend.Repositories.UserImageRepository;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.UnexpectedTypeException;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.onlinestore.backend.DTO.UpdateRequest;
import com.onlinestore.backend.Repositories.UserRepositories;
import com.onlinestore.backend.user.MyUser;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {

    private final UserRepositories userRepository;
    private final UserImageRepository userImageRepository;
    private final ModelMapper modelMapper;
    private final KafkaProducer<List<Integer>> kafkaProducer;
    private final RequestGenerateService<List<Integer>> requestGenerateService;
    private final ObjectMapper objectMapper;

    public ResponseEntity<DefaultResponse> likeImage(LikeDTO likeDTO){
        if(likeDTO.getImageId() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    DefaultResponse.builder()
                            .httpStatus(HttpStatus.BAD_REQUEST)
                            .httpStatusCode(HttpStatus.BAD_REQUEST.value())
                            .message("Получены не все данные")
                            .build()
            );
        }
        UserImage userImage = new UserImage(getCurrentUser().getId(),likeDTO.getImageId());
        userImageRepository.save(userImage);

        return ResponseEntity.ok().body(
                DefaultResponse.builder()
                        .httpStatus(HttpStatus.OK)
                        .httpStatusCode(HttpStatus.OK.value())
                        .message("Пин успешно сохранён")
                        .build()
        );
    }

    public void save(MyUser user)
        throws ConstraintViolationException, DataIntegrityViolationException, UnexpectedTypeException {
        userRepository.save(user);
    }

    public MyUser getByLogin(String login) {
        return userRepository
            .findByLogin(login)
            .orElseThrow(() ->
                new UsernameNotFoundException("Пользователь не найден")
            );
    }

    public MyUser getCurrentUser() {
        var username = SecurityContextHolder.getContext()
            .getAuthentication()
            .getName();
        log.info(String.valueOf(SecurityContextHolder.getContext().getAuthentication()));
        return getByLogin(username);
    }

    public ResponseEntity<MyUser> getResponseCurrentUser() {
        return ResponseEntity.ok(getCurrentUser());
    }

    public ResponseEntity<Map<String, Integer>> findUserId() {
        MyUser myUser = getCurrentUser();

        return ResponseEntity.ok(Map.of("Id", myUser.getId()));
    }

    private void addOtherData(MyUser myUser){
        myUser.setRole(getCurrentUser().getRole());
        myUser.setLogin(getCurrentUser().getLogin());
        myUser.setEmail(getCurrentUser().getEmail());
        myUser.setPassword(getCurrentUser().getPassword());
        myUser.setDate_registration(getCurrentUser().getDate_registration());
    }

    public  ResponseEntity<Map<String,Object>> updateUser(UpdateRequest updateRequest) {
        System.out.println(updateRequest);
        log.info("Получаем id залогированного пользователя...");

        int id = getCurrentUser().getId();

        log.info("id {} получен!",id);

        log.info("Проверяем существует ли пользователь с таким id в базе данных...");

        if(userRepository.existsById(id)){
            log.info("Пользователь существует!");
            log.info("Сохраняем пользователя...");

            Optional<MyUser> updateUser;

            MyUser myUser = modelMapper.map(updateRequest, MyUser.class);
            myUser.setId(id);
            addOtherData(myUser);

            try {
                updateUser = Optional.of(userRepository.save(myUser));
            }catch (RuntimeException e){
                log.error(e.toString());
                System.out.println(e.getMessage());
                System.out.println(Arrays.toString(e.getStackTrace()));
                log.error("Ошибка обновления пользователя");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        Map.of(
                                "user", "",
                                "code", HttpStatus.NOT_FOUND.value(),
                                "status", HttpStatus.NOT_FOUND,
                                "message", "Ошибка обновления"
                        ));
            }
            log.info("Пользователь сохранён!");

            return ResponseEntity.ok().body(
                    Map.of(
                            "user", updateUser,
                            "code", HttpStatus.OK.value(),
                            "status", HttpStatus.OK,
                            "message", "Данные пользователя обновлены"
                    ));
        }else{
            log.error("Пользователя с таким ID не существует. :(");

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    Map.of(
                            "user","",
                            "code",HttpStatus.NOT_FOUND.value(),
                            "status",HttpStatus.NOT_FOUND,
                            "message","Пользователя не найден"
                    ));
        }
    }

    public ResponseEntity<?> getSaveImageV1() {

        int userId = getCurrentUser().getId();
        List<Integer> imagesIds = userImageRepository.findAllByUserId(userId).stream().map(Long::intValue).toList();

        kafkaProducer.sendMessage(
                new ProducerRecord<>("authentication","idImages",imagesIds)
        );

        return ResponseEntity.ok().body("lf");
    }

    public ResponseEntity<?> getSaveImageV2() {

        int userId = getCurrentUser().getId();
        List<Integer> imagesIds = userImageRepository.findAllByUserId(userId).stream().map(Long::intValue).toList();

        String response = requestGenerateService.generatePostRequest(imagesIds, "http://localhost:8010/pins/getImageByUserId", "application/json");

        try {
            ImageDTORequest imageDTORequest = objectMapper.readValue(response,ImageDTORequest.class);

            return ResponseEntity.ok().body(imageDTORequest);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
