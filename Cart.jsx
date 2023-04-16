import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './component/Book';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
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


const Cart = () => {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCart = async () => {
     // Retrieve JWT token from local storage
      console.log(token);
      try {
        const response = await axios.get('http://localhost:8080/lib/user/mycart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data);
        console.log(items);
      } catch (error) {
        alert('warning: ' + error.message);
      }
    };
    fetchCart();
  }, []);


  const removeItem = async (id) => {
    console.log(token);
    try {
      axios.delete(`http://localhost:8080/lib/user/delete/book/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        } 
      } ,
      {id});
    } catch (error) {
      alert('warning: ' + error.message);
    }
  };

  const submitOrder = async () => {
    console.log(token);
    try {
        const response = await axios.post(
          'http://localhost:8080/lib/user/submitorder',
          {
            // Add any data you want to send in the request body here
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
    
        console.log(response.data); // Do something with the response data here
      } catch (error) {
        alert('warning: your order has alredy been submited' );
      }
  };
  

  // const exit = () => {
  //   return navigate('/home');
  //  }


  
    return (
      
      <section className="h-100" >
         <div >
             <CloseIcon fontSize="large" className='exiticon'
             onClick={(e) => navigate('/home')}
             />
             
      </div>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                
              </div>
               {
                items?.length > 0
                ?(
                  <MDBCard className="rounded-3 mb-4">
                     {items.map((item) => (
                     <MDBCardBody className="p-4" key={item.id}>
                     <MDBRow className="justify-content-between align-items-center">
                       <MDBCol md="2" lg="2" xl="2">
                         <MDBCardImage className="rounded-3" fluid
                           src={item.cover}
                            alt='https://via.placeholder.com/400'/>
                       </MDBCol>
                       <MDBCol md="3" lg="3" xl="3">
                         <p className="lead fw-normal mb-2">Title :{item.isbn}</p>
                         
                       </MDBCol>

                       <MDBCol md="3" lg="3" xl="2"
      className="d-flex align-items-center justify-content-around">
      <MDBBtn color="link" className="px-2">
        <MDBIcon fas icon="minus" />
      </MDBBtn>

      <MDBCol md="1" lg="1" xl="1" className="text-end">
      <div >
             <DeleteIcon fontSize="large" 
             onClick={(e) => removeItem(item.id)}
             />
      </div>
      </MDBCol>

      
      </MDBCol>                  
      </MDBRow>
                   </MDBCardBody>
                     ))}
                  </MDBCard>
                ) : (
                    <div className="empty"> 
                    <h2> your cart is empty </h2>
                    </div>
                )   
            }<div>
              <button onClick={submitOrder} className="fixed-button" > submit Order </button>
              </div>
              
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      
      );

}

export default Cart;

















//       /delete/book/cart/{id}



{/* <MDBCard className="rounded-3 mb-4">
<MDBCardBody className="p-4">
  <MDBRow className="justify-content-between align-items-center">
    <MDBCol md="2" lg="2" xl="2">
      <MDBCardImage className="rounded-3" fluid
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
        alt="Cotton T-shirt" />
    </MDBCol>
    <MDBCol md="3" lg="3" xl="3">
      <p className="lead fw-normal mb-2">Basic T-shirt</p>
      
    </MDBCol>
    <MDBCol md="3" lg="3" xl="2"
      className="d-flex align-items-center justify-content-around">
      <MDBBtn color="link" className="px-2">
        <MDBIcon fas icon="minus" />
      </MDBBtn>

      <MDBInput min={0} defaultValue={2} type="number" size="sm" />

      <MDBBtn color="link" className="px-2">
        <MDBIcon fas icon="plus" />
      </MDBBtn>
    </MDBCol>
    <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
      <MDBTypography tag="h5" className="mb-0">
        $499.00
      </MDBTypography>
    </MDBCol>
    <MDBCol md="1" lg="1" xl="1" className="text-end">
      <a href="#!" className="text-danger">
        <MDBIcon fas icon="trash text-danger" size="lg" />
      </a>
    </MDBCol>
  </MDBRow>
</MDBCardBody>
</MDBCard> */}