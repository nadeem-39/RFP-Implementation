import type { ReactElement } from "react";
import z from "zod";
import instance from "../lib/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    email: z.string().email(),
    new_password: z.string().min(8, "Enter minimum 8 digit password"),
    confirmPassword: z.string(),

    otp: z.number({
      error: (issue) =>
        issue.code === "invalid_type" ? "Enter otp properly" : "",
    }),
  })
  .refine((data) => data.new_password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type formSchema = z.infer<typeof schema>;
// Register as vendor
export const ResetPassword = (): ReactElement => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, getFieldState } =
    useForm<formSchema>({
      resolver: zodResolver(schema),
      mode: "onChange",
    });

  const onSubmit: SubmitHandler<formSchema> = async (data: formSchema) => {
    try {
      const res = await instance({
        url: "/confirmotpresetPassword",
        method: "post",
        data,
      });

      if (res?.data?.response === "success") {
        navigate("/login");
        toast("Successfully reset password");
      } else toast(res?.data?.error[0]);
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <>
      <div className="home-btn d-none d-sm-block">
        <a href="index.html" className="text-dark">
          <i className="fas fa-home h2"></i>
        </a>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-8">
              <div className="card overflow-hidden">
                <div className="bg-soft-primary">
                  <div className="row">
                    <div className="col-12">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome to RFP System!</h5>
                        <p>Reset Password</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="p-4">
                    <form
                      className="form-horizontal"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="email">Email*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              {...register("email")}
                              placeholder="Enter Email"
                            />
                            {(formState.errors.email ||
                              getFieldState("email").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.email?.message ||
                                  "Enter Valid Email"}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="password">New Password*</label>
                            <input
                              type="password"
                              className="form-control"
                              id="new_password"
                              {...register("new_password")}
                              placeholder="Enter Password"
                            />
                            {(formState.errors.new_password ||
                              getFieldState("new_password").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.new_password?.message ||
                                  "Enter Valid Password"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="password">Confirm Password*</label>
                            <input
                              type="password"
                              className="form-control"
                              id="confirmPassword"
                              {...register("confirmPassword")}
                              placeholder="Enter Confirm Password"
                            />
                            {(formState.errors.confirmPassword ||
                              getFieldState("confirmPassword").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.confirmPassword?.message ||
                                  "Password does not match"}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="revenue">OTP*</label>
                            <input
                              type="number"
                              className="form-control"
                              id="otp"
                              {...register("otp", {
                                valueAsNumber: true,
                              })}
                              placeholder="Enter OTP"
                            />
                            {(formState.errors.otp ||
                              getFieldState("otp").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.otp?.message ||
                                  "Enter Valid otp"}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="p-2 mt-3">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
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
    </>
  );
};
