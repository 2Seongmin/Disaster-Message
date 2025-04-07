import styled from "styled-components";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <MainLayout>
      <Title>재난 안전 정보 통합 플랫폼</Title>
      <Description>
        이 플랫폼은 재난 발생 시 국민 여러분께{" "}
        <strong>신속하고 정확한 정보</strong>를 제공하기 위해 만들어졌습니다.
        <br />
        <strong>긴급재난문자</strong>와 <strong>통합대피소 위치</strong>를 한
        곳에서 확인하고 빠르게 대처하세요.
        <br />
        <br />
        모두의 안전을 위한 첫걸음, 지금 확인해보세요.
      </Description>

      <CardWrapper>
        <InfoCard>
          <h2>📢 긴급재난문자</h2>
          <p>
            실시간으로 발송되는 국가재난문자를 확인하고
            <br /> 현재 지역의 위험 상황에 빠르게 대응하세요.
          </p>
          <StyledLink to="/messages">바로가기</StyledLink>
        </InfoCard>

        <InfoCard>
          <h2>🏃 통합대피소</h2>
          <p>
            현재 위치 기반으로 가까운 대피소를 조회하고
            <br /> 재난 발생 시 신속히 대피할 수 있습니다.
          </p>
          <StyledLink to="/shelters">바로가기</StyledLink>
        </InfoCard>
      </CardWrapper>
    </MainLayout>
  );
};

export default Main;

// styled-components

const MainLayout = styled.div`
  max-width: 1000px;
  margin: 200px auto;
  padding: 0 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #1a4b91;
`;

const Description = styled.p`
  font-size: 18px;
  color: #555;
  line-height: 1.8;
  margin-bottom: 60px;

  strong {
    color: #000;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const InfoCard = styled.div`
  flex: 1;
  border: 2px solid #ddd;
  border-radius: 16px;
  padding: 30px;
  background-color: #f9f9f9;
  transition: 0.3s;

  h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  p {
    font-size: 16px;
    color: #444;
    margin-bottom: 20px;
  }

  &:hover {
    border-color: #269af9;
    background-color: #e8f5ff;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #269af9;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: #1783d3;
  }
`;
