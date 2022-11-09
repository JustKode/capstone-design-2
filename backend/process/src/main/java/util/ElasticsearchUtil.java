package util;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import config.Config;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;

public class ElasticsearchUtil {
    final private static RestClient restClient;
    final private static ElasticsearchTransport transport;
    final private static ElasticsearchClient client;

    static {
        restClient = RestClient.builder(
                new HttpHost(Config.ES_IP, Config.ES_PORT)).build();
        transport = new RestClientTransport(restClient, new JacksonJsonpMapper());
        client = new ElasticsearchClient(transport);
    }

    public static ElasticsearchClient getClient() {
        return client;
    }
}
