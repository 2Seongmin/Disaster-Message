package com.example.back.spring.member.model.service;

import com.example.back.spring.member.model.dao.MemberMapper;
import com.example.back.spring.member.model.dto.MemberDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;

    @Override
    public MemberDTO login(String memberId, String memberPw) {
        MemberDTO member = new MemberDTO();
        member.setMemberId(memberId);
        member.setMemberPw(memberPw);
        return memberMapper.login(member);
    }

}
