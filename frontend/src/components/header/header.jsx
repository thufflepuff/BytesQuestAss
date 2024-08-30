import * as React from 'react';
import { useContext } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Avatar } from '@mui/material';

import useNavigations from '../navigations';

import { UserContext } from '../contexts/userContext';
import LeftDrawer from './leftDrawer';

function NavBar() {
  const { userData } = useContext(UserContext);
  const { navigateToProfile, navigateToDashboard, navigateToSettings, navigateToSignIn } = useNavigations();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isLoggedIn = !!userData;

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  //Profile pic logic
  const avatarStyle = userData && userData.Image !== 'NULL' ? {
    backgroundImage: `url(${userData.Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: 48,
    height: 48,
  } : { width: 48, height: 48 };



  return (
    <AppBar position="static" sx={{ backgroundColor: 'indigo' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Left Drawer Button */}
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
          {isLoggedIn && (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer(true)}
                >
                  <Avatar sx={avatarStyle}>T</Avatar>
                </IconButton>
                <LeftDrawer
              drawerOpen={drawerOpen}
              toggleDrawer={toggleDrawer}
              avatarStyle={avatarStyle}
              navigateToProfile={navigateToProfile}
              navigateToDashboard={navigateToDashboard}
              navigateToSettings={navigateToSettings}
              navigateToSignIn={navigateToSignIn}
            />
              </>
            )}
          </Box>

          {/* Center: Title */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'left', color: 'cream' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={navigateToProfile}
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
