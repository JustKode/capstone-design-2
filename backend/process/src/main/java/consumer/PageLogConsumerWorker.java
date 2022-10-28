package consumer;

import log.PageLog;
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
import java.util.Properties;

import static consumer.KafkaConfig.getConsumerProperties;

@Slf4j
public class PageLogConsumerWorker implements Runnable {
    private final KafkaConsumer<String, byte[]> consumer;

    public PageLogConsumerWorker(int id) {
        Properties properties = getConsumerProperties("page_" + id);
        properties.put(ConsumerConfig.GROUP_ID_CONFIG, "page_log_client");
        consumer = new KafkaConsumer<>(properties);
        consumer.subscribe(Collections.singletonList("pageLog"));
    }

    @Override
    public void run() {
        try {
            while (!Thread.interrupted()) {
                ConsumerRecords<String, byte[]> records = consumer.poll(Duration.ofMillis(100));
                for (ConsumerRecord<String, byte[]> record: records) {
                    try {
                        PageLog logs = PageLog.unpackPageLog(record.value());
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
