package com.example.capstoneprojectteam3.utils;

import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import com.example.capstoneprojectteam3.config.SecurityConstants;
import com.example.capstoneprojectteam3.models.OpenAI.OpenAIResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

public class OpenAIRequest {

    public static OpenAIResponse sendOpenAIRequest(String message) {
        OpenAIResponse openAIResponse = null;
        try {
            CloseableHttpClient httpClient = HttpClients.createDefault();
            String apiUrl = "https://api.openai.com/v1/completions";
            String apiKey = SecurityConstants.openApiKey;
            String authorizationHeader = "Bearer " + apiKey;
            String requestBody = "{\"prompt\":\"" + message + "\"," +
                                 "\"max_tokens\":30," +
                                 " \"model\":\"text-davinci-003\"}";

            HttpPost request = new HttpPost(apiUrl);
            request.setHeader(HttpHeaders.AUTHORIZATION, authorizationHeader);
            request.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");
            request.setEntity(new StringEntity(requestBody));

            HttpResponse response = httpClient.execute(request);
            String responseString = EntityUtils.toString(response.getEntity());

//            System.out.println(responseString);

            ObjectMapper mapper = new ObjectMapper();
            openAIResponse = mapper.readValue(responseString, OpenAIResponse.class);

            EntityUtils.consume(response.getEntity());
            httpClient.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return openAIResponse;
    }
}