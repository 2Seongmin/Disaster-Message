package com.example.back.spring.message.model.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CommentDTO {
    private Long seq;
    private String content;
    private Date createDate;
}

