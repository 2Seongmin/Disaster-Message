import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/common/Header/Header";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import MesMain from "./pages/Messages/MesMain";
import MesDetail from "./pages/Messages/MesDetail";

function App() {
  return (
    <>
      <Header />

      {/* 라우터 */}
      <Routes>
        <Route path="/" />
        <Route path="/messages" element={<MesMain />} />
        <Route path="/shelters" />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/messageDetail/:id" element={<MesDetail />} />
      </Routes>
    </>
  );
}

export default App;
