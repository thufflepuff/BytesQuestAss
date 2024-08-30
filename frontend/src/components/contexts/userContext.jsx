import React, { createContext, useState, useEffect } from 'react';
import api from '../../api';
import { ACCESS_TOKEN } from '../../constants';

export const UserContext = createContext();

export const ActiveUserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (!accessToken) {
        setError('No access token found');
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/api/user/');
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};
