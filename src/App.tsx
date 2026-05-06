import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegisterASVendor from "./pages/RegisterAsVendor";
import ForgotPass from "./pages/ForgetPass";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/registerVendor" element={<RegisterASVendor />}></Route>
      <Route path="/forgotPassword" element={<ForgotPass />}></Route>
    </Routes>
  );
}

export default App;
