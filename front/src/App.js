import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/common/Header/Header";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import MesMain from "./pages/Messages/MesMain";
import MesDetail from "./pages/Messages/MesDetail";
import ShelMain from "./pages/Shelters/ShelMain";
import ShelDetail from "./pages/Shelters/ShelDetail";
import Footer from "./components/common/Footer/Footer";
import Main from "./pages/Main/Main";

function App() {
  return (
    <>
      <Header />

      {/* 라우터 */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/messages" element={<MesMain />} />
        <Route path="/shelters" element={<ShelMain />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/messageDetail/:sn" element={<MesDetail />} />
        <Route path="/shelterDetail/:sn" element={<ShelDetail />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
