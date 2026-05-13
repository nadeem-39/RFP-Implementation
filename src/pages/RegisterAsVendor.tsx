import type { ReactElement } from "react";
import z, { string } from "zod";
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
    revenue: z.string().nonempty({ message: "Enter Revenue" }),
    no_of_employees: z.number({
      error: (issue) =>
        issue.code === "invalid_type" ? "Enter no of employees properly" : "",
    }),
    gst_no: z.string().length(15, "GST No should have 15 characters"),
    pancard_no: z.string().length(10, "PAN No should have 10 characters"),
    mobile: z.number({
      error: (issue) =>
        issue.code === "invalid_type" ? "Enter Phone number properly" : "",
    }),
    categoryArray: z.array(string()).nonempty({ error: "Can not be empty" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

type formSchema = z.infer<typeof schema>;
// Register as vendor
const RegisterASVendor = (): ReactElement => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, getFieldState } =
    useForm<formSchema>({
      resolver: zodResolver(schema),
      mode: "onChange",
    });

  const onSubmit: SubmitHandler<formSchema> = async (data: formSchema) => {
    Object.assign(data, { category: data.categoryArray.toString() });
    // console.log(data);
    try {
      const res = await instance({
        url: "/registervendor",
        method: "post",
        data,
      });

      // console.log(res);

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
                        <p>Regsiter as Vendor</p>
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
                              Revenue (Last 3 Years in Lacks)
                              <em>* (Required)</em>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="revenue"
                              {...register("revenue")}
                              placeholder="Enter Revenue"
                            />
                            {(formState.errors.revenue ||
                              getFieldState("revenue").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.revenue?.message ||
                                  "Enter Valid Revenue"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="no_of_employees">
                              No of Employees<em>* (Required)</em>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="no_of_employees"
                              {...register("no_of_employees", {
                                valueAsNumber: true,
                              })}
                              placeholder="No of Employees"
                            />
                            {(formState.errors.no_of_employees ||
                              getFieldState("no_of_employees").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.no_of_employees?.message ||
                                  "Enter Valid No of Employees"}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="gst_no">
                              GST No<em>* (Required)</em>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="gst_no"
                              {...register("gst_no")}
                              placeholder="Enter GST No"
                            />
                            {(formState.errors.gst_no ||
                              getFieldState("gst_no").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.gst_no?.message ||
                                  "Enter Valid GSt number"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="pancard_no">
                              PAN No<em>* (Required)</em>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="pancard_no"
                              {...register("pancard_no")}
                              placeholder="Enter PAN No"
                            />
                            {(formState.errors.pancard_no ||
                              getFieldState("pancard_no").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.pancard_no?.message ||
                                  "Enter Valid pancard number"}
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
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="category">
                              Category<em>* (Required)</em>
                            </label>
                            <select
                              className="form-control"
                              id="category"
                              multiple
                              {...register("categoryArray")}
                            >
                              <option value="">All category</option>
                              <option value="179">Software Services 11</option>
                              <option value="230">Office Supplies</option>
                              <option value="216">Gaming</option>
                              <option value="174">Hardware assets</option>
                            </select>
                            {(formState.errors.categoryArray ||
                              getFieldState("categoryArray").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.categoryArray?.message ||
                                  "Select Valid category"}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="p-2 mt-3">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
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

export default RegisterASVendor;
