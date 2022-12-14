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

    public static PageLog unpackPageLog(byte[] bytes) throws IOException {
        MessageUnpacker unpacker = MessagePack.newDefaultUnpacker(bytes);

        int mapLength = unpacker.unpackMapHeader();
        PageLog tempLog = new PageLog();

        for (int j = 0; j < mapLength; j++) {
            String key = unpacker.unpackString();

            switch (key) {
                case "BasePath":
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

        return tempLog;
    }

    public String getPageLogID() {
        return this.userId + " " + this.pathname;
    }
}
