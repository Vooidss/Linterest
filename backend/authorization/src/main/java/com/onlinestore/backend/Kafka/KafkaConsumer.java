package com.onlinestore.backend.Kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlinestore.backend.DTO.Image.ImageDTO;
import jakarta.ws.rs.NotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import com.onlinestore.backend.DTO.OrderPriceOfUserDTO;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class KafkaConsumer {

    @KafkaListener(topics = "image", groupId = "authorization_group")
    public void getImages(ConsumerRecord<String, List<ImageDTO>> message){
        if(message.key().equals("images")){
            List<ImageDTO> images = message.value();
            System.out.println(images);
        }
    }
}
