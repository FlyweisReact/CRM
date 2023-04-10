import React from 'react'
import HOC from '../layout/HOC'
import img from '../../../Images/4.png'
import { Table } from 'react-bootstrap';

const AssignedCustomer = () => {
  
    return (
      <>
        <div style={{ display: "flex", gap: "20px", marginBottom: "2%" }}>
          <img src={img} alt="" style={{ height: "50px", width: "50px" }} />
          <p
            style={{
              color: "black",
              fontSize: "18px",
              margin: "0",
              fontWeight: "bold",
            }}
          >
            Sales List <br />
            <span style={{ fontSize: "14px" }}>All Sales List</span>
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
            <span
              style={{ color: "black", fontSize: "25px", fontWeight: "bold" }}
            >
              All Sales Members ( Total :  )
            </span>
         =
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
              />
            </div>
          </div>
  
          {/* Table */}
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
              <tbody>
               
              </tbody>
            </Table>
          </div>
        </div>
      </>
    );
  };
  

export default HOC(AssignedCustomer)