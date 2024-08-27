import { createTheme } from '@mui/material/styles';

export const SignInTheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white', // Border color
              },
              '&:hover fieldset': {
                borderColor: 'white', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white', // Border color when focused
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white', // Label color
            },
            '& .MuiInputBase-input': {
              color: 'white', // Input text color
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
              color: 'white', // Checkbox color when checked
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
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiInputBase-input': {
              color: 'white',
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
            color: 'white',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'white',
          },
        },
      },
    },
  });
  