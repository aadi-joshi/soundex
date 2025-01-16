import { createTheme } from '@material-ui/core/styles';

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#007BFF',
      light: 'rgba(0, 123, 255, 0.1)',
      dark: '#0056b3'
    },
    secondary: {
      main: '#000000',
      light: '#1a1a1a',
      dark: '#000000'
    },
    background: {
      default: '#000000',
      paper: '#121212'
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)'
    }
  },
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: '1px solid rgba(0, 123, 255, 0.1)'
      },
      head: {
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        color: '#007BFF'
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: '#121212',
        backgroundImage: 'linear-gradient(rgba(0, 123, 255, 0.05), rgba(0, 123, 255, 0.05))'
      }
    }
  }
});
