import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import instance from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import z from "zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

type category = {
  id: number;
  name: string;
  status: string;
};

const schema = z.object({
  category: z.string().nonempty({ error: "Select category" }),
});
export const SelectCategories = () => {
  const [currCategories, setCurrCategories] = useState<category[]>();

  type FormData = z.infer<typeof schema>;

  // forget password page
  const navigate = useNavigate();

  const { register, handleSubmit, formState, getFieldState } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      mode: "onChange",
    });

  const onSubmit = async (data: FormData) => {
    try {
      localStorage.setItem("category", data.category);

      navigate("/admin/add-rfp");
    } catch (error) {
      toast(error.message);
    }
  };

  const { data } = useQuery({
    queryFn: async () =>
      await instance({
        url: "/categories",
        method: "get",
      }),
    queryKey: ["admin-categories-rfp"],
  });

  useEffect(() => {
    if (data?.data?.error) {
      setCurrCategories(null);
      toast("Error " + data?.data?.error);
      return;
    }
    if (data) {
      let allActiveCategories = Object.values<category>(
        data?.data?.categories,
      ).filter((e: category) => e?.status === "Active");

      setCurrCategories(allActiveCategories);
    }
  }, [data]);

  //   console.log(currCategories);
  if (!currCategories)
    return (
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">Loading.............</div>
        </div>
      </div>
    );
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
                        <h5 className="text-primary">Add RFP form</h5>
                        <p>Select Category</p>
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
                      <div className="col-md-12 col-lg-6 col-xl-6">
                        <div className="form-group">
                          {/* <label htmlFor="category">categories*</label> */}
                          <select
                            className="form-control"
                            id="category"
                            {...register("category")}
                          >
                            <option value="">All category</option>
                            {currCategories.map((e) => (
                              <option key={e.id} value={`${e.id}`}>
                                {e.name}
                              </option>
                            ))}
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
                      <div className="mt-3">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
