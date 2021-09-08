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
import { Community } from '@d4data/archive-lib/dist/src/types/schemas'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import moment from 'moment'
import Trans from 'components/Translate'

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

export default function Communities({ data }: { data: NonNullable<GetterData<Array<Community>>> }) {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          <Trans page="communities" section="found" template={ `${ data.data.length } {{template}}.` } />
        </Typography>
      </Box>
      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table className={ classes.table } size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Trans page="common" section="name" />
                </TableCell>
                <TableCell><Trans page="common" section="joinedDate" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data.data.map((row) => {
                const community = row
                return (
                  <TableRow key={ row.name }>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { community.name }
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      { community.joinedDate
                        ? moment(new Date(community.joinedDate)).format('yyyy-MM-DD')
                        : 'No date provided' }
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
