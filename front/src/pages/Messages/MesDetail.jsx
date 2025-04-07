import styled from "styled-components";
import MessageDetail from "../../components/Messages/MessageDetail";
import Comment from "../../components/Messages/Comment";

const MesDetail = () => {
  return (
    <MessageDetailLayout>
      <MessageDetail />
      <Comment />
    </MessageDetailLayout>
  );
};

export default MesDetail;

const MessageDetailLayout = styled.div``;
