import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type vendor = {
  user_id: number;
  name: string;
  email: string;
  mobile: string;
  status: string;
  categories: string;
  no_of_employees: string;
};

export const VendorList = () => {
  const [allVendors, setAllVendors] = useState<vendor[]>();
  const [currVendors, setCurrVendors] = useState<vendor[]>();
  const [currPage, setCurrPage] = useState<number>(1);
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryFn: async () =>
      await instance({
        url: "/vendorlist",
        method: "get",
      }),
    queryKey: ["admin-vendors"],
  });

  function pagination(page: number, allVendors: vendor[]) {
    const startIdx = 5 * (page - 1);
    const endIdx = 5 * page;

    if (endIdx >= allVendors?.length && startIdx < allVendors?.length)
      setCurrVendors(allVendors?.slice(startIdx));
    else if (startIdx >= 0 && endIdx < allVendors?.length)
      setCurrVendors(allVendors.slice(startIdx, endIdx));
  }

  useEffect(() => {
    if (data?.data?.error) {
      setCurrVendors(null);
      toast("Error " + data?.data?.error);
      return;
    }
    if (data) {
      setAllVendors(data?.data?.vendors);
      pagination(currPage, data?.data?.vendors);
    }
  }, [data]);

  async function approveVendor(user_id) {
    try {
      const res = await instance({
        url: "/approveVendor",
        method: "post",
        data: {
          user_id: user_id,
          status: "approved",
        },
      });
      if (res?.data?.response === "success") {
        queryClient.invalidateQueries({ queryKey: ["admin-vendors"] });
        toast("Successfully approved vendor");
      } else toast(res?.data?.response);
    } catch (error) {
      toast(error.message);
    }
  }

  // console.log(data);
  if (!currVendors)
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
                <h4 className="mb-0 font-size-18">Vendors</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/admin/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Vendors</li>
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
                        <h4 className="card-title">Vendors List</h4>
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
                          <th>Name</th>
                          <th>Email</th>
                          <th>Contact</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currVendors?.map((vendor, idx) => (
                          <tr key={idx}>
                            <th scope="row">{vendor.user_id}</th>
                            <td>{vendor.name}</td>
                            <td>{vendor.email}</td>
                            <td>{vendor.mobile}</td>
                            <td>
                              <span
                                className={`badge badge-pill ${vendor.status === "Approved" ? "badge-success" : "badge-danger"}`}
                              >
                                {vendor.status}
                              </span>
                            </td>
                            <td>
                              {vendor.status !== "Approved" && (
                                <button
                                  className="text-success btn btn-none"
                                  onClick={() => {
                                    approveVendor(vendor.user_id);
                                  }}
                                >
                                  Approved
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
                        Showing 5 of {allVendors?.length}
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-7 dataTables_wrapper ">
                      <div
                        className="dataTables_paginate paging_simple_numbers"
                        id="datatable_paginate"
                      >
                        <ul className="pagination">
                          <li
                            className={`paginate_button page-item  ${currPage === 1 && "disabled"} `}
                            id="datatable_previous"
                          >
                            <button
                              aria-controls="datatable"
                              data-dt-idx="0"
                              className="page-link"
                              onClick={() => {
                                pagination(currPage - 1, allVendors);
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
                                pagination(currPage + 1, allVendors);
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
