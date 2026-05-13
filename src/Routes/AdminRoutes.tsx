import { Route, Routes } from "react-router-dom";
import { AdminHome } from "../pages/AdminPages/AdminHome";
import { AdminCategories } from "../pages/AdminPages/AdminCategories";
import { VendorList } from "../pages/AdminPages/VendorList";
import { RFPList } from "../pages/AdminPages/RFPList";
import { AddCategory } from "../pages/AdminPages/AddCategory";
import { AddRFP } from "../pages/AdminPages/AddRFP";
import { SelectCategories } from "../pages/AdminPages/SelectCategories";
import { RFPQuotes } from "../pages/AdminPages/RFPQuotes";
export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<AdminHome />} />
      <Route path="vendors-list" element={<VendorList />} />
      <Route path="rfps-list" element={<RFPList />} />
      <Route path="categories" element={<AdminCategories />} />
      <Route path="category/add-category" element={<AddCategory />} />
      <Route path="add-rfp" element={<AddRFP />} />
      <Route
        path="select-category-for-add-rfp"
        element={<SelectCategories />}
      />
      <Route path="rfp-quotes/:rfp_id" element={<RFPQuotes />} />
    </Routes>
  );
};
