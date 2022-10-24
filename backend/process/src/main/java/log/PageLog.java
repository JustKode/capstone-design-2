package log;


import lombok.*;
import org.msgpack.core.MessagePack;
import org.msgpack.core.MessageUnpacker;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@ToString
@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageLog {
    private String pathname;
    private Long timestamp;
    private String userId;

    public static List<PageLog> unpackPageLog(byte[] bytes) throws IOException {
        List<PageLog> logs = new ArrayList<>();
        MessageUnpacker unpacker = MessagePack.newDefaultUnpacker(bytes);

        int arrayLength = unpacker.unpackArrayHeader();

        for (int i = 0; i < arrayLength; i++) {
            int mapLength = unpacker.unpackMapHeader();
            PageLog tempLog = new PageLog();

            for (int j = 0; j < mapLength; j++) {
                String key = unpacker.unpackString();

                switch (key) {
                    case "Pathname":
                        tempLog.setPathname(unpacker.unpackString());
                        break;
                    case "Timestamp":
                        tempLog.setTimestamp(unpacker.unpackLong());
                        break;
                    case "UserId":
                        tempLog.setUserId(unpacker.unpackString());
                        break;
                    default:
                        break;
                }
            }

            logs.add(tempLog);
        }
        return logs;
    }
}
