import type { ReactElement } from "react";
import z from "zod";
import instance from "../../lib/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  user_id: z.number({
    error: (issue) =>
      issue.code === "invalid_type" ? "Enter user Id properly" : "",
  }),
  item_name: z.string().min(3, "Enter minimum 3 characters"),
  rfp_no: z.string().nonempty({ error: "can not be empty" }),
  quantity: z.number({
    error: (issue) =>
      issue.code === "invalid_type" ? "Enter Quantity properly" : "",
  }),
  last_date: z.date().nonoptional({ error: "Can not empty" }),
  minimum_price: z.number({
    error: (issue) =>
      issue.code === "invalid_type" ? "Enter minimum price" : "",
  }),
  maximum_price: z.number({
    error: (issue) =>
      issue.code === "invalid_type" ? "Enter maximum price" : "",
  }),
  categories: z.string().nonoptional({ error: "Select Category" }),
  vendors: z.string().nonoptional({ error: "Select vendors" }),
  item_description: z.string().nonoptional({ error: "Enter item description" }),
});

type formSchema = z.infer<typeof schema>;
// Register as vendor
export const AddRFP = (): ReactElement => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, getFieldState } =
    useForm<formSchema>({
      resolver: zodResolver(schema),
      mode: "onChange",
    });

  const onSubmit: SubmitHandler<formSchema> = async (data: formSchema) => {
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
        toast("Successfully registered");
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
                            <label htmlFor="user_id">User ID*</label>
                            <input
                              type="number"
                              className="form-control"
                              id="user_id"
                              {...register("user_id", {
                                valueAsNumber: true,
                              })}
                              placeholder="Enter user id"
                            />
                            {(formState.errors.user_id ||
                              getFieldState("user_id").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.user_id?.message ||
                                  "Enter Valid User_id"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="item_name">
                              Item Name<em>*</em>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="item_name"
                              {...register("item_name")}
                              placeholder="Enter item name"
                            />
                            {(formState.errors.item_name ||
                              getFieldState("item_name").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.item_name?.message ||
                                  "Enter Valid Item Name"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="rfp_no">RFP No.*</label>
                            <input
                              type="text"
                              className="form-control"
                              id="rfp_no"
                              {...register("rfp_no")}
                              placeholder="Enter RFP No."
                            />
                            {(formState.errors.rfp_no ||
                              getFieldState("rfp_no").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.rfp_no?.message ||
                                  "Enter Valid RFP No."}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="quantity">Quantity*</label>
                            <input
                              type="number"
                              className="form-control"
                              id="quantity"
                              {...register("quantity", {
                                valueAsNumber: true,
                              })}
                              placeholder="Enter Quantity"
                            />
                            {(formState.errors.quantity ||
                              getFieldState("quantity").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.quantity?.message ||
                                  "Enter Valid quantity"}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="last_date">Last Date*</label>
                            <input
                              type="date"
                              className="form-control"
                              id="last_date"
                              {...register("last_date")}
                              placeholder="Enter last date"
                            />
                            {(formState.errors.last_date ||
                              getFieldState("last_date").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.last_date?.message ||
                                  "Enter Valid Date"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="minimum_price">
                              Minimum Price*
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="quantity"
                              {...register("quantity", {
                                valueAsNumber: true,
                              })}
                              placeholder="Enter Quantity"
                            />
                            {(formState.errors.quantity ||
                              getFieldState("quantity").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.quantity?.message ||
                                  "Enter Valid quantity"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="quantity">Quantity*</label>
                            <input
                              type="number"
                              className="form-control"
                              id="quantity"
                              {...register("quantity", {
                                valueAsNumber: true,
                              })}
                              placeholder="Enter Quantity"
                            />
                            {(formState.errors.quantity ||
                              getFieldState("quantity").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.quantity?.message ||
                                  "Enter Valid quantity"}
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
                            <label htmlFor="revenue">
                              Revenue (Last 3 Years in Lacks)*
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
                                  "Enter Valid revenue"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="no_of_employees">
                              No of Employees*
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
                                  "Enter Valid no_of_employees"}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="gst_no">GST No*</label>
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
                                  "Enter Valid gst_no"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="pancard_no">PAN No*</label>
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
                                  "Enter Valid pancard_no"}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="revenue">Phone No*</label>
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
                                  "Enter Valid mobile"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="category">category*</label>
                            <select
                              className="form-control"
                              id="category"
                              {...register("category")}
                            >
                              <option value="">All category</option>
                              <option value="179">Software Services 11</option>
                              <option value="130">Computers1</option>
                              <option value="91">Floppy Disk</option>
                              <option value="93">headphone</option>
                            </select>
                            {(formState.errors.category ||
                              getFieldState("category").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.category?.message ||
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
