import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar, createStyles, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText,
  makeStyles, Theme, Toolbar,
  Typography, useTheme,
} from '@material-ui/core';
import {
  BlurCircular, CalendarToday, CheckCircle, RadioButtonUnchecked,
} from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import type { TaskList } from '@d4data/archive-lib/src/types/schemas';
import type { Task } from '@d4data/archive-lib/src/types/schemas/TaskList'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${ drawerWidth }px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function TaskDisplay({ task }: { task: Task }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (

    <Accordion style={ { width: '70%' } } expanded={ expanded === 'panel1' } onChange={ handleChange('panel1') }>
      <AccordionSummary
        expandIcon={ <ExpandMoreIcon/> }
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <div>
          {task?.status === 'todo' && <RadioButtonUnchecked style={ { color: 'blue' } }/>}
          {task?.status === 'done' && <CheckCircle style={ { color: 'green' } }/>}
        </div>
        <Typography className={ classes.heading }>
          {task?.name}
        </Typography>
        <Typography
          className={ classes.secondaryHeading }
          style={ { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } }
        >
          {task?.description}
        </Typography>
      </AccordionSummary>
      <Divider/>
      <AccordionDetails>

        <div style={ { display: 'flex', flexDirection: 'column', flexGrow: 1 } }>
          <div>
            <div style={ { display: 'flex', margin: '25px' } }>
              {task?.description}
            </div>
            <div style={ {
              display: 'flex',
              marginTop: '30px',
              marginLeft: '10px',
              marginBottom: '5px',
              color: 'grey',
            } }
            >
              <CalendarToday fontSize="small"/>
              <div style={ { display: 'flex', marginLeft: '5px' } }>
                {task?.dueDate?.toLocaleString()}
              </div>
            </div>
          </div>
          {(task?.children && task?.children.length !== 0)
                    && (
                    <>
                      <Divider style={ { marginTop: '30px' } }/>
                      <div style={ {
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        marginTop: '30px',
                        alignItems: 'center',
                      } }
                      >
                        {task?.children?.map((subTask: Task) => <TaskDisplay task={ subTask }/>)}

                      </div>
                    </>
                    )}
        </div>
      </AccordionDetails>
    </Accordion>

  )
}

function PersistentDrawerLeft({ taskList }: { taskList: Array<TaskList> }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [index, setIndex] = React.useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={ classes.root }>
      <CssBaseline/>
      <AppBar
        position="fixed"
        className={ clsx(classes.appBar, {
          [classes.appBarShift]: open,
        }) }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ handleDrawerOpen }
            edge="start"
            className={ clsx(classes.menuButton, open && classes.hide) }
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" noWrap>
            TASKS
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={ classes.drawer }
        variant="persistent"
        anchor="left"
        open={ open }
        classes={ {
          paper: classes.drawerPaper,
        } }
      >
        <div className={ classes.drawerHeader }>
          <IconButton onClick={ handleDrawerClose }>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <List>
          {taskList.map((taskL: TaskList, i: number) => (
            <ListItem
              button
              key={ taskL.title }
              onClick={ () => {
                setIndex(i)
              } }
            >
              <ListItemIcon><BlurCircular/></ListItemIcon>
              <ListItemText primary={ taskL.title }/>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={ clsx(classes.content, {
          [classes.contentShift]: open,
        }) }
      >
        <div className={ classes.drawerHeader }/>
        <div style={ {
          display: 'flex', alignItems: 'center', flexDirection: 'column', marginLeft: '10%',
        } }
        >
          {taskList?.[index]?.tasks?.map((task: any) => <TaskDisplay task={ task }/>)}
        </div>
      </main>
    </div>
  );
}

interface Prop {
  data?: Array<TaskList>,
  parsedFiles?: string
}

function TaskLists({ data }: { data: Prop }) {
  return (
    <>
      <PersistentDrawerLeft taskList={ data?.data ?? [] }/>
    </>
  )
}

export default TaskLists
