import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';  
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

function BookWizard() {
  const [bookInfo, setbookInfo] = useState({ isbn: '', quantity: 0 });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the JWT token from local storage
    const token = localStorage.getItem('token');

    // Configure the axios request headers with the JWT token
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // Send the POST request to the API endpoint
    try {
      const response = await axios.post('http://localhost:8080/lib/admin/add/book', bookInfo, { headers });
      console.log(response.data); // or handle response data
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setbookInfo({ ...bookInfo, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <MDBContainer className="my-5">
      <div>
      <img className='exiticon'
             src={CloseIcon} 
             onClick={(e) => navigate('/admin')}
             />
      </div>
      

      <MDBCard color='black'>
  <MDBRow className='g-0'>

    <MDBCol md='6'>
      <MDBCardImage src='https://images.pexels.com/photos/3646172/pexels-photo-3646172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt="login form"  className='rounded-start w-100'/>
    </MDBCol>

    <MDBCol md='6'>
      <MDBCardBody className='d-flex flex-column'>

        <div className='d-flex flex-row mt-2'>
          <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
          <span className="h1 fw-bold mb-0" style={{ textDecoration: "underline" }}>create new book</span>
        </div>

        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

          <MDBInput wrapperClass='mb-4' name="isbn" label='book title' id='formControlLg' type='text' value={bookInfo.isbn}
          onChange={handleInputChange} size="lg"/>
          <MDBInput wrapperClass='mb-4' name="quantity" label='available quantity' id='formControlLg' type='number' value={bookInfo.quantity}
          onChange={handleInputChange} size="lg"/>
          <MDBInput wrapperClass='mb-4' name="cover" label='book cover image' id='formControlLg' type='text' value={bookInfo.cover}
          onChange={handleInputChange} size="lg"/>

        <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit'>submit</MDBBtn>
      

      </MDBCardBody>
    </MDBCol>

  </MDBRow>
</MDBCard>
</MDBContainer>

       
      
         
    </form>
  );
}
export default BookWizard;
