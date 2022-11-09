package util;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.BulkRequest;
import co.elastic.clients.elasticsearch.core.BulkResponse;
import io.lettuce.core.KeyValue;
import io.lettuce.core.Value;
import io.lettuce.core.api.sync.RedisCommands;
import log.ComponentLog;
import log.PageLog;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
public class LogProcessUtil {
    final private static RedisCommands<String, String> commands = RedisUtil.getCommands();
    final private static ElasticsearchClient elasticClient = ElasticsearchUtil.getClient();

    public static Boolean processPageLog(List<PageLog> pageLogs) {
        // 유저 최신 접속 URL 가져오기
        List<KeyValue<String, String>> keyValueList = commands.mget(
                pageLogs.stream()
                        .map(PageLog::getPageLogID)
                        .distinct()
                        .toArray(String[]::new)
        );
        Map<String, String> beforeMap = keyValueList.stream()
                .filter(KeyValue::hasValue)
                .collect(Collectors.toMap(KeyValue::getKey, Value::getValue));

        // ES Bulk 요청 쌓아 놓기
        BulkRequest.Builder br = new BulkRequest.Builder();

        for (PageLog pageLog: pageLogs) {
            // update pageVisit
            br.operations(op -> op
                .update(idx -> idx
                    .index("page_log")
                    .id(pageLog.getPageLogID())
                    .action(action -> action.script(
                            script -> script.inline(
                                s -> s.source("ctx._source.count += 1")
                            )
                        ).upsert(Map.of("count", 1, "userId", pageLog.getUserId()))
                    )
                )
            );

            // update page move
            if (beforeMap.containsKey(pageLog.getUserId())) {
                br.operations(op -> op
                    .update(idx -> idx
                        .index("page_log")
                        .id(pageLog.getUserId() + " " + beforeMap.get(pageLog.getUserId()) + " " + pageLog.getPathname())
                        .action(action -> action.script(
                                script -> script.inline(
                                    s -> s.source("ctx._source.count += 1")
                                )
                            ).upsert(Map.of("count", 1, "userId", pageLog.getUserId()))
                        )
                    )
                );
            }

            // redis
            beforeMap.put(pageLog.getPageLogID(), pageLog.getPathname());
        }

        try {
            BulkResponse bulk = elasticClient.bulk(br.build());
            if (bulk.errors())
                return false;

        } catch (IOException e) {
            log.error(e.getMessage());
            return false;
        }

        commands.mset(beforeMap);
        log.info(beforeMap.toString());
        return true;
    }

    public static Boolean processComponentLog(List<ComponentLog> componentLogs) {
        List<KeyValue<String, String>> keyValueList = commands.mget(
            componentLogs.stream()
                .map(ComponentLog::getComponentLogID)
                .distinct()
                .toArray(String[]::new)
        );

        Map<String, String> beforeMap = keyValueList.stream()
                .filter(KeyValue::hasValue)
                .collect(Collectors.toMap(KeyValue::getKey, KeyValue::getValue));

        BulkRequest.Builder br = new BulkRequest.Builder();

        boolean flag = false;

        for (ComponentLog componentLog: componentLogs) {
            log.info(componentLog.toString());
            if (!componentLog.getDoing() && beforeMap.containsKey(componentLog.getComponentLogID())) {
                Long startTimestamp = Long.valueOf(beforeMap.get(componentLog.getComponentLogID()));
                Long endTimestamp = componentLog.getTimestamp();
                Long time = endTimestamp - startTimestamp;

                br.operations(op -> op
                    .update(
                        idx -> idx
                            .index("component_log")
                            .id(componentLog.getComponentLogID())
                            .action(action -> action.script(
                                    script -> script.inline(
                                            s -> s.source("ctx._source.time += " + time)
                                    )
                                ).upsert(Map.of("time", time, "userId", componentLog.getUserId()))
                            )
                        )
                    );

                beforeMap.remove(componentLog.getComponentLogID());
            } else if (componentLog.getDoing() && !beforeMap.containsKey(componentLog.getComponentLogID())) {
                beforeMap.put(componentLog.getComponentLogID(), String.valueOf(componentLog.getTimestamp()));
            } else {
                continue;
            }

            flag = true;
        }

        try {
            if (flag) {
                BulkResponse bulk = elasticClient.bulk(br.build());

                if (bulk.errors()) {
                    bulk.items().stream()
                            .filter(x -> x.error() != null)
                            .forEach(x -> log.error(x.error().reason()));

                    return false;
                }

            }
        } catch (IOException e) {
            log.error(e.getMessage());
            return false;
        }

        if (!beforeMap.isEmpty()) {
            commands.mset(beforeMap);
        }

        log.info(beforeMap.toString());
        return true;
    }
}
