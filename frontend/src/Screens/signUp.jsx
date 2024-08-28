import * as React from 'react';
import { useState, useEffect } from "react";
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ThemeProvider } from '@mui/material/styles';
import { SignUpTheme } from '../components/themes';
import useNavigations from '../components/navigations';
import api from '../api';

export default function SignUp() {
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Username, setUsername] = useState("");
  const [usernames, setUsernames] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Image, setImage] = useState(null);
  const [Loading, setLoading] = useState(false);
  const route = "/api/user/register/";

  const { navigateToSignIn } = useNavigations();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return password.length >= 8 && passwordRegex.test(password);
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  //Fetch usernames
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const res = await api.get("/api/users/");
        const usernames = res.data.map(user => user.Username);
        setUsernames(usernames);
        //console.log(usernames);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsernames();
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 encoded image
        localStorage.setItem('userImage', reader.result); // Store in local storage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    // Validations
    const fields = { Firstname, Lastname, Username, Password, Email, Image };
    const emptyField = Object.entries(fields).find(([key, value]) => !value);
    if (emptyField) {
      alert(`${emptyField[0]} cannot be empty`);
      setLoading(false);
      setLoading(false);
      return;
    }
    if (!validatePassword(Password)) {
      alert("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      setLoading(false);
      return;
    }
    if (usernames.includes(Username)) {
      alert(`Username already exists`);
      setLoading(false);
      return;
    }
    if (!validateEmail(Email)) {
      alert("Invalid email format");
      setLoading(false);
      return;
    }

    console.log({ Username, password: Password ,Firstname, Lastname, Email, Image})
    try {
      const res = await api.post(route, { Username, password: Password ,Firstname, Lastname, Email, Image});
      navigateToSignIn();
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
    <ThemeProvider theme={SignUpTheme}>
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
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'primary.main',
              width: 100,
              height: 100,
              backgroundImage: Image ? `url(${Image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!Image && <LockOutlinedIcon />}
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button
                variant="contained"
                component="span"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '100%',
                  borderRadius: 0,
                  borderTopLeftRadius: '50%',
                }}
              >
                Upload
              </Button>
            </label>
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={Firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={Lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
