import { createTheme } from '@mui/material/styles';

export const SignInTheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            marginBottom: '16px', 
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'blue', // Border color
              },
              '&:hover fieldset': {
                borderColor: 'blue', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'blue', // Border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white', // Label color
            },
            '& .MuiInputBase-input': {
              color: 'indigo', // Input text color
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            color: 'white', // Checkbox label color
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: 'white', // Checkbox color
            '&.Mui-checked': {
              color: 'indigo', // Checkbox color when checked
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'white', // Typography color
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: 'white', // Button text color
          },
        },
      },
    },
  });

export const SignUpTheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'blue',
              },
              '&:hover fieldset': {
                borderColor: 'blue',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'blue',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiInputBase-input': {
              color: 'indigo',
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            color: 'white',
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: 'white',
            '&.Mui-checked': {
              color: 'white',
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: 'blue',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'blue',
          },
        },
      },
    },
  });
  