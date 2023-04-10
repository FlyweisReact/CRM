/** @format */

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FloatingLabel, Form, Modal, Table } from "react-bootstrap";
import HOC from "../layout/HOC";

const AssinedCustomerSales = () => {
  const id = localStorage.getItem("salesId");
  const [data, setData] = useState([]);
  const [ show , setShow ] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:6699/api/v1/assign/sales_two/${id}`
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Comments
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
           <Form.Group className="mb-3">
           <FloatingLabel
        controlId="floatingTextarea"
        label="Comments"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" />
      </FloatingLabel>
           </Form.Group>
        </Form>
        </Modal.Body>
      </Modal>
    );
  }
  

  return (
    <>
     <MyVerticallyCenteredModal show={show} onHide={() => setShow(false)} />
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
                    <th>Name</th>
                    <th>Email</th>
                    <th> Phone Number </th>
                    <th> Comment </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.result?.map((i, index) =>
                    i.status === "active" ? (
                      <tr key={index}>
                        <td> {i.cuestomerId?.[0]?.Id?.name} </td>
                        <td> {i.cuestomerId?.[0]?.Id?.email} </td>
                        <td> {i.cuestomerId?.[0]?.Id?.mobile} </td>
                        <td> {i.cuestomerId?.[0]?.assigncomment} </td>
                        <td>
                            <i className="fa-solid fa-edit" style={{color : 'blue' , cursor : 'pointer'}} />
                        </td>
                      </tr>
                    ) : (
                      ""
                    )
                  )}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HOC(AssinedCustomerSales);
