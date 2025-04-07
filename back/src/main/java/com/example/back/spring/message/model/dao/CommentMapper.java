package com.example.back.spring.message.model.dao;

import com.example.back.spring.message.model.dto.CommentDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CommentMapper {

    @Insert("INSERT INTO TB_COMMENTS (UC_SEQ, CONTENT) VALUES(#{seq, jdbcType=NUMERIC}, #{content, jdbcType=VARCHAR})")
    void saveComment(CommentDTO comment);

    @Select("SELECT UC_SEQ seq, CONTENT content, CREATE_DATE createDate FROM TB_COMMENTS WHERE UC_SEQ = #{seq} ORDER BY CREATE_DATE DESC")
    List<CommentDTO> selectCommentList(Long ucSeq);


}
