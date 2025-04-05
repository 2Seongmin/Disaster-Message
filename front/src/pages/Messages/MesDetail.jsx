import styled from "styled-components";
import MessageDetail from "../../components/Messages/MessageDetail";

const MesDetail = () => {
  return (
    <MessageDetailLayout>
      <MessageDetail />
    </MessageDetailLayout>
  );
};

export default MesDetail;

const MessageDetailLayout = styled.div``;
