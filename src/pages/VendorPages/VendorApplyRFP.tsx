import instance from "../../lib/api";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  item_price: z.number({
    error: (issue) =>
      issue.code === "invalid_type" ? "Enter Item price properly" : "",
  }),
  total_cost: z.number({
    error: (issue) =>
      issue.code === "invalid_type" ? "Enter Total price properly" : "",
  }),
});

type FormData = z.infer<typeof schema>;

// login page
export const VendorApplyRFP = (): ReactElement => {
  const navigate = useNavigate();
  const { rfp_id } = useParams();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState, getFieldState } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      mode: "onChange",
    });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await instance({
        url: `/rfp/apply/${rfp_id}`,
        method: "put",
        data,
      });

      if (res?.data?.response === "success") {
        toast.success("Successfully Applied");
        queryClient.invalidateQueries({ queryKey: ["vendor-rfps"] });
        navigate("/vendor/rfps-list");
      } else
        toast.error(
          "Error " + res?.data?.message ||
            res?.data?.error ||
            res?.data?.error[0],
        );
    } catch (error) {
      toast.error(error.message);
    }
  };

  //   console.log("rfps" + rfp_id);

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
                        <h5 className="text-primary">
                          Welcome to RFP Apply System!
                        </h5>
                        <p>Apply for RFP</p>
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
                              Item Price<em>* (Required)</em>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="item_price"
                              {...register("item_price", {
                                valueAsNumber: true,
                              })}
                              placeholder="Enter item price"
                            />
                            {(formState.errors.item_price ||
                              getFieldState("item_price").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.item_price?.message ||
                                  "Enter Valid Item Price"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="total_cost">
                              Total Cost<em>* (Required)</em>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="total_cost"
                              {...register("total_cost", {
                                valueAsNumber: true,
                              })}
                              placeholder="Enter Total Cost"
                            />
                            {(formState.errors.total_cost ||
                              getFieldState("total_cost").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.total_cost?.message ||
                                  "Enter Valid Total cost"}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="p-2 mt-3">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                          >
                            {formState.isSubmitting ? "Applying" : "Apply"}
                          </button>
                        </div>
                        <div className="p-2 mt-3">
                          <button
                            className="btn btn-secondary btn-block waves-effect waves-light"
                            type="submit"
                            onClick={() => {
                              navigate("/vendor/rfps-list");
                            }}
                          >
                            Cancel
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
