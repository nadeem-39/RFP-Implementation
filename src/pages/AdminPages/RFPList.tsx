import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  categories: string;
  created_at: string;
  updated_at: string;
  status: string;
};

export const RFPList = () => {
  const [allRFP, setAllRFP] = useState<rfp[]>();
  const [currRFP, setCurrRFP] = useState<rfp[]>();
  const [currPage, setCurrPage] = useState<number>(1);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryFn: async () =>
      await instance({
        url: "/rfp/all",
        method: "get",
      }),
    queryKey: ["admin-RFP"],
  });

  function pagination(page: number, allRFP: rfp[]) {
    const startIdx = 5 * (page - 1);
    const endIdx = 5 * page;

    if (endIdx >= allRFP?.length && startIdx < allRFP?.length)
      setCurrRFP(allRFP?.slice(startIdx));
    else if (startIdx >= 0 && endIdx < allRFP?.length)
      setCurrRFP(allRFP.slice(startIdx, endIdx));
  }

  useEffect(() => {
    if (data?.data?.error) {
      setCurrRFP(null);
      toast.error("Error " + data?.data?.error);
      navigate("/login");
      return;
    }

    if (data) {
      setAllRFP(data?.data?.rfps);
      pagination(currPage, data?.data?.rfps);
    }
  }, [data]);

  function filterByname(item_name) {
    if (!item_name) {
      pagination(currPage, allRFP);
      return;
    }
    setCurrRFP(
      allRFP?.filter((e) =>
        e?.item_name.toLowerCase()?.includes(item_name.toLowerCase()),
      ),
    );
  }

  function filterByStatus(value) {
    if (value === "open") {
      setCurrRFP(allRFP?.filter((e) => e.status === "open"));
    } else if (value === "closed") {
      setCurrRFP(allRFP?.filter((e) => e.status === "closed"));
    } else pagination(currPage, allRFP);
  }

  // close RFP
  async function closeRfp(rfp_id: number) {
    try {
      const res = await instance({
        url: `rfp/closerfp/${rfp_id}`,
        method: "get",
      });
      if (res?.data?.response === "success") {
        queryClient.invalidateQueries({ queryKey: ["admin-RFP"] });
        toast.success("Successfully Closed RFP");
      } else toast.error("Error " + res.data.error);
    } catch (error) {
      toast.error(error.message);
    }
  }

  // console.log(data);
  if (!currRFP)
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
                <h4 className="mb-0 font-size-18">RFP</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/admin/home">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">RFP</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

          {/* <!-- end row --> */}
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <label className="sr-only" htmlFor="inlineFormSearchl2">
                Search
              </label>
              <div className="input-group mb-2 mr-sm-3">
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <i className="mdi mdi-magnify"></i>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="inlineFormSearchl2"
                  placeholder="Search"
                  onChange={(e) => filterByname(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <select
                className="form-control"
                id="userstatus"
                name="userstatus"
                onChange={(e) => filterByStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="TableHeader">
                    <div className="row">
                      <div className="col-lg-3">
                        <h4 className="card-title">RFP List</h4>
                      </div>
                      <div className="col-lg-9 text-right">
                        <div className="headerButtons">
                          <Link
                            to="/admin/select-category-for-add-rfp"
                            className="btn btn-sm btn-success "
                          >
                            <i className="mdi mdi-plus"></i> Add RFP
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
                          <th>RFP No.</th>
                          <th>RFP Title</th>
                          <th>RFP Last Date</th>
                          <th>Min Amount</th>
                          <th>Max Amount</th>
                          <th>Status</th>
                          <th>Action</th>
                          <th>Quotes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currRFP?.map((rfp, idx) => (
                          <tr key={idx}>
                            <th scope="row">{rfp.rfp_no}</th>
                            <td>{rfp.item_name}</td>
                            <td>{rfp.last_date}</td>
                            <td>{rfp.minimum_price}</td>
                            <td>{rfp.maximum_price}</td>
                            <td>
                              <span
                                className={`badge badge-pill ${rfp.status === "open" ? "badge-success" : "badge-danger"}`}
                              >
                                {rfp.status}
                              </span>
                            </td>
                            <td>
                              {rfp.status === "open" && (
                                <button
                                  className="text-success btn btn-none"
                                  onClick={() => {
                                    closeRfp(rfp.rfp_id);
                                    toast.success("Closing RFP");
                                  }}
                                >
                                  close
                                </button>
                              )}
                            </td>
                            <td>
                              <button
                                className="text-success btn btn-none"
                                onClick={() => {
                                  navigate(`/admin/rfp-quotes/${rfp.rfp_id}`);
                                }}
                              >
                                quote
                              </button>
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
                        {allRFP?.length > currPage * 5
                          ? currPage * 5
                          : allRFP?.length}{" "}
                        of {allRFP?.length}
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
                              className={`page-link `}
                              onClick={() => {
                                pagination(currPage - 1, allRFP);
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
                              className="page-link "
                              onClick={() => {
                                pagination(currPage + 1, allRFP);
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
