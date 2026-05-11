import { Route, Routes } from "react-router-dom";
import { VendorHome } from "../pages/VendorPages/VendorHome";
import { VendorCategories } from "../pages/VendorPages/VendorCategories";
export const VendorRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<VendorHome />} />
      <Route path="categories" element={<VendorCategories />} />
    </Routes>
  );
};
