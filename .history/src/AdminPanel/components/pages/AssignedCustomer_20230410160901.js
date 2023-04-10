/** @format */

import React, { useState } from "react";
import HOC from "../layout/HOC";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const AssignedCustomer = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:6699/api/v1/assign/sales_two/${id}`
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  

  return (
    <>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
        }}
        className="response"
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "25px", fontWeight: "400" }}>
            All Assigned Customer
          </span>
          =
        </div>

        <div style={{ overflow: "auto", marginTop: "2%" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th> Phone Number </th>
                <th> Customers </th>
                <th>Assigned Customers </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default HOC(AssignedCustomer);
