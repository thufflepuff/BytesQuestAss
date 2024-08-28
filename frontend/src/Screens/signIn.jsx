import * as React from 'react';
import { useState, useEffect } from "react";

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
  const [usernames, setUsernames] = useState([]);
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return password.length >= 8 && passwordRegex.test(password);
  };
  //Fetch all usernames on component mount
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const res = await api.get("/api/users/");
        const usernames = res.data.map(user => user.Username);
        //console.log(usernames)
        setUsernames(usernames);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsernames();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate password
    if (!validatePassword(Password)) {
      alert("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    // Validate username
    if (!usernames.includes(Username)) {
      alert(`User does not exists.`);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/user/login/", { Username, Password });
      const accessToken = res.data.tokens.access;
      const refreshToken = res.data.tokens.refresh;
      //console.log(accessToken,refreshToken);
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      navigateToProfile(Username);
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
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
