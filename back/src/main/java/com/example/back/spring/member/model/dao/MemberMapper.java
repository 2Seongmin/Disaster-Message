package com.example.back.spring.member.model.dao;

import com.example.back.spring.member.model.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {

    MemberDTO login(MemberDTO memberDTO);

}
