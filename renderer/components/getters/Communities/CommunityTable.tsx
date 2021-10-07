import { Community } from '@d4data/archive-lib/dist/src/types/schemas'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import moment from 'moment'
import React from 'react'

export interface Props {
  communities: Array<Community>
}

export default function CommunityTable({ communities }: Props) {
  return (
    <Container maxWidth="lg">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          { `${ communities.length } communities found` }
        </Typography>
      </Box>
      <Box my={ 2 }>
        <TableContainer component={ Paper }>
          <Table size="small" sx={ { minWidth: 700 } }>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Joined date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { communities.map((community) => (
                <TableRow key={ community.name }>
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
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}
