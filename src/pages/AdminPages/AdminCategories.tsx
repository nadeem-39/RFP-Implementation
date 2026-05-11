import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

type category = {
  id: number;
  name: string;
  status: string;
};
export const AdminCategories = () => {
  const [allCategories, setAllCategories] = useState<category[]>();
  const [currCategories, setCurrCategories] = useState<category[]>();
  const [currPage, setCurrPage] = useState<number>(1);
  const { data } = useQuery({
    queryFn: async () =>
      await instance({
        url: "/categories",
        method: "get",
      }),
    queryKey: ["admin-categories"],
  });

  function pagination(page: number, allCategories: category[]) {
    const startIdx = 5 * (page - 1);
    const endIdx = 5 * page;

    if (endIdx >= allCategories?.length && startIdx < allCategories?.length)
      setCurrCategories(allCategories?.slice(startIdx));
    else if (startIdx >= 0 && endIdx < allCategories?.length)
      setCurrCategories(allCategories.slice(startIdx, endIdx));
  }

  useEffect(() => {
    if (data) {
      setAllCategories(Object.values(data?.data?.categories));
      pagination(currPage, Object.values(data?.data?.categories));
    }
  }, [data]);

  // console.log(data);
  if (!currCategories)
    return (
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">Loading.............</div>
        </div>
      </div>
    );
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">Categories</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/admin/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Categories</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

          {/* <!-- end row --> */}

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="TableHeader">
                    <div className="row">
                      <div className="col-lg-3">
                        <h4 className="card-title">Category</h4>
                      </div>
                      <div className="col-lg-9 text-right">
                        <div className="headerButtons">
                          <Link
                            to="/admin/category/add-category"
                            className="btn btn-sm btn-success "
                          >
                            <i className="mdi mdi-plus"></i> Add Category
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table
                      className="table mb-0 listingData dt-responsive"
                      id="datatable"
                    >
                      <thead>
                        <tr>
                          <th>Sr no.</th>
                          <th>Category Name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currCategories?.map((cat, idx) => (
                          <tr key={idx}>
                            <th scope="row">{(currPage - 1) * 5 + idx + 1}</th>
                            <td>{cat.name}</td>
                            <td>
                              <span
                                className={`badge badge-pill ${cat.status === "Active" ? "badge-success" : "badge-danger"}`}
                              >
                                {cat.status}
                              </span>
                            </td>
                            <td>
                              {cat.status === "Active" ? (
                                <button className="text-danger btn btn-none">
                                  Deactivate
                                </button>
                              ) : (
                                <button className="text-success btn btn-none">
                                  Activate
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="row pt-3">
                    <div className="col-sm-12 col-md-5">
                      <div
                        className="dataTables_info"
                        id="datatable_info"
                        role="status"
                        aria-live="polite"
                      >
                        Showing 5 of {allCategories?.length}
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-7 dataTables_wrapper ">
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="datatable_paginate"
                      >
                        <ul className="pagination">
                          <li
                            className="paginate_button page-item previous "
                            id="datatable_previous"
                          >
                            <button
                              aria-controls="datatable"
                              data-dt-idx="0"
                              className="page-link"
                              onClick={() => {
                                pagination(currPage - 1, allCategories);
                                setCurrPage(currPage - 1);
                              }}
                            >
                              Previous
                            </button>
                          </li>
                          <li className="paginate_button page-item active">
                            <p
                              aria-controls="datatable"
                              data-dt-idx="1"
                              className="page-link"
                            >
                              {currPage}
                            </p>
                          </li>
                          <li
                            className="paginate_button page-item next "
                            id="datatable_next"
                          >
                            <button
                              aria-controls="datatable"
                              data-dt-idx="2"
                              className="page-link"
                              onClick={() => {
                                pagination(currPage + 1, allCategories);
                                setCurrPage(currPage + 1);
                              }}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
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
