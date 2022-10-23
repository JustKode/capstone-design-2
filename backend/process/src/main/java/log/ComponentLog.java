package log;

import lombok.*;
import org.msgpack.core.MessagePack;
import org.msgpack.core.MessageUnpacker;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@ToString
@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComponentLog {
    private String userId;
    private Long timestamp;
    private Boolean doing;
    private String actionType;
    private String objectId;

    public static List<ComponentLog> unpackComponentLog(byte[] bytes) throws IOException {
        List<ComponentLog> logs = new ArrayList<>();
        MessageUnpacker unpacker = MessagePack.newDefaultUnpacker(bytes);

        int arrayLength = unpacker.unpackArrayHeader();

        for (int i = 0; i < arrayLength; i++) {
            int mapLength = unpacker.unpackMapHeader();
            ComponentLog tempLog = new ComponentLog();

            for (int j = 0; j < mapLength; j++) {
                String key = unpacker.unpackString();

                switch (key) {
                    case "UserId":
                        tempLog.setUserId(unpacker.unpackString());
                        break;
                    case "TimeStamp":
                        tempLog.setTimestamp(unpacker.unpackLong());
                        break;
                    case "Doing":
                        tempLog.setDoing(unpacker.unpackBoolean());
                        break;
                    case "ActionType":
                        tempLog.setActionType(unpacker.unpackString());
                        break;
                    case "ObjectId":
                        tempLog.setObjectId(unpacker.unpackString());
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
