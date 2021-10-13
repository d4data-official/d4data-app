import { Community } from '@d4data/archive-lib/dist/src/types/schemas'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
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
