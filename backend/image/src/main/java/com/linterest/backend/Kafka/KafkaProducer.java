package com.linterest.backend.Kafka;

import lombok.AllArgsConstructor;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class KafkaProducer<T> {

    private final KafkaTemplate<String, T> kafkaTemplate;

    public void sendMessage(ProducerRecord<String, T> message){
        kafkaTemplate.send(message);
    }

}
