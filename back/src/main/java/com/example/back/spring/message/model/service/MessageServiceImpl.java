package com.example.back.spring.message.model.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageServiceImpl {

    private final String SERVICE_KEY = "Z01DPH8K8834K5VC";

    /* 긴급 재난 문자 api 리스트 가져오기 */
    private String apiRequest(String uriPath){
        URI uri = null;
        try {
            uri = new URI(uriPath);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        String apiResponseData = new RestTemplate().getForObject(uri, String.class);
        return apiResponseData;
    }

    public String requestMessages(int pageNo){

        if(pageNo < 1){
            pageNo = 1;
        }

        StringBuilder sb = new StringBuilder();

        sb.append("https://www.safetydata.go.kr/V2/api/DSSP-IF-00247");
        sb.append("?serviceKey=" + SERVICE_KEY);
        sb.append("&pageNo=" + pageNo);
        sb.append("&numOfRows=5");

        return apiRequest(sb.toString());

    }
}
