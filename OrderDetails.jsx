import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import exitbutton from "./exit.png";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const OrderDetails = () => {
  const token = localStorage.getItem("token");
  const [datas, setData] = useState([]);
  const navigate = useNavigate("/home");
  console.log(token);
  console.log("sfuckkkkkkkkkkkkk");
  const { id } = useParams();

  useEffect(() => {
    const fetchCart = async (id) => {
      // Retrieve JWT token from local storage
      console.log(token);
      try {
        const response = await axios.get(
          `http://localhost:8080/lib/admin/checkcart/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          { id }
        );
        setData(response.data);
        console.log(datas);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart(id);
  }, []);

  return (
    <section className="h-100">
      <div>
        <CloseIcon
          fontSize="large"
          className="exiticon"
          onClick={(e) => navigate("/admin")}
        />
      </div>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            <div className="d-flex justify-content-between align-items-center mb-4"></div>
            {datas?.length > 0 ? (
              <MDBCard className="rounded-3 mb-4">
                {datas.map((data) => (
                  <MDBCardBody className="p-4" key={data.id}>
                    <MDBRow className="justify-content-between align-items-center">
                      <MDBCol md="2" lg="2" xl="2">
                        <MDBCardImage
                          className="rounded-3"
                          fluid
                          src={data.cover}
                          alt="https://via.placeholder.com/400"
                        />
                      </MDBCol>
                      <MDBCol md="3" lg="3" xl="3">
                        <p className="lead fw-normal mb-2">
                          Title :{data.isbn}
                        </p>
                      </MDBCol>

                      <MDBCol
                        md="3"
                        lg="3"
                        xl="2"
                        className="d-flex align-items-center justify-content-around"
                      >
                        <div>quantity : {data.quantity}</div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                ))}
              </MDBCard>
            ) : (
              <div className="empty">
                <h2> this order is empty tho it's impossible so fuck it </h2>
              </div>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};
export default OrderDetails;
