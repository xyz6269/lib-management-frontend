import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Book from './Book'
import profileIcon from '../user.png'
import axios from 'axios';
import CartIcon from '@mui/icons-material/ShoppingCart';
import Ordericon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';
import Notis from '@mui/icons-material/Notifications';
import Search from '@mui/icons-material/Search';
import Nav from './Navbar';
import "../Styles/Home.css"

function Home () {
    const [books, setBook] = useState([]);
    const [searchterm, setSearchTerm] = useState('');
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
                books?.length > 0
                ?(
                  <div className="grid-container">
                     {books.map((book) => (
                     <Book book={book} key={book.id} />
                     ))}
                  </div>
                ) : (
                    <div className="empty"> 
                    <h2> no books </h2>
                    </div>
                )   
            }
            </div>
            
        </div>
    );
};

export default Home;
