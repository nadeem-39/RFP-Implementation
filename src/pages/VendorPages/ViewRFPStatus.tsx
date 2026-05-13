import { useEffect, useState } from "react";
import instance from "../../lib/api";
import { useQuery } from "@tanstack/react-query";

import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../lib/authStore";

type rfp = {
  rfp_id: number; //
  admin_id: number; //
  item_name: string; //
  item_description: string; //
  rfp_no: string; //
  quantity: number; //
  last_date: string; //
  minimum_price: number; //
  maximum_price: number; //
  categories: string; //
  created_at: string; //
  updated_at: string; //
  applied_status: string; //
  item_price: number; //
  rfp_status: string; //
  total_cost: number; //
  vendor_id: number; //
};

export const ViewRFPStatus = () => {
  const [currRFP, setCurrRFP] = useState<rfp>();
  const { rfp_id } = useParams();
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

  useEffect(() => {
    if (data?.data?.error) {
      navigate("/login");
    }
    if (data) {
      if (data?.data?.rfps)
        setCurrRFP(data?.data?.rfps.find((e: rfp) => `${e.rfp_id}` === rfp_id));
    }
  }, [data]);

  //   console.log(data);

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
                      <th>Applied Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{currRFP?.rfp_no}</th>
                      <td>{currRFP?.item_name}</td>
                      <td>{currRFP?.item_description}</td>
                      <td>{currRFP?.last_date}</td>
                      <td>{currRFP?.maximum_price}</td>
                      <td>{currRFP?.minimum_price}</td>
                      <td>{currRFP?.quantity}</td>
                      <td>{currRFP?.applied_status}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
