import React, { useState , useEffect}  from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';  

const Notifications = () => {
    const token = localStorage.getItem('token');
    const [notis, setNotis] = useState([]);
    const navigate = useNavigate();
    

  
    useEffect(() => {
      const fetchCart = async () => {
       // Retrieve JWT token from local storage
        console.log(token);
        try {
          const response = await axios.get(`http://localhost:8080/lib/user/mynotis`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          );
          setNotis(response.data);
          console.log(notis);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCart();
    }, []);


    return(

    <div>
    <div>
      <CloseIcon
        fontSize="large"
        className="exiticon"
        onClick={(e) => navigate("/home")}
      />
    </div>

    {notis?.length > 0 ? (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
             
            <th> id</th>
            <th> subject </th>
            <th> date</th>
            
          </tr>
        </thead>
        <tbody>
          {notis.map((noti) => (
            <tr key={noti.id}>
              <td>{noti.id}</td>
              <td>{noti.text}</td>
              <td>{noti.customDate}</td>
             
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <div className="empty">
        <h2> you have no notifications </h2>
      </div>
    )}
  </div>
);
};
export default Notifications;