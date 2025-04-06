package com.example.back.spring.member.model.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MemberDTO {

    private String memberId;
    private String memberPw;
    private String memberName;
    private String memberEmail;
    private Date enrollDate;

}
