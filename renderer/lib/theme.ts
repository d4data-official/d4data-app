import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export default createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: 'linear-gradient(45deg, #000000 30%, #444444 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px #444',
      },
    },
    MuiDrawer: {
      paper: {
        // background: 'linear-gradient(45deg, #333333 30%, #555555 90%)',
        border: 0,
        color: '#666',
        height: '100vh',
        boxShadow: '0 3px 5px 2px #777',
      },
    },
    MuiDivider: {
      root: {
        background: 'linear-gradient(90deg, #888888 30%, #444444 90%)',
      },
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});
