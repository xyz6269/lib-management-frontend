import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import exitbutton from './exit.png';
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from "react-bootstrap/Table";

const UserManagment = () => {
    const token = localStorage.getItem('token');
    const [users, setData] = useState([]);
    const navigate = useNavigate('/home');
    console.log(token);
    console.log("sfuckkkkkkkkkkkkk")


    useEffect(() => {
        const fetchCart = async () => {
         // Retrieve JWT token from local storage
          console.log(token);
          try {
            const response = await axios.get('http://localhost:8080/lib/admin/allusers', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setData(response.data);
            console.log(users);
          } catch (error) {
            console.error(error);
          }
        };
        fetchCart();
      }, []);
      
      const banuser = async (id) => {
        console.log(token);
        try {
          const response = await axios.delete(
            `http://localhost:8080/lib/admin/banuser/${id}`,
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



    return (
      <div>
      <div>
        <CloseIcon
          fontSize="large"
          className="exiticon"
          onClick={(e) => navigate("/home")}
        />
      </div>
  
      {users?.length > 0 ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
               
              <th> id</th>
              <th> first name </th>
              <th> last name </th>
              <th> email  </th>
              <th> ban user </th>
              
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                <td>
                  <DeleteIcon onClick={(e) => banuser(user.id)}/>
                </td>
                </td>
               
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="empty">
          <h2> no registered users </h2>
        </div>
      )}
    </div>
  );
  };
export default UserManagment;












