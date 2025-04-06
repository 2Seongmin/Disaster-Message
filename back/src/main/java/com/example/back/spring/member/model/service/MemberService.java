package com.example.back.spring.member.model.service;

import com.example.back.spring.member.model.dto.MemberDTO;

public interface MemberService {
    MemberDTO login(String email, String password);
}
