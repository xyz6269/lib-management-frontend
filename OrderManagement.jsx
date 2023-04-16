import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Ordericon from '@mui/icons-material/Inventory2';
import Table from "react-bootstrap/Table";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';


const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      // Retrieve JWT token from local storage
      console.log(token);
      try {
        const response = await axios.get(
          "http://localhost:8080/lib/admin/new/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
        console.log(orders);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCart();
  }, []);

  const deleteOrder = async (id) => {
    console.log(token);
    try {
      const response = await axios.delete(
        `http://localhost:8080/lib/admin/reject/Order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
        { id }
      );

      console.log(response.data); // Do something with the response data here
    } catch (error) {
      console.error(error);
    }
  };

  const Validate = async (id) => {
    console.log(token);
    try {
      const response = await axios.post(
        `http://localhost:8080/lib/admin/validateorder/${id}`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
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
              <th>Order details</th>
              <th>reject order</th>
              <th>validate order</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderNumber}</td>
                <td>{order.orderOwner}</td>
                <td>
                  <Ordericon onClick={(e) => details(order.id)}/>
                </td>
                <td>
                  <ThumbDownIcon onClick={(e) => deleteOrder(order.id)}/>
                </td>
                <td>
                  <ThumbUpIcon onClick={(e) => Validate(order.id)}/>
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

export default OrderManagement;
