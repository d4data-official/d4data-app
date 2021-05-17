import React, { CSSProperties, useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import { IconButton } from '@material-ui/core'
import clsx from 'clsx'

export type Data = Array<Record<any, any>>

export interface Props {
  placeholder?: string
  data: Data
  keys: Array<string>
  onSearch?: (filteredData: Data) => void
  className?: string
  style?: CSSProperties
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  icon: {
    margin: 10,
    color: 'grey',
  },
  clearButton: {
    padding: 5,
  },
}))

export default function Searchbar({
  placeholder,
  data,
  keys,
  onSearch,
  className,
  style,
}: Props) {
  const classes = useStyles()
  const [search, setSearch] = useState('')
  const fuse = useMemo(() => new Fuse(data, {
    keys,
    threshold: 0.3,
    minMatchCharLength: 3,
    ignoreLocation: true,
    useExtendedSearch: true,
  }), [data, keys])

  useEffect(() => {
    if (search.length === 0) {
      onSearch?.(data)
      return
    }

    const filteredData = fuse.search(search)
      .map((result) => result.item)

    onSearch?.(filteredData)
  }, [search])

  return (
    <Paper component="form" className={ clsx(classes.root, className) } style={ style }>
      <SearchIcon className={ classes.icon }/>
      <InputBase
        className={ classes.input }
        placeholder={ placeholder ?? 'Search' }
        value={ search }
        onChange={ (event) => setSearch(event.target.value) }
      />
      { search.length > 0
      && (
        <IconButton size="small" className={ classes.clearButton } onClick={ () => setSearch('') }>
          <ClearIcon/>
        </IconButton>
      ) }
    </Paper>
  )
}
