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
   
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
        }}
        className="response"
      >

{data?.message ?<>
        <Alert variant={'info'}>
        No Assigned Customers
        </Alert>
    </>  : <></>}
        
      </div>
    </>
  );
};

export default HOC(AssignedCustomer);
