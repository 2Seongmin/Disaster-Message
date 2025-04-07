package com.example.back.spring.shelter.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShelterServiceImpl implements ShelterService {

    private final String SERVICE_KEY = "";
    private final ObjectMapper mapper = new ObjectMapper();

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
    private String sheltersApiUrl(int pageNo) {

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
        return apiRequest(sheltersApiUrl(pageNo));
    }

    /* 세부 대피소 조회 */
    @Override
    public String shelterDetail(String sn) {
        int page = 1;

        while (true) {
            String response = apiRequest(sheltersApiUrl(page));

            try {
                Map<String, Object> map = mapper.readValue(response, Map.class);
                List<Map<String, Object>> items = (List<Map<String, Object>>) map.get("body");

                if (items == null || items.isEmpty()) break;

                for (Map<String, Object> item : items) {
                    String mngSn = (String) item.get("MNG_SN");
                    if (mngSn != null && mngSn.equals(sn)) {
                        return mapper.writeValueAsString(item);
                    }
                }

                page++;
            } catch (Exception e) {
                log.error("Parsing error on page {}", page, e);
                break;
            }
        }

        return "{}";
    }


}
