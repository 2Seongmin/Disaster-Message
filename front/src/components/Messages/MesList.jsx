import styled from "styled-components";

const MesList = () => {
  return (
    <ListSection>
      <ListTitle>긴급 재난 문자</ListTitle>

      <ListLayout>
        <MessageTitle>메세지 내용</MessageTitle>
        <MessageDate>메세지 날짜</MessageDate>
      </ListLayout>
    </ListSection>
  );
};

export default MesList;

const ListSection = styled.div``;

const ListTitle = styled.div``;

const ListLayout = styled.div`
  border-bottom: 1px solid grey;
  display: flex;
`;

const MessageTitle = styled.div`
  display: absoulte;
`;

const MessageDate = styled.div``;
