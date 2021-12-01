import { Box, Button, Dialog, DialogActions, DialogContent, Paper, useTheme } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import React, { useEffect, useMemo, useState } from 'react'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import { useTranslation } from 'react-i18next'
import Message from '@d4data/archive-lib/dist/src/types/schemas/Message'
import { Post as PostType } from '@d4data/archive-lib/dist/src/types/schemas'
import useGetter from '../../hooks/getter/useGetter'
import Loading from '../pages/dashboard/components/Loading'
import NoData from '../pages/dashboard/components/NoData'
import ErrorAlert from '../ErrorAlert'
import TextEllipsisTooltip from '../TextEllipsisTooltip'
import Post from '../Post'
import GrowTransition from '../transitions/GrowTransition'

type Entity = Message

export default function MessageList() {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const { data, loading, error } = useGetter<Array<Entity>>(Getters.MESSAGES, {
    parsingOptions: {
      pagination: {
        offset: 0,
        items: Infinity,
      },
    },
  })
  const [postDialog, setPostDialog] = useState<PostType>()
  const [postDialogOpened, setPostDialogOpened] = useState(false)

  useEffect(() => postDialog && setPostDialogOpened(true), [postDialog])

  const columns: Array<GridColDef> = [
    {
      headerName: t('title'),
      field: 'title',
      type: 'string',
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <TextEllipsisTooltip
          text={ params.value }
          tooltipProps={ { placement: 'top-start' } }
        />
      ),
    },
    {
      headerName: t('sentBy'),
      field: 'sender',
      type: 'string',
      minWidth: 200,
    },
    {
      headerName: t('date'),
      field: 'creationDate',
      minWidth: 200,
      valueFormatter: (params) => (params.value as Entity['creationDate'])?.toLocaleString(),
    },
    {
      headerName: t('content'),
      field: 'content',
      type: 'string',
      minWidth: 200,
      renderCell: (params) => (
        <TextEllipsisTooltip
          text={ params.value }
          tooltipProps={ { placement: 'top-start' } }
        />
      ),
    },
  ]

  const rows = useMemo(() => data?.data
    ?.map((event, index) => ({ id: index, ...event })), [data])

  const openPostDialog = (post: PostType) => {
    setPostDialog(post)
    setPostDialogOpened(true)
  }

  if (error) {
    return <ErrorAlert error={ error }/>
  }

  if (loading) {
    return (
      <Loading/>
    )
  }

  if (data === null || data?.data === null) {
    return (
      <NoData/>
    )
  }

  return (
    <Box
      height={ 1 }
      paddingTop={ 2 }
      display="flex"
      flexDirection="column"
      overflow="auto"
    >
      <Paper variant="outlined" sx={ { height: 1 } }>
        <DataGrid
          rows={ rows! }
          columns={ columns }
          loading={ loading }
          onRowClick={ (params) => openPostDialog(params.row) }
          density="compact"
          components={ { Toolbar: GridToolbar } }
          style={ { backgroundColor: theme.palette.background.default } }
        />
      </Paper>

      <Dialog
        open={ postDialogOpened }
        onClose={ () => setPostDialogOpened(false) }
        TransitionComponent={ GrowTransition }
        transitionDuration={ 500 }
      >
        <DialogContent>
          { postDialog && <Post post={ postDialog } cardProps={ { elevation: 0 } }/> }
        </DialogContent>

        <DialogActions>
          <Button onClick={ () => setPostDialogOpened(false) }>{ t('close') }</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
