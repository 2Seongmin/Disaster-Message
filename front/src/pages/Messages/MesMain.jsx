import styled from "styled-components";
import MesList from "../../components/Messages/MesList";
import MesNav from "../../components/Messages/MesNav";

const MesMain = () => {
  return (
    <MessagesPageLayout>
      <MesNav />
      <MesList />
    </MessagesPageLayout>
  );
};

export default MesMain;

const MessagesPageLayout = styled.div``;
