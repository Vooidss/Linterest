package com.linterest.backend.Kafka;

import com.linterest.backend.Services.KafkaProduceService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class KafkaConsumer {

    private final KafkaProduceService kafkaProduceService;


    @KafkaListener(topics = "authentication", groupId = "image_group")
    public void getIdImages(ConsumerRecord<String,List<Integer>> message){
        if(message.key().equals("idImages")){
            List<Long> idImages = message.value().stream().map(Integer::toUnsignedLong).toList();

            kafkaProduceService.sendImagesById(idImages);

        }
    }
}
