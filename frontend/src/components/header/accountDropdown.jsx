import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Avatar, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import postIcon from '../../pictures/post.png';
import messagesIcon from '../../pictures/messages.png';
import addIcon from '../../pictures/add.png';

const accounts = [
    {
      name: 'Account1',
      pages: [
        { name: 'Posts', link: '/Account1/Posts', icon: postIcon },
        { name: 'Messages', link: '/Account1/Messages', icon: messagesIcon },
      ],
    },
  ];
  

const AccountDropdown = ({navigateToAccounts}) => {
  const [accountDropdownOpen, setAccountDropdownOpen] = useState({});

  const toggleAccountDropdown = (account) => () => {
    setAccountDropdownOpen((prevState) => ({
      ...prevState,
      [account]: !prevState[account],
    }));
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={toggleAccountDropdown('Accounts')} sx={{ pl: 4 }}>
        <ListItemIcon>
          <img src={addIcon} alt="Accounts icon" style={{ width: 24, height: 24 }} />
        </ListItemIcon>
        <ListItemText primary="Accounts" />
        {accountDropdownOpen['Accounts'] ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={accountDropdownOpen['Accounts']} timeout="auto" unmountOnExit>
        <List component="div">
          {accounts.map((account, accountIndex) => (
            <React.Fragment key={account.name}>
              <ListItemButton onClick={toggleAccountDropdown(account.name)} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Avatar sx={{ width: 24, height: 24 }}>
                    {account.name.charAt(account.name.length - 1)}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={account.name} />
                {accountDropdownOpen[account.name] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={accountDropdownOpen[account.name]} timeout="auto" unmountOnExit>
                <List component="div">
                  {account.pages.map((page, pageIndex) => (
                    <React.Fragment key={page.name}>
                      <ListItem>
                        <ListItemButton component={Link} to={page.link} sx={{ pl: 8 }}>
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