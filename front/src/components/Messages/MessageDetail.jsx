import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MessageDetail = () => {
  const { sn } = useParams();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/message/${sn}`)
      .then((response) => {
        console.log("받은 메시지 목록:", response.data);
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("메시지 조회 실패", error);
      });
  }, [sn]);

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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const MessageNmContainer = styled.div`
  display: flex;
  border-radius: 50px;
  background: #b4e2ff;
  height: 70px;
  width: fit-content;
  align-items: center;
  padding: 0 30px;
  margin: 60px;
`;

const MessageRgnNm = styled.span`
  font-size: 30px;
`;

const MessageStepNm = styled.span`
  font-size: 30px;
`;

const MessageContent = styled.div`
  margin: 40px 70px;
  font-size: 30px;
  background-color: #ffe880;
  padding: 20px;
  border-radius: 16px;
`;

const MessageDate = styled.div`
  position: absolute;
  bottom: 100px;
  right: 100px;
  font-size: 24px;
  font-style: italic;
  color: #888;
  opacity: 0.8;
`;
