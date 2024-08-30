import React, { useContext } from 'react';
import { UserContext } from '../components/contexts/userContext';

export default function Profile() {
  const { userData, loading, error } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
        <p>User does not exist</p>
      )}
    </div>
  );
}
