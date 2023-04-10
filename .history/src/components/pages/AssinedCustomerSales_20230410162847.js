/** @format */

import axios from "axios";
import React from "react";
import { Table } from "react-bootstrap";
import HOC from "../layout/HOC";

const AssinedCustomerSales = () => {
    const [ id ] = localStorage.getItem("salesId")

    const fetchData = async () => {
        try {
            const { data } = await axios.get("")
        }catch(e) { 
            console.log(e)
        }
    }

  return (
    <>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
          borderRadius: "20px",
        }}
        className="response"
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "25px", fontWeight: "400" }}>
            All Assigned Customers
          </span>
        </div>

        {/* Table */}
        <div style={{ overflow: "auto", marginTop: "2%" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th> Phone Number </th>
                <th> Category </th>
                <th className="Comm"> Comment </th>
                <th>Reminder</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default HOC(AssinedCustomerSales);
