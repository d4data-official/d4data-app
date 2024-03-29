import { makeStyles } from '@mui/styles'
import { grey } from '@mui/material/colors'

export default makeStyles((theme) => ({
  root: {
    height: '100%',
    background: theme?.palette?.background?.default ?? grey[100],
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  appbar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: 'calc(100% - 240px)',
    marginLeft: 240,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbarLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  toolbarOpen: {
    width: 'calc(100vw - 240px)',
  },
  toolbarClose: {
    width: '100vw',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerOpen: {
    width: 240,
  },
  drawerClose: {
    display: 'hidden',
  },
  main: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: -240,
    // display: 'flex',
    // justifyContent: 'center',
  },
  mainShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 240,
  },
  mainClose: {
    width: '100vw',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  settingsButton: {
    color: theme.palette.primary.contrastText,
  },
}))
