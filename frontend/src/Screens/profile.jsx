import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { ACCESS_TOKEN } from '../constants';

export default function Profile() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    //just precaution
    if (!accessToken) {
      setError('No access token found');
      setLoading(false);
      return;
    }

    // Fetch user data
    api.get(`/api/user/${username}/`)
    .then(response => {
      // Access user data directly from response.data
      setUserData(response.data);
      //console.log(response.data);
      setLoading(false);
    })
    .catch(err => {
      setError('Failed to fetch user data');
      setLoading(false);
    });
}, []);

  // Display loading state
  if (loading) return <div>Loading...</div>;

  // Display error state
  if (error) return <div>{error}</div>;

  // Display user data
  return (
    <div>
      <h1>Profile</h1>
      {userData ? (
        <div>
          <p><strong>Username:</strong> {userData.Username}</p>
          <p><strong>Firstname:</strong> {userData.Firstname}</p>
          <p><strong>Lastname:</strong> {userData.Lastname}</p>
          <p><strong>Email:</strong> {userData.Email}</p>
          {userData.Image !== 'NULL' && <img src={`${userData.Image}`} alt="Profile"  style={{ width: '250px', height: '500px', objectFit: 'cover' }}  />}
        </div>
      ) : (
        <p>User does not exist</p>/*again sirf precaution */
      )}
    </div>
  );
}