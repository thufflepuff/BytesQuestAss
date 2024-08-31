import React, { useState } from 'react';
import api from '../../api';

import { ThemeProvider } from '@mui/material/styles';
import { SignInTheme } from '../../components/themes';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Typography, Container, Box, Button, CssBaseline, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

export default function Accounts() {

  const [Type, setType] = useState(''); // Initialize with an empty string
  const [Loading, setLoading] = useState(false); // Initialize with false
  const loginUrl = process.env.REACT_APP_API_URL
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/user/account/add", { type: Type });
      //window.location.reload();
      switch (Type) {
        case 'IN':
          window.location.href = `${loginUrl}/insta/instagram/login/`;
          break;
        default:
          console.log("kuch toh gadbad hai daya")
      }
      // Handle success (e.g., update accounts list, show a success message, etc.)
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
          Add Accounts
      </Typography>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                id="demo-simple-select"
                value={Type} // Correct prop name
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value={"IN"}>Instagram</MenuItem>
                <MenuItem value={"LI"}>LinkedIn</MenuItem>
                <MenuItem value={"TW"}>Twitter</MenuItem>
                <MenuItem value={"RE"}>Reddit</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={Loading} // Disable the button while loading
            >
              {Loading ? 'Submitting...' : 'Submit'}
            </Button>
        </Box>
      </Container>
      </Box>
      </Container>
    </ThemeProvider>
  );
}
