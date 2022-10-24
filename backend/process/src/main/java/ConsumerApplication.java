import consumer.ComponentLogConsumerWorker;
import consumer.PageLogConsumerWorker;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ConsumerApplication {
    private final static Integer THREAD_NUMBER = 1;
    private final static List<PageLogConsumerWorker> pageLogConsumerWorkers = new ArrayList<>();
    private final static List<ComponentLogConsumerWorker> componentLogConsumerWorkers = new ArrayList<>();

    public static void main(String[] args) {
        ExecutorService service = Executors.newFixedThreadPool(THREAD_NUMBER * 2);

        for (int i = 0; i < THREAD_NUMBER; i++) {
            PageLogConsumerWorker pageLogConsumerWorker = new PageLogConsumerWorker(i + 1);
            pageLogConsumerWorkers.add(pageLogConsumerWorker);
            ComponentLogConsumerWorker componentLogConsumerWorker = new ComponentLogConsumerWorker(i + 1);
            componentLogConsumerWorkers.add(componentLogConsumerWorker);
            service.execute(pageLogConsumerWorker);
            service.execute(componentLogConsumerWorker);
        }
    }

    static class ShutdownThread extends Thread {
        @Override
        public void run() {
            pageLogConsumerWorkers.forEach(PageLogConsumerWorker::shutdown);
            componentLogConsumerWorkers.forEach(ComponentLogConsumerWorker::shutdown);
        }
    }
}
