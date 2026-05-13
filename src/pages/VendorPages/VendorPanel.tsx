import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/VendorSideBar";
import { Footer } from "../../components/Footer";

export const VendorPanel = () => {
  return (
    <div id="layout-wrapper">
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
};
