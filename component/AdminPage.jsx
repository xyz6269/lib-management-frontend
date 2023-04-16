import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Adminbook from './AdminBook'
import Nav from './AdminNav';


const AdminPage = () => {

    const [adminbooks, setBook] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    

        
    useEffect(()=> {
        fetch('http://localhost:8080/lib/books/allbooks')
        .then(response => response.json())
        .then(data => setBook(data));

        console.log("hhhhhhhhhhhhhhhhhhh");
    },[])

    return (
        <div>
            <Nav/>
            <div className="list-books">
            {
                adminbooks?.length > 0
                ?(
                  <div className="grid-container">
                     {adminbooks.map((adminbook) => (
                     <Adminbook adminbook={adminbook} key={adminbook.id} />
                     ))}
                  </div>
                ) : (
                    <div className="empty"> 
                    <h2> No books found </h2>
                    </div>
                )   
            }
            </div>
            
        </div>
    );
};

export default AdminPage;
