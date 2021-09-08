import { AuthorizedDevice } from '@d4data/archive-lib/dist/src/types/schemas'
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import { makeStyles } from '@material-ui/styles'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Trans from 'components/Translate'
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'

export interface Props {
  data: NonNullable<GetterData<Array<AuthorizedDevice>>>
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

export default function AuthorizedDevices({ data }: { data: NonNullable<GetterData<Array<AuthorizedDevice>>> }) {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          <Trans page="authorizeddevices" section="found" template={ `${ data.data.length } {{template}}.` } />
        </Typography>
      </Box>
      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table className={ classes.table } size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell><Trans page="common" section="name" /></TableCell>
                <TableCell><Trans page="common" section="ip" /></TableCell>
                <TableCell><Trans page="common" section="date" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data.data.map((row) => {
                const device = row
                return (
                  <TableRow key={ row.name }>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { device.name }
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { device.ip }
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { device.authorizationDate?.toLocaleString() ?? 'No date provided' }
                    </TableCell>
                  </TableRow>
                )
              }) }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}
