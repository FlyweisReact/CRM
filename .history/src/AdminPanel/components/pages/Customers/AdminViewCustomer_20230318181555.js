/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import img from "../../SVG/list.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { Button, Modal, Form , FloatingLabel ,Container } from "react-bootstrap";
import { toast } from "react-toastify";
import useTimer from "react-timer-hook";

function CountdownTimer({ targetDate }) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp: targetDate.getTime(),
    onExpire: () =>alert(`Timer Has been Expired ${targetDate.toString()}`),
  });

  return (
    <div>
      <div>
        <span>{days}</span> days <span>{hours}</span> hrs <span>{minutes}</span>{" "}
        min. <span>{seconds}</span> sec.
      </div>
    </div>
  );
}

const ViewCustomer = () => {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [modalShow, setModalShow] = React.useState(false);
  const [time, setTime] = useState(false);
  const [customerId, setID] = useState("");
  const [comment, setComment] = useState(false);


  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://u4x75z11l9.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/cues/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, [token, id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Add Customer
  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://u4x75z11l9.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/add/customer",
          {
            salesId: id,
            name,
            mobile,
            email,
            category,
          }
        );

        toast.success(`${data.message.name} Added`);
        fetchData();
        props.onHide();
      } catch (E) {
        console.log(E);
        toast.error(E.response.data.message);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Customer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number </Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{10}"
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category</option>
                <option value="A+">A+</option>
                <option value="Good+">Good+</option>
                <option value="Good">Good</option>
                <option value="About To Pay">About To Pay</option>
                <option value="Payment">Payment</option>
              </Form.Select>
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }


  function AddComment(props) {
    const [comment, setComment] = useState("");
    const [reminder, setReminder] = useState("");

    const AddComment = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.put(
          `https://u4x75z11l9.execute-api.ap-south-1.amazonaws.com/dev/api/v1/admin/update/${customerId}`,
          {
            comment,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        toast.success("Comment  Added");
        props.onHide();
        fetchData();
      } catch (err) {
        console.log(err);
      }
    };

    const AddReminder = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.patch(
          `https://u4x75z11l9.execute-api.ap-south-1.amazonaws.com/dev/api/v1/sales/timer/${customerId}`,
          {
            reminder,
          }
        );
        console.log(data);
        toast.success("Reminder  Added");
        props.onHide();
        fetchData();
      } catch (err) {
        toast.success("Reminder  Added");
        props.onHide();
        fetchData();
      }
    };


    const handleDatetimeChange = (e) => {
      const datetime = new Date(e.target.value);
      const year = datetime.getFullYear();
      const month = datetime.getMonth() + 1;
      const day = datetime.getDate();
      const hour = datetime.getHours();
      const minute = datetime.getMinutes();
      const formattedDateTime = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      setReminder(formattedDateTime);
      console.log(reminder)
    };
   

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add {time ? "Reminder" : "Customer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={time ? AddReminder : AddComment}>
              {time ? (
                <Form.Group className="my-3">
                  <Form.Label>Reminder</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    onChange={handleDatetimeChange}
                  />
                </Form.Group>
              ) : (
                <Form.Group>
                  <Form.Label>Comment</Form.Label>
                  <FloatingLabel
                    controlId="floatingTextarea"
                    label="Comments"
                    className="mb-3"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
              )}
              <Button variant="outline-success" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }


  // SearchBar

  const filterData = !query
    ? data?.data
    : data?.data?.filter(
        (i) =>
          i?.name?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.mobile?.toString()?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.category?.toLowerCase().includes(query?.toLowerCase())
      );


      

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
        <AddComment show={comment} onHide={() => setComment(false)} />{" "}
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
          Member Customer List <br />
          <span style={{ fontSize: "14px" }}>All Member Customer List</span>
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
        {data?.data?.length === 0 ? (
          <div className="alertDiv">
            <Alert variant="info" className="ale">
              No Customer Found
            </Alert>

            <Button
              variant="outline-success"
              onClick={() => setModalShow(true)}
            >
              {" "}
              Add Customer
            </Button>
          </div>
        ) : (
          <>
            <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
              <span
                style={{ color: "black", fontSize: "15px", fontWeight: "400" }}
              >
                All Customers ( Total : {data?.data?.length} )
                <hr style={{ width: "70%" }} />
              </span>
              <Button
              variant="outline-success"
              onClick={() => setModalShow(true)}
            >
              {" "}
              Add Customer
            </Button>
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
                      {" "}
                    {i.comment ? (
                      <div style={{ display: "flex", gap: "10px" }}>
                        {i.comment}

                        <i
                          className="fa-solid fa-plus"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setID(i._id);
                            setTime(false);
                            setComment(true);
                          }}
                        ></i>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setID(i._id);
                          setTime(false);
                          setComment(true);
                        }}
                      >
                        Add Comment
                      </Button>
                    )}{" "}
                      </td>
                      <td>
                      {" "}
                    {i.reminder ? (
                      <div style={{ display: "flex", gap: "10px" }}>
                        <CountdownTimer
                          key={index}
                          targetDate={new Date(i.reminder?.slice(0, 16))}
                        />

                        <i
                          className="fa-solid fa-plus"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setID(i._id);
                            setTime(true);
                            setComment(true);
                          }}
                        ></i>
                      </div>
                    ) : (
                      <Button
                        onClick={() => {
                          setID(i._id);
                          setTime(true);
                          setComment(true);
                        }}
                      >
                        Add Reminder
                      </Button>
                    )}{" "}
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

export default HOC(ViewCustomer);
