/** @format */

import axios from "axios";
import React, {  useEffect, useState } from "react";
import { Alert, Form, Modal, Table } from "react-bootstrap";
import HOC from "../layout/HOC";

const AllAssingnedCustomer = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:6699/api/v1/assign/all`
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {

    const [ status , setStatus] = useState("")

    const postHandler = async (e) => {
        e.preventDefault()
        try { 

            const  {  data }  = await axios.po
        }catch(e) { 
            console.log(e)
        }
    }
    
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Change Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <Form>
       <Form.Select aria-label="Default select example">
      <option>--Change Status--</option>
      <option value='active'>Active</option>
      <option value='Inactive' >InActive</option>
    </Form.Select>
       </Form>
        </Modal.Body>
      </Modal>
    );
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
        {!data?.result ? (
          <>
            <Alert variant="info">no Assigned Customers</Alert>
          </>
        ) : (
          <>
            <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
              <span
                style={{ color: "black", fontSize: "25px", fontWeight: "400" }}
              >
                All Assigned Customers
              </span>
            </div>

            {/* Table */}
            <div style={{ overflow: "auto", marginTop: "2%" }}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Assigned From</th>
                    <th>Assigned To</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th> Phone Number </th>
                    <th> Comment </th>
                    <th> status </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.result?.map((i, index) => (
                    <tr key={index}>
                    <td> {i.salesId?.name} </td>
                    <td> {i.salesId2?.name} </td>
                      <td> {i.cuestomerId?.[0]?.Id?.name} </td>
                      <td> {i.cuestomerId?.[0]?.Id?.email} </td>
                      <td> {i.cuestomerId?.[0]?.Id?.mobile} </td>
                      <td> {i.cuestomerId?.[0]?.assigncomment} </td>
                    
                      <td>{i.status}</td>
                      <td>
                        <i
                          className="fa-solid fa-edit"
                          style={{ color: "blue", cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HOC(AllAssingnedCustomer);
