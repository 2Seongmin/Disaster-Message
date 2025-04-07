import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MesList = () => {
  const navi = useNavigate();
  const [pageNo, setPageNo] = useState(1);
  const [messages, setMessages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [region, setRegion] = useState("");
  const [showRegionInput, setShowRegionInput] = useState(false);

  useEffect(() => {
    if (selectedCategory === "전체") {
      axios
        .get(`http://localhost:8080/message?pageNo=${pageNo}`)
        .then((res) => setMessages(res.data.body || []))
        .catch((err) => console.error("전체 메시지 가져오기 실패", err));
    } else if (selectedCategory === "날짜별") {
      axios
        .get(`http://localhost:8080/message/date?pageNo=${pageNo}`)
        .then((res) => setMessages(res.data.body || []))
        .catch((err) => console.error("날짜별 메시지 가져오기 실패", err));
    } else if (selectedCategory === "지역별" && region !== "") {
      axios
        .get(
          `http://localhost:8080/message/region?region=${region}&page=${pageNo}`
        )
        .then((res) => setMessages(res.data.body || []))
        .catch((err) => console.error("지역별 메시지 가져오기 실패", err));
    }
  }, [pageNo, selectedCategory, region]);

  const handleRegionSearch = () => {
    if (region.trim() !== "") {
      setPageNo(1); // 검색할 땐 첫 페이지부터
    }
  };

  return (
    <ListSection>
      <ListTitle>긴급 재난 문자</ListTitle>

      <CategoryList>
        <Category
          onClick={() => {
            setSelectedCategory("전체");
            setPageNo(1);
            setShowRegionInput(false);
          }}
        >
          전체
        </Category>
        <Category
          onClick={() => {
            setSelectedCategory("지역별");
            setMessages([]);
            setRegion("");
            setShowRegionInput(true);
            setPageNo(1);
          }}
        >
          지역별
        </Category>
        <Category
          onClick={() => {
            setSelectedCategory("날짜별");
            setShowRegionInput(false);
            setPageNo(1);
          }}
        >
          날짜별
        </Category>
      </CategoryList>

      {showRegionInput && (
        <SearchBox>
          <input
            type="text"
            value={region}
            placeholder="지역명을 입력하세요 (예: 서울)"
            onChange={(e) => setRegion(e.target.value)}
          />
          <button onClick={handleRegionSearch}>검색</button>
        </SearchBox>
      )}

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

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  padding: 12px 20px;
  background-color: #f4f9ff;
  border: 1px solid #cce6ff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
  width: 600px;
  max-width: 90%;
  gap: 10px;

  input {
    flex: 1;
    padding: 12px 16px;
    font-size: 16px;
    border: 1px solid #b3d7ff;
    border-radius: 8px;
    outline: none;
    background-color: white;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff;
    }
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
