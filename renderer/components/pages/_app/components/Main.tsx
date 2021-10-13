import React from 'react'
import useStyles from 'pages-components/_app/styles/main.styles'
import { AppBar, Drawer, Toolbar } from '@mui/material'

export interface MainProps {
  className: string
  children: JSX.Element | JSX.Element[]
}

export default function Main({ className, children }: MainProps) {
  const classes = useStyles()
  return (
    <div className={ className }>
      <AppBar variant="elevation">
        <Toolbar className={ classes.header }>
          <h1>
            Header
          </h1>
        </Toolbar>
        <Drawer open variant="persistent" PaperProps={ { color: '#000' } }/>
      </AppBar>
      { children }
    </div>
  )
}
