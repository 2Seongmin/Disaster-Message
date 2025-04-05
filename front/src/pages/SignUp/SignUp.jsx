import styled from "styled-components";

const SignUp = () => {
  return (
    <SignUpLayout>
      <SignUpTitle>회원가입을 해주세요.</SignUpTitle>

      <SignUpContainer>
        <FormGroup>
          <label>이름</label>
          <Input type="text" placeholder="이름을 입력하세요" />
        </FormGroup>

        <FormGroup>
          <label>전화번호</label>
          <Input type="tel" placeholder="전화번호를 입력하세요" />
        </FormGroup>

        <FormGroup>
          <label>아이디</label>
          <Input type="text" placeholder="아이디를 입력하세요" />
        </FormGroup>

        <FormGroup>
          <label>비밀번호</label>
          <Input type="password" placeholder="비밀번호를 입력하세요" />
        </FormGroup>

        <FormGroup>
          <label>닉네임</label>
          <Input type="text" placeholder="닉네임을 입력하세요" />
        </FormGroup>

        <SignUpButton>회원가입하기</SignUpButton>
      </SignUpContainer>
    </SignUpLayout>
  );
};

export default SignUp;
const SignUpLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 130px;
`;

const SignUpTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(90deg, #45f3ff 0%, #269af9 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const SignUpContainer = styled.div`
  margin-top: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #444;
  }
`;

const Input = styled.input`
  width: 319px;
  height: 49px;
  padding: 0 12px;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  font-size: 16px;
  box-sizing: border-box;
`;

const SignUpButton = styled.button`
  width: 319px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(90deg, #45f3ff 0%, #269af9 100%);
  border-style: none;
  color: white;
  font-size: 16px;
  margin-top: 38px;
`;
