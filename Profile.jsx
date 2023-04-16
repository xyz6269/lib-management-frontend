import { useState , useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import unk from "./user.png"
import { config } from "process";
import CloseIcon from '@mui/icons-material/Close';

// Set this wherever you get your token, you can add some logic at the initialization of the app to restore a token from localStorage as well, you only need to do this when you initialzie or reassign your token


const Profile = () => {
  const token = localStorage.getItem('token');
  const [data, setData] = useState([]);
  const navigate = useNavigate('/home')
  console.log(token);
  console.log("sfuckkkkkkkkkkkkk")
  

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getuser = async () => {
      try {
        const res = await axios.get('http://localhost:8080/lib/auth/current', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(res.data);
        if (isMounted){
          setData(res.data);  
        }
      }catch(error) {
        console.error(error);
      }
    }

    getuser();

    return () => {
      isMounted = false;
      controller.abort();
    }
  },[])


  const logout = async () => {
    try {
      localStorage.removeItem("token");
      navigate('/login')
    }catch(error) {
      console.error(error);
    }
  }






  return (
    <div className="vh-100" >
      <div >
             <CloseIcon fontSize="large" className='exiticon'
             onClick={(e) => navigate('/home')}
             />
      </div>
      
      <MDBContainer className="container py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="4">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="text-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage src={unk}
                    className="rounded-circle" fluid style={{ width: '100px' }} />
                </div>
                <MDBTypography tag="h4">first name : {data.firstName}</MDBTypography>
                <MDBTypography tag="h4">last name : {data.lastName}</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  email <span className="mx-2">|</span> <a href={data.email}>{data.email}</a>
                </MDBCardText>
                
                <MDBBtn rounded size="lg" onClick={(e) => logout()}>
                  Log out
                </MDBBtn>
               
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Profile;