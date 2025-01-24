package com.linterest.backend.Services;

import com.linterest.backend.Converters.ConvertIdImageToImageDTOV2;
import com.linterest.backend.DTO.ImageDTO;
import com.linterest.backend.DTO.ImageDTOV2;
import com.linterest.backend.Kafka.KafkaProducer;
import lombok.AllArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class KafkaProduceService {

    private final KafkaProducer<List<ImageDTOV2>> kafkaProducer;
    private final ConvertIdImageToImageDTOV2 convertIdImageToImageDTOV2;

    public void sendImagesById(List<Long> idImages) {
        List<Long> ids = idImages.stream()
                .map(id -> (Long) id)
                .toList();

        List<ImageDTOV2> images = ids.stream().map(convertIdImageToImageDTOV2::convert).toList();

        kafkaProducer.sendMessage(
                new ProducerRecord<>("image", "images", images)
        );
    }
}
