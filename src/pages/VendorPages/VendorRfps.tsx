import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthStore } from "../../lib/authStore";
import { useNavigate } from "react-router-dom";

type category = {
  id: number;
  name: string;
  status: string;
};

type rfp = {
  rfp_id: number;
  admin_id: number;
  item_name: string;
  item_description: string;
  rfp_no: string;
  quantity: number;
  last_date: string;
  minimum_price: number;
  maximum_price: number;
  RFPs: string;
  created_at: string;
  updated_at: string;
  vendor_id: number;
  item_price: number | null;
  total_cost: string;
  rfp_status: string;
  applied_status: string;
};

export const VendorRFps = () => {
  const [allRFPs, setAllRFPs] = useState<rfp[]>();
  const [currRFPs, setCurrRFPs] = useState<rfp[]>();
  const [currPage, setCurrPage] = useState<number>(1);
  const { user_id } = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const { data } = useQuery({
    queryFn: async () =>
      await instance({
        url: `rfp/getrfp/${user_id}`,
        method: "get",
      }),
    queryKey: ["vendor-rfps"],
  });

  // pagination logic
  function pagination(page: number, allRFPs: rfp[]) {
    const startIdx = 5 * (page - 1);
    const endIdx = 5 * page;
    if (endIdx >= allRFPs?.length && startIdx < allRFPs?.length)
      setCurrRFPs(allRFPs?.slice(startIdx));
    else if (startIdx >= 0 && endIdx < allRFPs?.length)
      setCurrRFPs(allRFPs.slice(startIdx, endIdx));
  }

  useEffect(() => {
    if (data?.data?.error) {
      setCurrRFPs(null);
      toast.error("Error " + data?.data?.error);
      navigate("/login");
      return;
    }
    console.log(data);

    if (data) {
      setAllRFPs(data?.data?.rfps);
      pagination(currPage, data?.data?.rfps);
    }
  }, [data]);

  // console.log(data);
  if (!currRFPs)
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
                <h4 className="mb-0 font-size-18">RFPs</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/admin/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">RFPs</li>
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
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table
                      className="table mb-0 listingData dt-responsive"
                      id="datatable"
                    >
                      <thead>
                        <tr>
                          <th>Sr No.</th>
                          <th>RFP No.</th>
                          <th>RFP Title</th>
                          <th>Last Date</th>
                          <th>Min Amount</th>
                          <th>Max Amount</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currRFPs?.map((e, idx) => (
                          <tr key={idx}>
                            <th scope="row">{(currPage - 1) * 5 + idx + 1}</th>
                            <td>{e.rfp_no}</td>
                            <td>{e.item_name}</td>
                            <td>{e.last_date}</td>
                            <td>{e.minimum_price}</td>
                            <td>{e.maximum_price}</td>
                            <td>
                              <span
                                className={`badge badge-pill ${e.rfp_status === "open" ? "badge-success" : "badge-danger"}`}
                              >
                                {e.rfp_status}
                              </span>
                            </td>
                            <td>
                              {e.applied_status === "open" &&
                              e.rfp_status === "open" ? (
                                <button
                                  className="text-success btn btn-none"
                                  onClick={() => {
                                    navigate(`/vendor/rfp-apply/${e.rfp_id}`);
                                  }}
                                >
                                  Apply
                                </button>
                              ) : (
                                <button
                                  className="text-primary btn btn-none"
                                  onClick={() => {
                                    navigate(`/vendor/rfp-view/${e.rfp_id}`);
                                  }}
                                >
                                  View
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
                        Showing {(currPage - 1) * 5 + 1} to{" "}
                        {allRFPs?.length > currPage * 5
                          ? currPage * 5
                          : allRFPs?.length}{" "}
                        of {allRFPs?.length}
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
                                pagination(currPage - 1, allRFPs);
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
                                pagination(currPage + 1, allRFPs);
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
