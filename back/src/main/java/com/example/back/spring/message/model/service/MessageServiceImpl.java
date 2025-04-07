package com.example.back.spring.message.model.service;

import com.example.back.spring.message.model.dao.CommentMapper;
import com.example.back.spring.message.model.dto.CommentDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final String SERVICE_KEY = "Z01DPH8K8834K5VC";
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    // API 요청
    private String apiRequest(String uriPath) {
        try {
            URI uri = new URI(uriPath);
            return restTemplate.getForObject(uri, String.class);
        } catch (URISyntaxException e) {
            log.error("URI syntax error: {}", uriPath, e);
            return "{}";
        } catch (Exception e) {
            log.error("API request failed: {}", uriPath, e);
            return "{}";
        }
    }

    // API URL 생성
    private String messageApiUrl(int pageNo) {
        String today = new SimpleDateFormat("yyyyMMdd").format(new Date());
        if (pageNo < 1) pageNo = 1;

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
    @Override
    public String messageDetail(int sn) {
        int page = 1;
        while (true) {
            String response = apiRequest(messageApiUrl(page));

            try {
                // log.info("Searching page {}...", page);
                Map<String, Object> map = mapper.readValue(response, Map.class);
                List<Map<String, Object>> items = (List<Map<String, Object>>) map.get("body");

                if (items == null || items.isEmpty()) break;

                for (Map<String, Object> item : items) {
                    if (((Number) item.get("SN")).intValue() == sn) {
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

    /* 지역별로 찾기 */
    @Override
    public String findByRegion(String region, int page) {
        int apiPage = 1;
        List<Map<String, Object>> messageList = new ArrayList<>();

        while (true) {
            String response = apiRequest(messageApiUrl(apiPage));

            try {
                // log.info("Searching page {}...", page);
                Map<String, Object> map = mapper.readValue(response, Map.class);
                List<Map<String, Object>> items = (List<Map<String, Object>>) map.get("body");

                if (items == null || items.isEmpty()) break;

                for (Map<String, Object> item : items) {
                    String searchRegion = (String) item.get("RCPTN_RGN_NM");
                    if (searchRegion != null && searchRegion.contains(region)) {
                        messageList.add(item);
                    }
                }
                apiPage++;
            } catch (Exception e) {
                log.error("Parsing error on page {}", apiPage, e);
                break;
            }
        }

        int start = (page - 1) * 5;
        int end = Math.min(start + 5, messageList.size());
        List<Map<String, Object>> resultList = messageList.subList(start, end);

        try {
            return mapper.writeValueAsString(resultList);
        } catch (Exception e) {
            return "[]";
        }
    }


    /* 댓글 */
    private final CommentMapper commentMapper;

    @Override
    public void saveComment(CommentDTO comment) {
        commentMapper.saveComment(comment);

    }

    @Override
    public List<CommentDTO> selectCommentList(Long seq) {
        return commentMapper.selectCommentList(seq);
    }

}
