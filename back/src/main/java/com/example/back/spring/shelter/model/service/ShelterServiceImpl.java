package com.example.back.spring.shelter.model.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShelterServiceImpl implements ShelterService {

    private final String SERVICE_KEY = "0748MGTH73G24V0B";

    /* 긴급 재난 문자 API 요청 */
    private String apiRequest(String uriPath) {
        URI uri = null;
        try {
            uri = new URI(uriPath);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        String apiResponseData = new RestTemplate().getForObject(uri, String.class);
        return apiResponseData;
    }

    /* API URL 생성 */
    private String SheltersApiUrl(int pageNo) {

        if (pageNo < 1) {
            pageNo = 1;
        }

        return "https://www.safetydata.go.kr/V2/api/DSSP-IF-10941"
                + "?serviceKey=" + SERVICE_KEY
                + "&pageNo=" + pageNo
                + "&numOfRows=5";
    }

    /* 전체 대피소 조회 */
    @Override
    public String allShleters(int pageNo) {
        return apiRequest(SheltersApiUrl(pageNo));
    }

}
