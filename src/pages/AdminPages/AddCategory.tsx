import instance from "../../lib/api";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  name: z.string().min(2, "Enter at least two characters"),
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
export const AddCategory = (): ReactElement => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState, getFieldState } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      mode: "onChange",
    });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await instance({
        url: "/categories",
        method: "post",
        data,
      });
      console.log(res);

      if (res?.data?.response === "success") {
        toast("Successfully Added Category as " + data.name);
        navigate("/admin/categories");
        queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      } else toast(res?.data?.errors);
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
                        <h5 className="text-primary">
                          Admin Category Creation Form
                        </h5>
                        <p>Enter Category Name Below</p>
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
                        <label htmlFor="username">Category Name</label>

                        <input
                          id="name"
                          {...register("name")}
                          placeholder="Enter Category Name"
                          className="form-control"
                        ></input>
                        {(formState.errors.name ||
                          getFieldState("name").invalid) && (
                          <p className="text-danger">
                            {formState.errors?.name?.message ||
                              "Enter Valid Email"}
                          </p>
                        )}
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
