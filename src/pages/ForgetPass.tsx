import instance from "../lib/api";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import type { ReactElement } from "react";

import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
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

// forget password page
const ForgetPass = (): ReactElement => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState, getFieldState } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      mode: "onChange",
    });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await instance({
        url: "/forgetPassword",
        method: "post",
        data,
      });
      if (res?.data?.response === "success") {
        toast.success("Successfully sent OTP to registered mail Id");
        navigate("/resetPassword");
      } else toast.error(res?.data?.error);
    } catch (error) {
      toast.error(error.message);
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
                        <p>Forget Password</p>
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

                      <div className="mt-3">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                        >
                          {formState.isSubmitting ? "Sending Otp" : "Get OTP"}
                        </button>
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

export default ForgetPass;
