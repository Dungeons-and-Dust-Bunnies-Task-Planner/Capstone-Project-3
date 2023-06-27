package com.example.capstoneprojectteam3.utils;

import com.example.capstoneprojectteam3.services.KeyService;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import com.example.capstoneprojectteam3.models.OpenAI.OpenAIResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OpenAIRequest {

    private final KeyService keyService;

    @Autowired
    public OpenAIRequest(KeyService keyService) {
        this.keyService = keyService;
    }

    public OpenAIResponse sendOpenAIRequest(String message) throws Exception {
        String apiUrl = "https://api.openai.com/v1/completions";
        String apiKey = keyService.getOpenAiKey();
        String authorizationHeader = "Bearer " + apiKey;
        String requestBody = "{\"prompt\":\"" + message + "\"," +
                "\"max_tokens\":100," +
                "\"model\":\"text-davinci-003\"}";

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost request = new HttpPost(apiUrl);
            request.setHeader(HttpHeaders.AUTHORIZATION, authorizationHeader);
            request.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
            request.setEntity(new StringEntity(requestBody));

            HttpResponse response = httpClient.execute(request);
            String responseString = EntityUtils.toString(response.getEntity());

            ObjectMapper mapper = new ObjectMapper();
            OpenAIResponse openAIResponse = mapper.readValue(responseString, OpenAIResponse.class);

            EntityUtils.consume(response.getEntity());

            return openAIResponse;
        }
    }
}
