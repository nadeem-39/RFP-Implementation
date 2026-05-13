import { Route, Routes } from "react-router-dom";
import { VendorHome } from "../pages/VendorPages/VendorHome";
import { VendorRFps } from "../pages/VendorPages/VendorRfps";
import { VendorApplyRFP } from "../pages/VendorPages/VendorApplyRFP";
import { ViewRFPStatus } from "../pages/VendorPages/ViewRFPStatus";
export const VendorRoutes = () => {
  return (
    <Routes>
      <Route path="home" element={<VendorHome />} />
      <Route path="rfps-list" element={<VendorRFps />} />
      <Route path="rfp-apply/:rfp_id" element={<VendorApplyRFP />} />
      <Route path="rfp-view/:rfp_id" element={<ViewRFPStatus />} />
    </Routes>
  );
};
