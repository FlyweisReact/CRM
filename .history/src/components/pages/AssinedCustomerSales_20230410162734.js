import React from 'react'
import { Table } from 'react-bootstrap';
import HOC from '../layout/HOC'

const AssinedCustomerSales = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [query, setQuery] = useState("");
    const [edit, setEdit] = useState(false);
    const [comment, setComment] = useState(false);
    const [time, setTime] = useState(false);
    const [data, setData] = useState([]);
    const [customerId, setID] = useState("");
  
    const salesId = localStorage.getItem("salesId");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
  
    const fetchData = useCallback(async () => {
      try {
        const { data } = await axios.get(
          `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:6699/api/v1/sales/${salesId}`,
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
    }, [token, salesId]);
  
    useEffect(() => {
      if (!token) {
        navigate("/");
      }
      fetchData();
    }, [fetchData, navigate, token]);
  
    // Add Customer
    function MyVerticallyCenteredModal(props) {
      const [name, setN] = useState("");
      const [email, setE] = useState("");
      const [mobile, setM] = useState("");
      const [category, setC] = useState("");
  
      const postHandler = async (e) => {
        e.preventDefault();
        try {
          const data = await axios.post(
            "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:6699/api/v1/sales/add",
            {
              name,
              email,
              mobile,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(data);
          toast.success("Customer Added Successfully");
          fetchData();
          setModalShow(false);
        } catch (err) {
          console.log(err);
        }
      };
  
      const putCategory = async (e) => {
        e.preventDefault();
        try {
          const data = await axios.put(
            `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:6699/api/v1/sales/${customerId}`,
            {
              category,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(data);
          toast.success("Category Edited ");
          props.onHide();
          fetchData();
        } catch (err) {
          console.log(err);
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
              {edit ? "Edit Customer" : "Add Customer"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              {edit ? (
                <Form onSubmit={putCategory}>
                  <Form.Group className="my-3">
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => setC(e.target.value)}
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
              ) : (
                <Form onSubmit={postHandler}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setN(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      onChange={(e) => setE(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Phone Number </Form.Label>
                    <Form.Control
                      type="tel"
                      pattern="[0-9]{10}"
                      onChange={(e) => setM(e.target.value)}
                    />
                  </Form.Group>
                  <br />
  
                  <Button variant="outline-success" type="submit">
                    Submit
                  </Button>
                </Form>
              )}
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
  
    function AddComment(props) {
      const [comment, setComment] = useState("");
      const [reminder, setReminder] = useState("");
  
      const AddComment = async (e) => {
        e.preventDefault();
        try {
          const data = await axios.put(
            `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:6699/api/v1/sales/${customerId}`,
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
            `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:6699/api/v1/sales/timer/${customerId}`,
            {
              reminder,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
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
        const formattedDateTime = `${year}-${String(month).padStart(
          2,
          "0"
        )}-${String(day).padStart(2, "0")} ${String(hour).padStart(
          2,
          "0"
        )}:${String(minute).padStart(2, "0")}`;
        setReminder(formattedDateTime);
        console.log(reminder);
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
                      // onChange={(e) => setReminder(e.target.value)}
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
  
    return (
      <>
        <AddComment show={comment} onHide={() => setComment(false)} />{" "}
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />{" "}
   
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
            <span
              style={{ color: "black", fontSize: "25px", fontWeight: "bold" }}
            >
              All Customers 
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
              <tbody>
             
              </tbody>
            </Table>
          </div>
        </div>
      </>
    );
  }

export default HOC(AssinedCustomerSales)