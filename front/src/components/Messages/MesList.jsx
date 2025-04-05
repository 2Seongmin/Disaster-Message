import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MesList = () => {
  const navi = useNavigate();
  const [pageNo, setPageNo] = useState(1);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/message?pageNo=${pageNo}`)
      .then((response) => {
        console.log(response.data.body);
        setMessages(response.data.body);
      })
      .catch((error) => {
        console.error("재난문자 가져오기 실패", error);
      });
  }, [pageNo]);

  return (
    <ListSection>
      <ListTitle>긴급 재난 문자</ListTitle>

      <CategoryList>
        <Category>전체</Category>
        <Category>지역별</Category>
        <Category>날짜별</Category>
      </CategoryList>

      <ListLayout>
        <ListTh>
          <ListTopTitle>재해구분명</ListTopTitle>
          <ListTopRegion>지역</ListTopRegion>
        </ListTh>

        {messages.map((message) => (
          <ListTr
            key={message.SN}
            onClick={() => navi(`/messageDetail/${message.SN}`)}
          >
            <ListTdOne>{message.DST_SE_NM}</ListTdOne>
            <ListTdTwo>{message.RCPTN_RGN_NM}</ListTdTwo>
          </ListTr>
        ))}
      </ListLayout>

      <Pagination>
        <button onClick={() => setPageNo(1)}>&lt;&lt;</button>
        <button
          onClick={() => setPageNo((prev) => Math.max(1, prev - 1))}
          disabled={pageNo === 1}
        >
          &lt;
        </button>
        <span>{pageNo}</span>
        <button onClick={() => setPageNo((prev) => prev + 1)}>&gt;</button>
        <button onClick={() => setPageNo((prev) => prev + 10)}>&gt;&gt;</button>
      </Pagination>
    </ListSection>
  );
};

export default MesList;

const ListSection = styled.div`
  padding: 100px;
`;

const ListTitle = styled.h3``;

const CategoryList = styled.div`
  display: flex;
  gap: 40px;
`;

const Category = styled.button`
  border-radius: 16px;
  background: #7dcdff;
  width: 130px;
  height: 50px;
  border-style: none;
  font-size: 24px;
`;

const ListLayout = styled.div`
  margin: 60px 0px;
  width: 1176px;
`;

const ListTh = styled.div`
  border-radius: 17px;
  background: #ceecff;
  width: 1176px;
  height: 78px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 24px;
`;

const ListTopTitle = styled.div`
  width: 1000px;
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 78px;
`;

const ListTopRegion = styled.div`
  width: 176px;
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 78px;
`;

const ListTr = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  width: 1216px;
  height: 80px;
  align-items: center;

  &:hover {
    background-color: lightgray;
  }
`;

const ListTdOne = styled.div`
  width: 1000px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
  padding: 0 20px;
`;

const ListTdTwo = styled.div`
  width: 300px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;

  button {
    width: 3.125rem;
    height: 3.125rem;
    border: none;
    border-radius: 50%;
    padding: 8px 16px;
    background-color: #d9d9d9;
    border: none;
    cursor: pointer;
    color: #fff;

    &:disabled {
      opacity: 0.5;
    }
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    text-align: center;
  }
`;
