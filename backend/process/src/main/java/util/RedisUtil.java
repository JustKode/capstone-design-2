package util;

import config.Config;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisURI;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.sync.RedisCommands;

public class RedisUtil {
    final private static RedisClient redisClient;
    final private static StatefulRedisConnection<String, String> connection;
    final private static RedisCommands<String, String> commands;

    static {
        RedisURI redisURI = RedisURI.create(Config.REDIS_IP, Config.REDIS_PORT);
        redisClient = RedisClient.create(redisURI);
        connection = redisClient.connect();
        commands = connection.sync();
    }

    public static RedisCommands<String, String> getCommands() {
        return commands;
    }
}
