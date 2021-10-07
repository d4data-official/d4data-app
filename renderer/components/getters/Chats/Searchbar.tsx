import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { createStyles, makeStyles } from '@material-ui/styles'
// @ts-ignore
import { Search } from '@chatscope/chat-ui-kit-react'

export type Data = Array<Record<any, any>>

export interface Props {
  placeholder?: string
  data: Data
  keys: Array<string>
  onSearch?: (filteredData: Data) => void
}

const useStyles = makeStyles((theme) => createStyles({
  searchBar: {
    '& input': {
      '&::placeholder': {
        color: `${ theme.palette.text.primary } !important`,
      },
      backgroundColor: `${ theme.palette.background.paper } !important`,
      color: `${ theme.palette.text.primary } !important`,
    },
    '& svg': {
      color: `${ theme.palette.primary.main } !important`,
    },
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: `${ theme.palette.background.paper } !important`,
    color: theme.palette.text.primary,
  },
}))

export default function Searchbar({
  placeholder,
  data,
  keys,
  onSearch,
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

  const handleChangeInput = useCallback((s: string) => {
    setSearch(s)
  }, [])

  return (
    <Search
      placeholder={ placeholder }
      onChange={ handleChangeInput }
      onClearClick={ () => handleChangeInput('') }
      className={ classes.searchBar }
    />
  )
}
