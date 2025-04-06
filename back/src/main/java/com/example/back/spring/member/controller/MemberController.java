package com.example.back.spring.member.controller;

import com.example.back.spring.member.model.dto.MemberDTO;
import com.example.back.spring.member.model.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/login")
    public String login(@RequestBody MemberDTO memberDTO) {
        MemberDTO member = memberService.login(memberDTO.getMemberId(), memberDTO.getMemberPw());

        if (member != null) {
            return "로그인 성공: " + member.getMemberName();
        } else {
            return "로그인 실패";
        }
    }

}
