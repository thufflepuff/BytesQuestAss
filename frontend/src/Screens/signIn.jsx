import * as React from 'react';
import { useState } from "react";

import {Avatar ,Grid ,Typography ,Container ,Box ,Button ,CssBaseline ,TextField ,FormControlLabel ,Checkbox} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';
import { SignInTheme } from '../components/themes';

import useNavigations from '../components/navigations';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

export default function SignIn() {
  const { navigateToProfile, navigateToSignUp } = useNavigations();

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const route="/api/user/login/";

  const handleSubmit = async (event) => {
  setLoading(true);
    event.preventDefault();
    try {
      const res = await api.post(route, { Username, Password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigateToProfile();
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
        console.log((route, { Username, Password }))
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <ThemeProvider theme={SignInTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              required
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <button 
                  onClick={navigateToSignUp} 
                  style={{ 
                    textDecoration: 'none', 
                    color: 'white', 
                    background: 'transparent', 
                    border: 'none', 
                    cursor: 'pointer' 
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
