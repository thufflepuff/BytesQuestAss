import profileIcon from '../../pictures/profile.png'
import addIcon from '../../pictures/add.png'

import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Avatar, Divider } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import useNavigations from '../navigations';
import { fetchAccounts } from './listAccounts';



const AccountDropdown = () => {
  const [accountDropdownOpen, setAccountDropdownOpen] = useState({});
  const [accounts, setAccounts] = useState([]);
  const { navigateToDashboard, navigateToPosts, navigateToMessages, navigateToAccounts } = useNavigations();

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const accountsData = await fetchAccounts(navigateToDashboard, navigateToPosts, navigateToMessages);
        setAccounts(accountsData);
      } catch (error) {
        console.error("Error loading accounts:", error);
      }
    };
    loadAccounts();
  }, []);

  const toggleAccountDropdown = (accountType) => () => {
    setAccountDropdownOpen((prevState) => ({
      ...prevState,
      [accountType]: !prevState[accountType],
    }));
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={toggleAccountDropdown('Accounts')} sx={{ pl: 4 }}>
        <ListItemIcon>
          <img src={profileIcon} alt="Accounts icon" style={{ width: 24, height: 24 }} />
        </ListItemIcon>
        <ListItemText primary="Accounts" />
        {accountDropdownOpen['Accounts'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={accountDropdownOpen['Accounts']} timeout="auto" unmountOnExit>
        <List component="div">
          {accounts.map((account, accountIndex) => (
            <React.Fragment key={account.id}>
              <ListItemButton onClick={toggleAccountDropdown(account.type)} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Avatar sx={{ width: 24, height: 24 }} src={account.icon} />
                </ListItemIcon>
                <ListItemText primary={account.name} />
                {accountDropdownOpen[account.type] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={accountDropdownOpen[account.type]} timeout="auto" unmountOnExit>
                <List component="div">
                  {account.pages.map((page, pageIndex) => (
                    <React.Fragment key={page.name}>
                      <ListItem>
                        <ListItemButton onClick={page.action} sx={{ pl: 8 }}>
                          <ListItemIcon>
                            <img src={page.icon} alt={`${page.name} icon`} style={{ width: 24, height: 24 }} />
                          </ListItemIcon>
                          <ListItemText primary={page.name} />
                        </ListItemButton>             
                      </ListItem>
                      {pageIndex < account.pages.length - 1 && <Divider sx={{ bgcolor: 'white' }} />}
                    </React.Fragment>
                  ))}
                </List>
              </Collapse>
              {accountIndex < accounts.length - 1 && <Divider sx={{ bgcolor: 'white' }} />}
            </React.Fragment>
          ))}
          <Divider sx={{ bgcolor: 'white' }} />
          <ListItem key="Add another account">
            <ListItemButton onClick={navigateToAccounts}>
              <ListItemIcon>
                <img src={addIcon} alt="Add another account icon" style={{ width: 24, height: 24 }} />
              </ListItemIcon>
              <ListItemText primary="Add another account" />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default AccountDropdown;
