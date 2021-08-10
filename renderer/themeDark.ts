import { createTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

export default createTheme({
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#00c687',
          color: '#fff',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#00c687',
          color: '#fff',
        },
        body: {
          fontsize: 14,
        },
        root: {
          color: 'inherit',
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      // main: '#556cd6', // Blue
      main: '#00c687', // Green
      contrastText: 'white',
    },
    secondary: {
      main: '#19857b',
      contrastText: 'white',
    },
    error: {
      main: red.A400,
    },
    success: {
      main: '#00945a',
    },
  },
})
