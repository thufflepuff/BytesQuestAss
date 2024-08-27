import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API_URL}/api/user`
export default function Accounts () {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      axios.get(apiUrl)
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the user list!', error);
        });
    }, []);

    return (
      <>     
      <h6>Accounts add ya remove krne ka option</h6> 
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.Username} - {user.Email}
          </li>
        ))}
      </ul>
      </>
    )
  }