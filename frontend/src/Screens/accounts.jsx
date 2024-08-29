import React from 'react'
import api from '../api'

import { useEffect, useState } from 'react';

export default function Accounts () {

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccountsAll = async () => {
      try {
        const res = await api.get("/api/account/");
        const Accounts = res.data.map(account => account.owner);
        setAccounts(Accounts);
        //console.log(usernames);
      } catch (error) {
        console.error("there was an error fetching user list",error);
      }
    };
    fetchAccountsAll();
  }, []);

    return (
      <>     
      <h6>Accounts add krne ka option</h6> 
      <ul>
        {accounts.map(account => (
          <li key={account.id}>
            {account.owner}
            {account.type}
          </li>
        ))}
      </ul>
      </>
    )
  }