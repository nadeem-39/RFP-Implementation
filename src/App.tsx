import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegisterASVendor from "./pages/RegisterAsVendor";
import ForgotPass from "./pages/ForgetPass";
import { AdminRoutes } from "./Routes/AdminRoutes";
import { AdminPanel } from "./pages/AdminPages/AdminPanel";
import { VendorRoutes } from "./Routes/VendorRoutes";
import { VendorPanel } from "./pages/VendorPages/VendorPanel";
import RegisterAsAdmin from "./pages/RegisterAsAdmin";
import { ResetPassword } from "./pages/ResetPassword";
import { ProtectedRoute } from "./Routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/registerAdmin" element={<RegisterAsAdmin />} />
      <Route path="/registerVendor" element={<RegisterASVendor />}></Route>
      <Route path="/forgotPassword" element={<ForgotPass />}></Route>
      <Route path="/resetPassword" element={<ResetPassword />}></Route>

      <Route
        path="/admin/"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      >
        <Route path="*" element={<AdminRoutes />} />
      </Route>
      <Route
        path="/vendor/"
        element={
          <ProtectedRoute>
            <VendorPanel />
          </ProtectedRoute>
        }
      >
        <Route path="*" element={<VendorRoutes />} />
      </Route>
    </Routes>
  );
}

export default App;
