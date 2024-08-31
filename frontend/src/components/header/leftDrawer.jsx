import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer } from '@mui/material';

import profileIcon from '../../pictures/profile.png';
import settingIcon from '../../pictures/setting.png';
import signoutIcon from '../../pictures/signout.png';
import AccountDropdown from './accountDropdown';

function LeftDrawer({ drawerOpen, toggleDrawer, navigateToProfile, navigateToDashboard, navigateToSettings, navigateToSignIn }) {
  const pages = [
    { name: 'Profile', action: navigateToProfile, icon: profileIcon },
    { name: 'Settings', action: navigateToSettings, icon: settingIcon },
    { name: 'Signout', action: navigateToSignIn, icon: signoutIcon },
  ];

  const drawerList = () => (
    <Box sx={{ width: 250 }} role="presentation" onKeyDown={toggleDrawer(false)}>
      <List>
        {pages.map((page, index) => (
          <React.Fragment key={page.name}>
            <ListItem onClick={page.action}>
              <ListItemButton>
                <ListItemIcon>
                  <img src={page.icon} alt={`${page.name} icon`} style={{ width: 24, height: 24 }} />
                </ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
            {index < pages.length - 1 && <Divider sx={{ bgcolor: 'white' }} />}
          </React.Fragment>
        ))}
        <Divider sx={{ bgcolor: 'white' }} />
        <AccountDropdown />
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#3F00FF',
          color: 'white',
          top: '72px',
        },
      }}
    >
      {drawerList()}
    </Drawer>
  );
}

export default LeftDrawer;
