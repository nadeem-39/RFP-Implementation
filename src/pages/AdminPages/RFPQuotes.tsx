import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type rfp_quote = {
  vendor_id: number;
  name: string;
  item_price: number;
  total_cost: number;
  email: string;
  mobile: string;
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
  categories: string;
  created_at: string;
  updated_at: string;
  status: string;
};

export const RFPQuotes = () => {
  const [allRFP_quotes, setAllRFP_quotes] = useState<rfp_quote[]>();
  const [currRFP_quotes, setCurrRFP_quotes] = useState<rfp_quote[]>();
  const [rfp_data, setRfpData] = useState<rfp>();
  const [currPage, setCurrPage] = useState<number>(1);
  const { rfp_id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryFn: async () =>
      await instance({
        url: `/rfp/quotes/${rfp_id}`,
        method: "get",
      }),
    queryKey: ["admin-RFP-quotes"],
  });

  async function getRFPById() {
    try {
      const rfp_details = await instance({
        url: `/rfp/${rfp_id}`,
        method: "get",
      });
      setRfpData(rfp_details?.data?.rfp);
      console.log(rfp_details);
    } catch (e) {
      toast.error("Error " + e.message);
    }
  }

  useEffect(() => {
    getRFPById();
  }, []);

  function pagination(page: number, allRFP_quotes: rfp_quote[]) {
    const startIdx = 5 * (page - 1);
    const endIdx = 5 * page;

    if (endIdx >= allRFP_quotes?.length && startIdx < allRFP_quotes?.length)
      setCurrRFP_quotes(allRFP_quotes?.slice(startIdx));
    else if (startIdx >= 0 && endIdx < allRFP_quotes?.length)
      setCurrRFP_quotes(allRFP_quotes.slice(startIdx, endIdx));
  }

  useEffect(() => {
    if (data?.data?.error === "Authorization failled") {
      setCurrRFP_quotes(null);
      navigate("/login");
      //   console.log("I am quotes navigate function" + data.data.error);

      return;
    }
    if (data) {
      setAllRFP_quotes(data?.data?.quotes);
      pagination(currPage, data?.data?.quotes);
    }
  }, [data]);

  //   console.log(data);

  // console.log(data);

  if (!data)
    return (
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">Loading.............</div>
        </div>
      </div>
    );

  if (data?.data?.response !== "success")
    return (
      <>
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="card-body">
                <div className="TableHeader">
                  <div className="row">
                    <div className="col-lg-3">
                      <h4 className="card-title">RFP Details</h4>
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
                        <th>RFP ID</th>
                        <th>Item name</th>
                        <th>Description</th>
                        <th>Last date</th>
                        <th>Max price</th>
                        <th>Min price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{rfp_data?.rfp_no}</th>
                        <td>{rfp_data?.item_name}</td>
                        <td>{rfp_data?.item_description}</td>
                        <td>{rfp_data?.last_date}</td>
                        <td>{rfp_data?.maximum_price}</td>
                        <td>{rfp_data?.minimum_price}</td>
                        <td>{rfp_data?.quantity}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">No qoutes available</div>
          </div>
        </div>
      </>
    );
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">RFP_quotes</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/admin/rfps-list">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">RFP_quotes</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="TableHeader">
              <div className="row">
                <div className="col-lg-3">
                  <h4 className="card-title">RFP Details</h4>
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
                    <th>RFP ID</th>
                    <th>Item name</th>
                    <th>Description</th>
                    <th>Last date</th>
                    <th>Max price</th>
                    <th>Min price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{rfp_data?.rfp_no}</th>
                    <td>{rfp_data?.item_name}</td>
                    <td>{rfp_data?.item_description}</td>
                    <td>{rfp_data?.last_date}</td>
                    <td>{rfp_data?.maximum_price}</td>
                    <td>{rfp_data?.minimum_price}</td>
                    <td>{rfp_data?.quantity}</td>
                  </tr>
                </tbody>
              </table>
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
                        <h4 className="card-title">RFP_quotes List</h4>
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
                          <th>Id</th>
                          <th>Name</th>
                          <th>Price per item</th>
                          <th>total cost</th>
                          <th>Email</th>
                          <th>Mobile</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currRFP_quotes?.map((rfp, idx) => (
                          <tr key={idx}>
                            <th scope="row">{(currPage - 1) * 5 + idx + 1}</th>
                            <td>{rfp.vendor_id}</td>
                            <td>{rfp.name}</td>
                            <td>{rfp.item_price}</td>
                            <td>{rfp.total_cost}</td>
                            <td>{rfp.email}</td>
                            <td>{rfp.mobile}</td>
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
                        {allRFP_quotes?.length > currPage * 5
                          ? currPage * 5
                          : allRFP_quotes?.length}{" "}
                        of {allRFP_quotes?.length}
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
                                pagination(currPage - 1, allRFP_quotes);
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
                                pagination(currPage + 1, allRFP_quotes);
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
