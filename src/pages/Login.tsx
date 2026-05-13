import instance from "../lib/api";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../lib/authStore";
import { toast } from "react-toastify";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Enter minimum 4 digit password"),
});

// type responseType = {
//   response: string;
//   user_id: number;
//   type: string;
//   name: string;
//   email: string;
//   token: string;
// };

type FormData = z.infer<typeof schema>;

// login page
const Login = (): ReactElement => {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const { register, handleSubmit, formState, getFieldState } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      mode: "onChange",
    });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await instance({
        url: "/login",
        method: "post",
        data,
      });

      console.log(res);

      if (res?.data?.response === "success") {
        login(
          {
            name: res?.data?.name,
            user_id: res?.data?.user_id,
            email: res?.data?.email,
            type: res?.data?.type,
          },
          res?.data?.token,
        );

        toast("Successfully login");
        if (res?.data?.type === "admin") navigate("/admin/home");
        else navigate("/vendor/home");
      } else toast("Error " + res.data.error || res?.data?.error[0]);
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <div className="parent-dev-login">
      <div className="home-btn d-none d-sm-block">
        <a href="index.html" className="text-dark">
          <i className="fas fa-home h2"></i>
        </a>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card overflow-hidden">
                <div className="bg-soft-primary">
                  <div className="row">
                    <div className="col-12">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome to RFP System!</h5>
                        <p>Sign in to continue</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="p-2">
                    <form
                      className="form-horizontal"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="form-group">
                        <label htmlFor="username">Email</label>

                        <input
                          id="email"
                          {...register("email")}
                          placeholder="Enter Email"
                          className="form-control"
                        ></input>
                        {(formState.errors.email ||
                          getFieldState("email").invalid) && (
                          <p className="text-danger">
                            {formState.errors?.email?.message ||
                              "Enter Valid Email"}
                          </p>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="userpassword">Password</label>
                        <input
                          id="password"
                          {...register("password")}
                          placeholder="Enter Password "
                          type="password"
                          className="form-control"
                        ></input>
                        {(formState.errors.password ||
                          getFieldState("password").invalid) && (
                          <p className="text-danger">
                            {formState.errors?.password?.message ||
                              "Enter Password"}
                          </p>
                        )}
                      </div>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customControlInline"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a
                              href="javascript::void()"
                              className="social-list-item bg-primary text-white border-primary"
                            >
                              <i className="mdi mdi-facebook"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              href="javascript::void()"
                              className="social-list-item bg-info text-white border-info"
                            >
                              <i className="mdi mdi-twitter"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a
                              href="javascript::void()"
                              className="social-list-item bg-danger text-white border-danger"
                            >
                              <i className="mdi mdi-google"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-4 text-center">
                        <Link to="/registerAdmin" className="text-muted">
                          <i className="mdi mdi-lock mr-1"></i> Register as
                          Admin
                        </Link>
                      </div>
                      <div className="mt-4 text-center">
                        <Link to="/registerVendor" className="text-muted">
                          <i className="mdi mdi-lock mr-1"></i> Register as
                          Vendor
                        </Link>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgotPassword" className="text-muted">
                          <i className="mdi mdi-lock mr-1"></i> Forgot your
                          password?
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <div>
                  <p>
                    &copy; Copyright{" "}
                    <i className="mdi mdi-heart text-danger"></i> RFP System
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
