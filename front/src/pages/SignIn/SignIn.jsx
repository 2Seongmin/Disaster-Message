import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [memberId, setMemberId] = useState("");
  const [memberPw, setMemberPw] = useState("");
  const navi = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post("http://localhost:8080/login", {
        memberId,
        memberPw,
      });
      alert("로그인 성공!");
      navi("/");
      window.location.reload();
    } catch (error) {
      alert("로그인 실패");
    }
  };

  return (
    <>
      <LoginLayout>
        <LoginTop>
          <LoginTitle>로그인을 해주세요.</LoginTitle>
          <LoginContent>아이디와 비밀번호를 작성해주세요.</LoginContent>
        </LoginTop>

        <LoginContainer>
          <LoginId
            type="text"
            placeholder="아이디"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          ></LoginId>
          <LoginPw
            type="text"
            placeholder="비밀번호"
            value={memberPw}
            onChange={(e) => setMemberPw(e.target.value)}
          ></LoginPw>
          <LoginButton onClick={handleLogin}>시작하기</LoginButton>
        </LoginContainer>
      </LoginLayout>
    </>
  );
};

export default SignIn;

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 260px;
`;

const LoginTop = styled.div``;

const LoginTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(90deg, #45f3ff 0%, #269af9 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;
const LoginContent = styled.p`
  color: #949494;
  text-align: center;
  font-size: 12px;
`;

const LoginContainer = styled.div``;

const LoginId = styled.input`
  width: 319px;
  height: 49px;
  fill: #fff;
  stroke-width: 1px;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  display: block;
  margin: 25px 0px 12px 0px;
`;

const LoginPw = styled.input`
  width: 319px;
  height: 49px;
  fill: #fff;
  stroke-width: 1px;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  display: block;
`;

const LoginButton = styled.button`
  width: 319px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(90deg, #45f3ff 0%, #269af9 100%);
  border-style: none;
  color: white;
  font-size: 16px;
  margin-top: 38px;
`;
