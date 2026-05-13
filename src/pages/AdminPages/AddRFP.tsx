import { useEffect, useState, type ReactElement } from "react";
import z, { object } from "zod";
import instance from "../../lib/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../lib/authStore";

const schema = z.object({
  item_name: z.string().min(3, "Enter minimum 3 characters"),
  rfp_no: z.string().nonempty({ error: "Can not be empty" }),
  quantity: z.number({
    error: (issue) =>
      issue.code === "invalid_type" ? "Enter Quantity properly" : "",
  }),
  last_date: z.string().nonempty({ error: "Can not be empty" }),
  minimum_price: z.number({
    error: (issue) =>
      issue.code === "invalid_type" ? "Enter minimum price" : "",
  }),
  maximum_price: z.number({
    error: (issue) =>
      issue.code === "invalid_type" ? "Enter maximum price" : "",
  }),
  vendorsArray: z.array(z.string()).nonempty({ error: "Select vendors" }),
  item_description: z.string().nonempty({ error: "Enter item description" }),
});

type vendor = {
  user_id: number;
  name: string;
  email: string;
  mobile: string;
  status: string;
  categories: string;
  no_of_employees: string;
};

type formSchema = z.infer<typeof schema>;
// Register as vendor
export const AddRFP = (): ReactElement => {
  const [allVendors, setAllVendors] = useState<vendor[]>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user_id } = useAuthStore((s) => s.user);
  const { register, handleSubmit, formState, getFieldState } =
    useForm<formSchema>({
      resolver: zodResolver(schema),
      mode: "onChange",
    });

  // get all vendor via selected category
  let categoryId = localStorage.getItem("category");
  const { data } = useQuery({
    queryFn: async () =>
      await instance({
        url: `vendorlist/${categoryId}`,
        method: "get",
      }),
    queryKey: ["admin-vendors-for-rfp-creation"],
  });

  //   console.log(data);

  useEffect(() => {
    // console.log(data);
    if (data?.data?.error || data?.data?.message) {
      setAllVendors(null);
      toast("Error " + (data?.data?.error || data?.data?.message));
      return;
    }
    if (data) {
      setAllVendors(data.data.vendors);
    }
  }, [data]);

  // add rfp form.
  const onSubmit: SubmitHandler<formSchema> = async (data: formSchema) => {
    Object.assign(data, { categories: localStorage.getItem("category") });
    Object.assign(data, { vendors: data.vendorsArray.toString() });
    Object.assign(data, { user_id: user_id });

    console.log(data);
    try {
      const res = await instance({
        url: "/createrfp",
        method: "post",
        data,
      });

      if (res?.data?.response === "success") {
        queryClient.invalidateQueries({ queryKey: ["admin-RFP"] });
        navigate("/admin/rfps-list");
        toast("Successfully added rfp");
      } else toast(res?.data?.error[0]);
    } catch (error) {
      toast(error.message);
    }
  };

  if (!allVendors)
    return (
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">Loading.............</div>
        </div>
      </div>
    );

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
                        <p>Add RFP</p>
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
                            <label htmlFor="item_name">
                              Item Name<em>* (Required)</em>
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
                            <label htmlFor="item_description">
                              Item Description<em>* (Required)</em>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="item_description"
                              {...register("item_description")}
                              placeholder="Enter item description"
                            />
                            {(formState.errors.item_description ||
                              getFieldState("item_description").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.item_description?.message ||
                                  "Enter valid item description."}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="rfp_no">
                              RFP No.<em>* (Required)</em>
                            </label>
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
                            <label htmlFor="quantity">
                              Quantity<em>* (Required)</em>
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
                            <label htmlFor="last_date">
                              Last Date<em>* (Required)</em>
                            </label>
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
                              Minimum Price<em>* (Required)</em>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="minimum_price"
                              {...register("minimum_price", {
                                valueAsNumber: true,
                              })}
                              placeholder="Enter minimum price"
                            />
                            {(formState.errors.minimum_price ||
                              getFieldState("minimum_price").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.minimum_price?.message ||
                                  "Enter Valid minimum price"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="maximum_price">
                              Maximum Price<em>* (Required)</em>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="maximum_price"
                              {...register("maximum_price", {
                                valueAsNumber: true,
                              })}
                              placeholder="Enter maximum price"
                            />
                            {(formState.errors.maximum_price ||
                              getFieldState("maximum_price").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.maximum_price?.message ||
                                  "Enter Valid maximum price"}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-6">
                          <div className="form-group">
                            <label htmlFor="vendors">
                              Vendors<em>* (Required)</em>
                            </label>
                            <select
                              className="form-control"
                              id="vendors"
                              multiple
                              {...register("vendorsArray")}
                            >
                              <option value="">All vendor</option>
                              {allVendors.map((e) => (
                                <option key={e.user_id} value={e.user_id}>
                                  {e.name}
                                </option>
                              ))}
                            </select>
                            {(formState.errors.vendorsArray ||
                              getFieldState("vendorsArray").invalid) && (
                              <p className="text-danger">
                                {formState.errors?.vendorsArray?.message ||
                                  "Select Valid vendors"}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="p-2 mt-3">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                          >
                            {formState.isSubmitting ? "Adding" : "Add"}
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
