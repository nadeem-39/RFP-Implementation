import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { SideBar } from "../../components/AdminSideBar";
import { Footer } from "../../components/Footer";

export const AdminPanel = () => {
  return (
    <div id="layout-wrapper">
      <Navbar />
      <SideBar />
      <Outlet />
      <Footer />
    </div>
  );
};
