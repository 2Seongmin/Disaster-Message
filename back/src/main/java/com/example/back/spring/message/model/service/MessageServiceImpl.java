package com.example.back.spring.message.model.service;

import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

public class MessageServiceImpl {

    private final String SERVICE_KEY = "Z01DPH8K8834K5VC";


    /* 긴급 재난 문자 api 리스트 가져오기 */
    private String apiRequest(String uriPath){
        StringBuilder sb = new StringBuilder();

        sb.append("https://www.safetydata.go.kr/V2/api/DSSP-IF-00247");
        sb.append("?serviceKey=" + SERVICE_KEY);
        sb.append("&numOfRows=5");

        try {
            URI uri = new URI(sb.toString());

            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(uri, String.class);

            return response;
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return null;
    }


    private String

}
