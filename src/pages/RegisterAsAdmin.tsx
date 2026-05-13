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
    firstname: z.string().min(3, "Enter minimum 3 characters"),
    lastname: z.string().min(3, "Enter minimum 3 characters"),
    email: z.string().email(),
    password: z.string().min(4, "Enter minimum 4 digit password"),
    confirmPassword: z.string(),

    mobile: z.number({
      error: (issue) =>
        issue.code === "invalid_type" ? "Enter Phone number properly" : "",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

type formSchema = z.infer<typeof schema>;
// Register as vendor
const RegisterAsAdmin = (): ReactElement => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, getFieldState } =
    useForm<formSchema>({
      resolver: zodResolver(schema),
      mode: "onChange",
    });

  const onSubmit: SubmitHandler<formSchema> = async (data: formSchema) => {
    try {
      const res = await instance({
        url: "/registeradmin",
        method: "post",
        data,
      });

      if (res?.data?.response === "success") {
        navigate("/login");
        toast.success("Successfully registered");
      } else toast.error(res?.data?.error[0]);
    } catch (error) {
      toast.error(error.message);
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
                        <p>Regsiter as Admin</p>
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
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="firstname">
                              First name<em>* (Required)</em>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstname"
                              {...register("firstname")}
                              placeholder="Enter firstname"
                            />
                            {(formState.errors.firstname ||
                              getFieldState("firstname").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.firstname?.message ||
                                  "Enter Valid First Name"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="lastname">
                              Last Name<em>* (Required)</em>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastname"
                              {...register("lastname")}
                              placeholder="Enter lastname"
                            />
                            {(formState.errors.lastname ||
                              getFieldState("lastname").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.lastname?.message ||
                                  "Enter Valid Last Name"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="email">
                              Email<em>* (Required)</em>
                            </label>
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
                            <label htmlFor="password">
                              Password<em>* (Required)</em>
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              {...register("password")}
                              placeholder="Enter Password"
                            />
                            {(formState.errors.password ||
                              getFieldState("password").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.password?.message ||
                                  "Enter Valid Password"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="password">
                              Confirm Password<em>* (Required)</em>
                            </label>
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
                            <label htmlFor="revenue">
                              Phone No<em>* (Required)</em>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="mobile"
                              {...register("mobile", {
                                valueAsNumber: true,
                              })}
                              placeholder="Enter Phone No"
                            />
                            {(formState.errors.mobile ||
                              getFieldState("mobile").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.mobile?.message ||
                                  "Enter Valid mobile number"}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="p-2 mt-3">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light "
                            type="submit"
                          >
                            {formState.isSubmitting ? "Submitting" : "Register"}
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

export default RegisterAsAdmin;
