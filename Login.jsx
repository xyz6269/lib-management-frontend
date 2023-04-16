import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';

function Login() {
  const [formData, setFormData] = useState({  
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
    fetch('http://localhost:8080/lib/auth/authenticate', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log(data);
          console.log(data.authorisations);
          if (data.authorisations.length > 1){
            navigate('/admin');
          }else {
            navigate('/home');
          }

        } else {
          throw new Error('Login failed');
        }
      })
      .catch(error => console.log(error))
          
  };

  return (
  
    <form onSubmit={handleSubmit}>
   <MDBContainer className="my-5">

<MDBCard color='black'>
  <MDBRow className='g-0'>

    <MDBCol md='6'>
      <MDBCardImage src='http://esto.ump.ma/assets/logo.svg' alt="login form"  className='rounded-start w-100'/>
    </MDBCol>

    <MDBCol md='6'>
      <MDBCardBody className='d-flex flex-column'>

        <div className='d-flex flex-row mt-2'>
          <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
          <span className="h1 fw-bold mb-0" style={{ textDecoration: "underline" }}>ESTO Library</span>
        </div>

        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

          <MDBInput wrapperClass='mb-4' name="email" label='Email address' id='formControlLg' type='email' value={formData.email}
          onChange={handleInputChange} size="lg"/>
          <MDBInput wrapperClass='mb-4' name="password" label='Password' id='formControlLg' type='password' value={formData.password}
          onChange={handleInputChange} size="lg"/>

        <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit'>Login</MDBBtn>
        <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="/register" style={{color: '#393f81'}}>Register here</a></p>



      </MDBCardBody>
    </MDBCol>

  </MDBRow>
</MDBCard>

</MDBContainer>
    </form>
  );
}
export default Login;
