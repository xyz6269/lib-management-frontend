import React from "react";
import axios from "axios";
import Home from "./Home";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import user from "../user.png"
import "../Styles/Book.css"
const Book = ({ book }) => {
    const token = localStorage.getItem('token');  // Assuming the JWT token is stored in localStorage
    let isAuthenticated = false;
    const currentTime = Date.now()/1000;
    const navigate = useNavigate('/login')

    if (token) {
      console.log(token);
      console.log("tesssssssssssssssst");
      isAuthenticated = true;
    }
  
    const handleClick = (id) => {
      if (jwtDecode(token).exp < currentTime) {
        console.log("shit")
        console.log(currentTime);
        return navigate("/login");
      }else  {
        console.log(token);
        try {
          axios.post(`http://localhost:8080/lib/user/addtocart/${id}`, 
          {id} , 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            } 
          }
          );
        } catch (error) {
          console.error(error);
        }
    
    }
      console.log("dammmmmmmmmmmmmmmmmmmmmmmmmmmn")
       // Handle the click event here
    };
    return (
        <div className="book">
                    
                        <img  src={book.cover !== null ? book.cover : 'https://via.placeholder.com/400'}/>
                   
                        <button onClick={() => handleClick(book.id)} className="form-control" > Add to cart </button>
                    
        </div>
    );
}

export default Book;