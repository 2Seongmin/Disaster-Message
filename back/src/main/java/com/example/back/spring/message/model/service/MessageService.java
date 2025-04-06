package com.example.back.spring.message.model.service;

import com.example.back.spring.message.model.dto.MessageDTO;

import java.util.List;
import java.util.Map;

public interface MessageService {
    String allMessages(int pageNo);

    String messageDetail(int sn);

    String findByRegion(String region, int page);

}
