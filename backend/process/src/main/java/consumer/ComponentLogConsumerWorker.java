package consumer;

import log.ComponentLog;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.errors.WakeupException;
import org.msgpack.core.MessageTypeException;

import java.io.IOException;
import java.time.Duration;
import java.util.Collections;
import java.util.List;
import java.util.Properties;

import static consumer.KafkaConfig.getConsumerProperties;

@Slf4j
public class ComponentLogConsumerWorker implements Runnable {
    private final KafkaConsumer<String, byte[]> consumer;

    public ComponentLogConsumerWorker(int id) {
        Properties properties = getConsumerProperties("component_" + id);
        properties.put(ConsumerConfig.GROUP_ID_CONFIG, "component_log_client");
        consumer = new KafkaConsumer<>(properties);
        consumer.subscribe(Collections.singletonList("componentLog"));
    }

    @Override
    public void run() {
        try {
            while (!Thread.interrupted()) {
                ConsumerRecords<String, byte[]> records = consumer.poll(Duration.ofMillis(100));
                for (ConsumerRecord<String, byte[]> record: records) {
                    try {
                        List<ComponentLog> logs = ComponentLog.unpackComponentLog(record.value());
                        log.info(logs.toString());
                    } catch (IOException | MessageTypeException e) {
                        log.error("Parse Error: " + e.getMessage());
                    }
                }
                consumer.commitSync();
            }
        } catch (WakeupException e) {
            log.info(Thread.currentThread().getName() + " trigger WakeupException");
        } finally {
            consumer.close();
        }
    }

    public void shutdown() {
        consumer.wakeup();
    }
}
