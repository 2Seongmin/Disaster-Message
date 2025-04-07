import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Comment = () => {
  const { sn } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/message/comments/${sn}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("댓글 불러오기 실패", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment) return alert("댓글을 입력해주세요!");

    console.log("보내는 데이터 👉", { content: newComment, seq: sn });

    try {
      await axios.post(`http://localhost:8080/message/comments`, {
        content: newComment,
        seq: sn,
      });
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("댓글 등록 실패", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [sn]);

  return (
    <CommentWrapper>
      <CommentTitle>💬 댓글</CommentTitle>

      <CommentList>
        {comments.length === 0 ? (
          <EmptyText>아직 댓글이 없어요. 첫 댓글을 남겨보세요!</EmptyText>
        ) : (
          comments.map((c, idx) => (
            <CommentItem key={idx}>
              <CommentDate>
                {new Date(c.createDate).toLocaleString()}
              </CommentDate>
              <CommentContent>{c.content}</CommentContent>
            </CommentItem>
          ))
        )}
      </CommentList>

      <InputArea>
        <CommentInput
          type="text"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <SubmitButton onClick={handleCommentSubmit}>등록</SubmitButton>
      </InputArea>
    </CommentWrapper>
  );
};

export default Comment;

const CommentWrapper = styled.div`
  margin: 60px 100px 100px;
  padding: 20px;
  border-top: 2px solid #ccc;
`;

const CommentTitle = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentItem = styled.div`
  padding: 16px;
  border-radius: 12px;
  background-color: #f6f6f6;
  border: 1px solid #ddd;
`;

const CommentDate = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
`;

const CommentContent = styled.div`
  font-size: 18px;
`;

const EmptyText = styled.div`
  font-size: 18px;
  color: #aaa;
  margin: 20px 0;
`;

const InputArea = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 12px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #bbb;
  border-radius: 8px;
`;

const SubmitButton = styled.button`
  background-color: #269af9;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0f7cd6;
  }
`;
