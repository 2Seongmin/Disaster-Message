package com.example.back.spring.shelter.model.service;

import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ShelterServiceImpl implements ShelterService {

    private final String SERVICE_KEY = "Z01DPH8K8834K5VC";

    /* 통합 대피소 api 리스트 가져오기 */
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

    /* 전체 조회 */
    public String requestMessages(int pageNo){

        // 날짜 역순으로 정렬
        String today = new SimpleDateFormat("yyyyMMdd").format(new Date());

        if(pageNo < 1){
            pageNo = 1;
        }

        StringBuilder sb = new StringBuilder();

        sb.append("https://www.safetydata.go.kr/V2/api/DSSP-IF-00247");
        sb.append("?serviceKey=" + SERVICE_KEY);
        sb.append("&pageNo=" + pageNo);
        sb.append("&numOfRows=5");
        sb.append("&crtDt=" + today);

        return apiRequest(sb.toString());
    }
    
}
