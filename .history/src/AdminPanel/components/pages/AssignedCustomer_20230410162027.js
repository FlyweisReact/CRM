/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Alert, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const AssignedCustomer = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
        const { data } = await axios.get(
          `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:6699/api/v1/assign/sales_two/${id}`
        );
        setData(data);
      } catch (e) {
        console.log(e);
      }
  },[id])

  useEffect(() => {
    fetchData()
  },[fetchData])


  return (
    <>
    {data?.message ?<>
        <Alert variant={variant}>
          This is a {variant} alert—check it out!
        </Alert>
    </>  : <></>}
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
                <th>Assigned From</th>
                <th>Assigned To</th>
                <th> Customer Name </th>
                <th> Customer  Email </th>
                <th> Customer Phone Number </th>
                <th>Comments </th>
                <th>Status </th>
              </tr>
            </thead>
            <tbody>
                {data?.result?.map((i , index) => (
                    <tr key={index}>
                        <td>{i.salesId?.name} </td>
                        <td>{i.salesId2?.name} </td>
                        <td>{i.cuestomerId?.[0]?.Id?.name} </td>
                        <td>{i.cuestomerId?.[0]?.Id?.email} </td>
                        <td>{i.cuestomerId?.[0]?.Id?.mobile} </td>
                        <td className="Comm"> </td>
                        <td>{i.status} </td>
                    </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default HOC(AssignedCustomer);
