import styled from "styled-components";
import MesList from "../../components/Messages/MesList";

const MesMain = () => {
  return (
    <MessagesPageLayout>
      <MesList />
    </MessagesPageLayout>
  );
};

export default MesMain;

const MessagesPageLayout = styled.div``;
