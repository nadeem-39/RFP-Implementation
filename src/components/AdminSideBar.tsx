import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <>
      {/* <!-- ========== Left Sidebar Start ========== --> */}
      <div className="vertical-menu">
        <div data-simplebar className="h-100">
          {/* <!--- Sidemenu --> */}
          <div id="sidebar-menu">
            {/* <!-- Left Menu Start --> */}
            <ul className="metismenu list-unstyled" id="side-menu">
              <li>
                <Link to={"/admin/home"} className="waves-effect">
                  <i className="mdi mdi-file-document-box-outline"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to={"/admin/vendors-list"} className="waves-effect">
                  <i className="mdi mdi-receipt"></i>
                  <span>Vendors</span>
                </Link>
              </li>
              <li>
                <Link to={"/admin/rfps-list"} className="waves-effect">
                  <i className="mdi mdi-flip-vertical"></i>
                  <span>RFP Lists</span>
                </Link>
              </li>
              <li>
                <Link to={"/admin/user-management"} className="waves-effect">
                  <i className="mdi mdi-apps"></i>
                  <span>User Management</span>
                </Link>
              </li>

              <li>
                <Link to={"/admin/categories"} className="waves-effect">
                  <i className="mdi mdi-weather-night"></i>
                  <span>Categories</span>
                </Link>
              </li>
            </ul>
          </div>
          {/* <!-- Sidebar --> */}
        </div>
      </div>
    </>
  );
};
