import { Link } from "react-router-dom";

export const Sidebar = () => {
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
                <Link to={"/vendor/rfps-list"} className="waves-effect">
                  <i className="mdi mdi-flip-vertical"></i>
                  <span>RFP Lists</span>
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
