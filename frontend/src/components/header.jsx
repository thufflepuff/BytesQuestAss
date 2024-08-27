import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';

import dashboardIcon from '../pictures/dashboard.png';
import postIcon from '../pictures/post.png';
import messagesIcon from '../pictures/messages.png';
import profileIcon from '../pictures/profile.png';
import addIcon from '../pictures/add.png';
import settingIcon from '../pictures/setting.png';
import signoutIcon from '../pictures/signout.png';

import useNavigations from './navigations';


const accounts = [
  {
    name: 'Account1',
    pages: [
      { name: 'Posts', link: '/Account1/Posts', icon: postIcon },
      { name: 'Messages', link: '/Account1/Messages', icon: messagesIcon },
    ],
  },
  {
    name: 'Account2',
    pages: [
      { name: 'Posts', link: '/Account2/Posts', icon: postIcon },
      { name: 'Messages', link: '/Account2/Messages', icon: messagesIcon },
    ],
  },
  {
    name: 'Account3',
    pages: [
      { name: 'Posts', link: '/Account3/Posts', icon: postIcon },
      { name: 'Messages', link: '/Account3/Messages', icon: messagesIcon },
    ],
  },
];

function NavBar() {
  const { navigateToProfile, navigateToDashboard, navigateToSettings, navigateToSignIn, navigateToSignUp } = useNavigations();

//Buttons in the left drawers
  const pages = [
    { name: 'Profile', action: navigateToProfile, icon: profileIcon },
    { name: 'Dashboard', action: navigateToDashboard, icon: dashboardIcon },
    { name: 'Settings', action: navigateToSettings, icon: settingIcon },
    { name: 'Signout', action: navigateToSignIn, icon: signoutIcon },
  ];
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [accountsOpen, setAccountsOpen] = React.useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = React.useState({});
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };
  const toggleAccounts = () => {
    setAccountsOpen(!accountsOpen);
  };
  const toggleAccountDropdown = (account) => () => {
    setAccountDropdownOpen((prevState) => ({
      ...prevState,
      [account]: !prevState[account],
    }));
  };
  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {pages.map((page, index) => (
          <React.Fragment key={page.name}>
          <ListItem onClick={page.action}>
            <ListItemButton>
              <ListItemIcon>
                <img
                  src={page.icon}
                  alt={`${page.name} icon`}
                  style={{ width: 24, height: 24 }}
                />
              </ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItemButton>
          </ListItem>
          {index < pages.length - 1 && <Divider sx={{ bgcolor: 'white' }} />}
          </React.Fragment>
        ))}
        {/* Main Accounts Dropdown */}
        <Divider sx={{ bgcolor: 'white' }} />
        <ListItemButton onClick={toggleAccounts} sx={{ pl: 4 }}s>
          <ListItemIcon>
            <img
              src={addIcon}
              alt="Accounts icon"
              style={{ width: 24, height: 24 }}
            />
          </ListItemIcon>
          <ListItemText primary="Accounts" />
          {accountsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={accountsOpen} timeout="auto" unmountOnExit>
          <List component="div"  >
            {accounts.map((account, accountIndex) => (
              <React.Fragment key={account.name}>
                <ListItemButton
                  onClick={toggleAccountDropdown(account.name)}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ width: 24, height: 24 }}>
                      {account.name.charAt(account.name.length - 1)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={account.name} />
                  {accountDropdownOpen[account.name] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>
                <Collapse
                  in={accountDropdownOpen[account.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div"  >
                    {account.pages.map((page, pageIndex) => (
                      <React.Fragment key={page.name}>
                      <ListItem  >
                        <ListItemButton
                          component={Link}
                          to={page.link}
                          sx={{ pl: 8 }}
                        >
                          <ListItemIcon>
                            <img
                              src={page.icon}
                              alt={`${page.name} icon`}
                              style={{ width: 24, height: 24 }}
                            />
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
            <ListItem key="Add another account"  >
              <ListItemButton
                component={Link}
                to="/Accounts"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <img
                    src={addIcon}
                    alt="Add another account icon"
                    style={{ width: 24, height: 24 }}
                  />
                </ListItemIcon>
                <ListItemText primary="Add another account" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: 'indigo' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Left Drawer Button */}
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <Avatar sx={{ width: 48, height: 48 }}>T</Avatar>
            </IconButton>
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
          </Box>

          {/* Center: Title */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'left', color: 'cream' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/profile"
              sx={{
                fontFamily: 'arial',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Social Media Dashboard
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
