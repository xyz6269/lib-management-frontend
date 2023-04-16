import React from "react";
import axios from "axios";
import Home from "./Home";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const AdminBook = ({ adminbook }) => {
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
            axios.delete(`http://localhost:8080/lib/admin/delete/book/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                } 
              } ,
              {id});
        } catch (error) {
          console.error(error);
        }
    
    }

    
      console.log("dammmmmmmmmmmmmmmmmmmmmmmmmmmn")
       // Handle the click event here
    };
    return (
        <div className="book">

              
                        <img src={adminbook.cover !== null ? adminbook.cover : 'https://via.placeholder.com/400'} />
            
                        <button onClick={() => handleClick(adminbook.id)} className="form-control" > remove </button>

                    
        </div>
    );
}

export default AdminBook;