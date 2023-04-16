import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Ordericon from '@mui/icons-material/Inventory2';
import { Button } from "bootstrap";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Table from "react-bootstrap/Table";


const OrderTracking = () =>{
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
     // Retrieve JWT token from local storage
      console.log(token);
      try {
        const response = await axios.get('http://localhost:8080/lib/admin/validorders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        console.log(orders);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const refresh = async () => {
     // Retrieve JWT token from local storage
      console.log(token);
      try {
        const response = await axios.post(
          'http://localhost:8080/lib/admin/refreshing',
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
        console.log(error)
      }
    };
    refresh();
  }, []);


  const ValidateReturn  = async (id) => {
    console.log(token);
    try {
        const response = await axios.post(
          `http://localhost:8080/lib/admin/validate/return/${id}`,
          {id},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }
        );
    
        console.log(response.data); // Do something with the response data here
      } catch (error) {
        console.error(error);
      }
      
  };

  const details = async (id) => {
    navigate(`/details/${id}`);
  };


  return (
    <div>
    <div>
      <CloseIcon
        fontSize="large"
        className="exiticon"
        onClick={(e) => navigate("/admin")}
      />
    </div>

    {orders?.length > 0 ? (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>  
            <th>Order number</th>
            <th>Order owner</th>
            <th>validation date</th>
            <th>return date limit</th>
            <th>Order details</th>
            <th>confirm return</th>
            
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderNumber}</td>
              <td>{order.orderOwner}</td>
              <td>
                {order.createdAt}
              </td>
              <td>
                {order.endTime}
              </td>
              <td>
                <Ordericon onClick={(e) => details(order.id)}/>
              </td>
              <td>
                <ThumbUpIcon onClick={(e) => ValidateReturn(order.id)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <div className="empty">
        <h2> no orders yet </h2>
      </div>
    )}
  </div>
);
};


export default OrderTracking;