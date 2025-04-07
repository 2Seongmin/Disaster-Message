package com.example.back.spring.message.model.service;

import com.example.back.spring.message.model.dto.CommentDTO;

import java.util.List;

public interface MessageService {
    String allMessages(int pageNo);

    String messageDetail(int sn);

    String findByRegion(String region, int page);

    void saveComment(CommentDTO comment);

    List<CommentDTO> selectCommentList(Long seq);

}
