package com.example.back.spring.message.model.service;

import com.example.back.spring.message.model.dto.MessageDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final String SERVICE_KEY = "Z01DPH8K8834K5VC";
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    /* 긴급 재난 문자 API 요청 */
    private String apiRequest(String uriPath) {
        try {
            URI uri = new URI(uriPath);
            return restTemplate.getForObject(uri, String.class);
        } catch (URISyntaxException e) {
            log.error("URI syntax error: {}", uriPath, e);
            return "{}";  // 빈 JSON 반환
        } catch (Exception e) {
            log.error("API request failed: {}", uriPath, e);
            return "{}";  // 빈 JSON 반환
        }
    }

    /* API URL 생성 */
    private String messageApiUrl(int pageNo) {
        String today = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

        if (pageNo < 1) {
            pageNo = 1;
        }

        return "https://www.safetydata.go.kr/V2/api/DSSP-IF-00247"
                + "?serviceKey=" + SERVICE_KEY
                + "&pageNo=" + pageNo
                + "&numOfRows=5"
                + "&crtDt=" + today;
    }

    /* 전체 메시지 조회 */
    @Override
    public String allMessages(int pageNo) {
        return apiRequest(messageApiUrl(pageNo));
    }

    /* 세부 메시지 조회 */
    private String messageDetailUrl() {
        return "https://www.safetydata.go.kr/V2/api/DSSP-IF-00247"
                + "?serviceKey=" + SERVICE_KEY;
    }

    @Override
    public String getMessageById(String sn) {
        String responseJson = apiRequest(messageApiUrl(1));  // 필요시 페이지 반복 가능

        try {
            // 전체 JSON을 Map으로 변환
            Map<String, Object> jsonMap = mapper.readValue(responseJson, Map.class);

            // 구조를 따라 내려가기
            Map<String, Object> response = (Map<String, Object>) jsonMap.get("response");
            Map<String, Object> body = (Map<String, Object>) response.get("body");
            List<Map<String, Object>> items = (List<Map<String, Object>>) body.get("items");

            // SN 필터링
            for (Map<String, Object> item : items) {
                String itemSn = String.valueOf(item.get("SN"));  // 숫자라서 String 변환 필요
                if (itemSn.equals(sn)) {
                    return mapper.writeValueAsString(item);  // 해당 item을 다시 JSON 문자열로
                }
            }

        } catch (Exception e) {
            log.error("Map 파싱 또는 필터링 오류", e);
        }

        return "{}";  // 못 찾으면 빈 JSON 반환
    }


}
