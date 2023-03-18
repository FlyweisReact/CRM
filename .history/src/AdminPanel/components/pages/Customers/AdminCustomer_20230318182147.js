/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import img from "../../SVG/list.svg";
import axios from "axios";


const Customers = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [ startDate , setStartDate ] = useState('')
  const [ endData , setEndDate] = useState('')
  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "https://u4x75z11l9.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/cuestomer/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data.data);
    } catch (Err) {
      console.log(Err);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filterByDate = async (Day) => {
    try {
      const { data } = await axios.get(
        `https://u4x75z11l9.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/filter?filter=${Day}`
      );
      setData(data.message);
    } catch (e) {
      console.log(e);
    }
  };
  const filterByDate2 = async () => {
    try {
      const { data } = await axios.get(
        `https://u4x75z11l9.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/filter?startDate=${startDate}&endDate=${endData}`
      );
      setData(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  const filterData = !query
    ? data
    : data?.filter(
        (i) =>
          i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.mobile?.toString()?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.category?.toLowerCase().includes(query?.toLowerCase())
      );

  const deleteHandler = async (id) => {
    try {
      const data = await axios.delete(
        `https://u4x75z11l9.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/cuestomer/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      toast.success("Customer Deleted");
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: "20px", marginBottom: "2%" }}>
        <img
          src={img}
          alt=""
          style={{
            backgroundColor: "#4099ff",
            padding: "8px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            width: "40px",
            height: "40px",
            marginTop: "5px",
          }}
        />
        <p style={{ color: "black", fontSize: "18px", margin: "0" }}>
          Customer List <br />
          <span style={{ fontSize: "14px" }}>All Customer List</span>
        </p>
      </div>
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
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            All Customers ( Total : {data?.length} )
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        <div className="three-box">
          <div className="items" onClick={() => setQuery("")}>
            All
          </div>
          <div className="items" onClick={() => setQuery("A+")}>
            A+
          </div>
          <div className="items" onClick={() => setQuery("Good")}>
            Good
          </div>
          <div className="items" onClick={() => setQuery("Good+")}>
            Good+
          </div>
          <div className="items" onClick={() => setQuery("About To Pay")}>
            About To Pay
          </div>
          <div className="items" onClick={() => setQuery("Payment")}>
            Payment
          </div>
        </div>

        <div>
          <div style={{ color: "black" }}>
            Search:{" "}
            <input
              type={"search"}
              style={{
                border: "1px solid #bfbfbf",
                width: "250px",
                color: "black",
                padding: "5px",
              }}
              placeholder="Search by Name , Phone number.."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="dropdown" style={{ marginTop: "20px" }}>
          <p className="upper">
            Select Your Preference
            <i class="fa-sharp fa-solid fa-caret-down"></i>
          </p>
          <div className="dropdown-content">
            <p
              onClick={() => {
                filterByDate("today");
              }}
            >
              {" "}
              Today
            </p>
            <p
              onClick={() => {
                filterByDate("yesterday");
              }}
            >
              {" "}
              Yesterday
            </p>
            <p
              onClick={() => {
                filterByDate("last3days");
              }}
            >
              {" "}
              Last 3 days
            </p>
         
            <p
              onClick={() => {
                filterByDate("lastweek");
              }}
            >
              Last Week
            </p>
            <p
              onClick={() => {
                filterByDate("thismonth");
              }}
            >
              This Month
            </p>
            <p
              onClick={() => {
                filterByDate("lastmonth");
              }}
            >
              Last Month
            </p>
          </div>
        </div>

        <div className="calender">
          <div>
            <p>
              Start Date :{" "}
              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              />{" "}
            </p>
          </div>
          <div>
            <p>
              Ending Date : <input type="date" onChange={(e) => setEndDate(e.target.value)} />{" "}
            </p>
          </div>

          <button onClick={() => filterByDate2()}>Filter</button>
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
            <tbody>
              {filterData?.map((i, index) => (
                <tr key={index}>
                  <td> {i.name} </td>
                  <td> {i.email} </td>
                  <td> {i.mobile} </td>
                  <td> {i.category} </td>
                  <td style={{ maxWidth: "200px" }} className="Comm">
                    {i.comment}
                  </td>
                  <td>
               {i.reminder?.slice(0,16)}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <i
                        class="fa-solid fa-trash"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteHandler(i._id)}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default HOC(Customers);
