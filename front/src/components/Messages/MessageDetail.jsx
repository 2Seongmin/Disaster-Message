import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MessageDetail = () => {
  const { id } = useParams();
  const [message, setMessage] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/message/${id}`)
      .then((response) => {
        console.log("받은 메시지 목록:", response.data.body);
        setMessage(response.data.body); // List<MessageDTO> 형식이면 이대로 OK
      })
      .catch((error) => {
        console.error("메시지 조회 실패", error);
      });
  }, [id]);

  if (!message) {
    return <h1>메시지 조회 중입니다.</h1>;
  }

  return (
    <MessageDetailLayout>
      <MessageRegion>{message.RCPTN_RGN_NM}</MessageRegion>

      <MessageContainer>
        <MessageNmContainer>
          <MessageRgnNm>{message.EMRG_STEP_NM} ▶️</MessageRgnNm>
          <MessageStepNm>{message.DST_SE_NM}</MessageStepNm>
        </MessageNmContainer>
        <MessageContent>{message.MSG_CN}</MessageContent>
        <MessageDate>{message.CRT_DT}</MessageDate>
      </MessageContainer>
    </MessageDetailLayout>
  );
};

export default MessageDetail;

const MessageDetailLayout = styled.div`
  margin: 100px;
`;

const MessageRegion = styled.div`
  font-size: 40px;
  margin-bottom: 50px;
`;

const MessageContainer = styled.div`
  width: 1240px;
  height: 606px;
  border-radius: 16px;
  border: 2px solid #269af9;
  padding: 20px;
`;

const MessageNmContainer = styled.div`
  display: flex;
  border-radius: 50px;
  background: #b4e2ff;
  height: 70px;
  width: auto;
  align-items: center;
  padding: 0 30px;
  margin: 60px;
`;

const MessageRgnNm = styled.span`
  font-size: 30px;
`;

const MessageStepNm = styled.span`
  font-size: 30px;
  padding: 20px;
`;

const MessageContent = styled.div`
  margin: 90px 70px;
  font-size: 30px;
`;

const MessageDate = styled.div`
  font-size: 30px;
`;
