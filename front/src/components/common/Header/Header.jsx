import React from "react";
import styled from "styled-components";
import LogoSrc from "../../../assets/img/MessageLogo.png";

import { useNavigate } from "react-router-dom";
const Header = () => {
  const navi = useNavigate();

  return (
    <HeaderLayout>
      <HeaderLeft>
        <LogoImg src={LogoSrc} alt="Logo" />
        <Logo onClick={() => navi("/")}>DisasterMessage</Logo>
      </HeaderLeft>
      <HeaderRight>
        <NavList onClick={() => navi("/messages")}>긴급 재난 문자</NavList>
        <NavList onClick={() => navi("/shelters")}>통합 대피소</NavList>
        <NavList onClick={() => navi("/signIn")}>로그인</NavList>
        <NavList onClick={() => navi("/signUp")}>회원가입</NavList>
      </HeaderRight>
    </HeaderLayout>
  );
};

export default Header;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1340px;
  height: 113px;
  background: #b4e2ff;
  padding: 0 50px;
`;

const HeaderLeft = styled.div`
  display: flex;
`;

const LogoImg = styled.img`
  margin-left: 40px;
`;

const Logo = styled.p`
  font-size: 24px;
  font-weight: 800;
  font-family: "JALNAN2";
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 50px;
  margin-right: 90px;
`;

const NavList = styled.span`
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
`;
