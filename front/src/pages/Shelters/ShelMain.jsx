import styled from "styled-components";
import ShelList from "../../components/Shelters/ShelList";

const ShelMain = () => {
  return (
    <SheltersPageLayout>
      <ShelList />
    </SheltersPageLayout>
  );
};

export default ShelMain;

const SheltersPageLayout = styled.div``;
