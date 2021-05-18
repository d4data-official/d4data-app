import { createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      // main: '#556cd6', // Blue
      main: '#00c687', // Green
      light: 'rgb(81, 91, 95)',
      dark: 'rgb(26, 35, 39)',
      contrastText: 'white',
    },
    secondary: {
      main: '#19857b',
      light: 'rgb(255, 197, 112)',
      dark: 'rgb(200, 147, 89)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    error: {
      main: red.A400,
    },
    success: {
      main: '#00945a',
    },
  },
})
