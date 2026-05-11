import velocityImage from "../assets/images/velocity_logo.png";
import { useAuthStore } from "../lib/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Navbar = () => {
  const { user, logout } = useAuthStore((s) => s);
  const navigate = useNavigate();

  return (
    <>
      {/* <!-- Begin page --> */}

      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            {/* <!-- LOGO --> */}
            <div className="navbar-brand-box">
              <a href="index.html" className="logo logo-light">
                <span className="logo-sm">
                  <img src={velocityImage} alt="" height="40" />
                </span>
                <span className="logo-lg">
                  <img src={velocityImage} alt="" height="" />
                </span>
              </a>
            </div>
          </div>

          <div className="d-flex pr-2">
            <div className="dropdown d-inline-block">
              <span className="d-none d-xl-inline-block ml-1" key="t-henry">
                Welcome {user?.name}
              </span>
              &nbsp;&nbsp;
              <button
                className="btn btn-none text-primary"
                onClick={() => {
                  toast("Successfully logout");
                  logout();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
