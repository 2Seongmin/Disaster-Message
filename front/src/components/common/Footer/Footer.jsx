import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterTop>
        <PolicyLink href="#">이용약관</PolicyLink>
        <PolicyLink href="#">개인정보처리방침</PolicyLink>
      </FooterTop>

      <FooterInfo>
        (30112) 세종특별자치시 도움6로 42(어진동) | 재난안전데이터과
        044-205-4465
        <br />
        문의처 & Helpdesk : 044-205-8461, 8462
      </FooterInfo>

      <FooterCopyright>ⓒ 행정안전부. All rights reserved.</FooterCopyright>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  background-color: #f4f4f4;
  padding: 30px 50px;
  text-align: center;
  font-size: 14px;
  color: #555;
  border-top: 1px solid #ddd;
`;

const FooterTop = styled.div`
  margin-bottom: 10px;
`;

const PolicyLink = styled.a`
  margin: 0 10px;
  color: #269af9;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterInfo = styled.div`
  margin-bottom: 8px;
  line-height: 1.5;
`;

const FooterCopyright = styled.div`
  font-style: italic;
  opacity: 0.7;
`;
