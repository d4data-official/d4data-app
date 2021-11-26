import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  ListItemText,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import Select from '@mui/material/Select'
import { CalendarToday, CheckCircle, List as ListIcon, RadioButtonUnchecked, Timeline } from '@mui/icons-material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import clsx from 'clsx'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { createStyles, makeStyles } from '@mui/styles'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import type { TaskList } from '@d4data/archive-lib/dist/src/types/schemas'
import type { Task } from '@d4data/archive-lib/dist/src/types/schemas/TaskList'
import { useTranslation } from 'react-i18next'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import AutoTabs from '../AutoTabs'

const drawerWidth = 240

const useStyles = makeStyles((theme) => createStyles({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    paddingTop: 2,
    marginLeft: 20,
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    maxWidth: '30vw',
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    paddingTop: 2,
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
    padding: theme.spacing(1, 10),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
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
  timeBox: {
    display: 'flex',
    marginTop: '30px',
    marginLeft: '10px',
    color: 'grey',
  },
  status: {
    marginTop: '0px',
  },
}))

function TaskDisplay({ task }: { task: Task }) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }
  return (
    <Accordion style={ { width: '70%' } } expanded={ expanded === 'panel1' } onChange={ handleChange('panel1') }>
      <AccordionSummary
        expandIcon={ <ExpandMoreIcon/> }
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <div className={ classes.status }>
          { task?.status === 'todo' && <RadioButtonUnchecked style={ { color: 'blue' } }/> }
          { task?.status === 'done' && <CheckCircle style={ { color: 'green' } }/> }
        </div>
        <Typography className={ classes.heading }>
          { task.name.length > 0 ? task.name : 'Unnamed Task' }
        </Typography>
        <Typography
          className={ classes.secondaryHeading }
          style={ { whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } }
        >
          { task.description && task?.description?.length > 0 ? task.description : 'An empty description was provided' }
        </Typography>
      </AccordionSummary>
      <Divider/>
      <AccordionDetails>

        <div style={ { display: 'flex', flexDirection: 'column', flexGrow: 1 } }>
          <div>
            <div style={ { display: 'flex', margin: '25px' } }>
              { task.description && task?.description?.length > 0 ? task.description : 'No description provided' }
            </div>
            <div className={ classes.timeBox }>
              <CalendarToday fontSize="small"/>
              <div style={ { display: 'flex', marginLeft: '5px' } }>
                Creation date: { task?.createdAt?.toLocaleString() ?? 'No date provided' }
              </div>
            </div>
            <div className={ classes.timeBox }>
              <CalendarToday fontSize="small"/>
              <div style={ { display: 'flex', marginLeft: '5px' } }>
                Last update date: { task?.updateAt?.toLocaleString() ?? 'No date provided' }
              </div>
            </div>
            <div className={ classes.timeBox }>
              <CalendarToday fontSize="small"/>
              <div style={ { display: 'flex', marginLeft: '5px' } }>
                End date: { task?.dueDate?.toLocaleString() ?? 'No date provided' }
              </div>
            </div>
          </div>
          { (task?.children && task?.children.length !== 0)
          && (
            <>
              <Divider style={ { marginTop: '30px' } }/>
              <div
                style={ {
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  marginTop: '30px',
                  alignItems: 'center',
                } }
              >
                { task?.children?.map((subTask: Task) => <TaskDisplay task={ subTask }/>) }

              </div>
            </>
          ) }
        </div>
      </AccordionDetails>
    </Accordion>

  )
}

function PersistentDrawerLeft({ taskList }: { taskList: NonNullable<Array<TaskList>> }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const [index, setIndex] = React.useState(0)
  const [value, setValue] = React.useState<string>('')

  const handleChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value)
  }

  return (
    <div className={ classes.root }>
      <main
        className={ clsx(classes.content, {
          [classes.contentShift]: open,
        }) }
      >
        <div className={ classes.drawerHeader }>
          <Select
            value={ taskList?.[0]?.title }
            onChange={ handleChange }
          >
            { taskList.map((taskL: TaskList) => (
              <MenuItem value={ taskL.title }>
                <ListItemText primary={ taskL.title }/>
              </MenuItem>
            )) }
          </Select>
        </div>
        <div
          style={ {
            display: 'flex', alignItems: 'center', flexDirection: 'column', marginLeft: '10%',
          } }
        >
          { taskList?.[index]?.tasks?.map((task: any) => <TaskDisplay task={ task }/>) }
        </div>
      </main>
    </div>
  )
}

function Tasks({ data }: { data: NonNullable<GetterData<Array<TaskList>>> }) {
  const { t } = useTranslation('common')

  return (
    <AutoTabs
      tabs={ [
        { label: t('stat'), icon: <Timeline/> },
        { label: t('list'), icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.TASKS }/>,
        <PersistentDrawerLeft taskList={ data.data ?? [] }/>,
      ] }
    />
  )
}

export default Tasks
