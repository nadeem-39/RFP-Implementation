import { Route, Routes } from "react-router-dom";
import { AdminHome } from "../pages/AdminPages/AdminHome";
import { AdminCategories } from "../pages/AdminPages/AdminCategories";
import { VendorList } from "../pages/AdminPages/VendorList";
import { RFPList } from "../pages/AdminPages/RFPList";
import { UserMangement } from "../pages/AdminPages/UserMangement";
import { AddCategory } from "../pages/AdminPages/AddCategory";
import { AddRFP } from "../pages/AdminPages/AddRFP";
export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<AdminHome />} />
      <Route path="vendors-list" element={<VendorList />} />
      <Route path="rfps-list" element={<RFPList />} />
      <Route path="user-management" element={<UserMangement />} />
      <Route path="categories" element={<AdminCategories />} />
      <Route path="category/add-category" element={<AddCategory />} />
      <Route path="add-rfp" element={<AddRFP />} />
    </Routes>
  );
};
