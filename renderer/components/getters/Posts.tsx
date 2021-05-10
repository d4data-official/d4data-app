import React from 'react';
import moment from 'moment';
import type { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { Post } from '@d4data/archive-lib/src/types/schemas'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SmsFailed from '@material-ui/icons/SmsFailed';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

export interface Props {
  data: NonNullable<GetterData<Array<Post>>>
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    padding: '10px 20px',
  },
  title: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 12,
  },
  pos: {
    fontSize: 10,
  },
  heading: {
    fontSize: 15,
  },
  reactions: {
    width: '100%',
    marginBottom: 10,
  },
  box: {
    boxShadow: 'none',
  },
});

function PostComponent({ data }: { data: NonNullable<Post> }) {
  const classes = useStyles();

  return (
    <Card className={ classes.root } variant="outlined">
      <CardContent>
        <Typography className={ classes.title } variant="h5" component="h2">
          { data.title
          ?? <span>A publié <a href={ data.metaData?.links?.[0] }>un lien</a></span>
          ?? <span>A publié <a href={ data.metaData?.medias?.[0].url }>un média</a></span>
          ?? 'No title provided' }
        </Typography>
        <Typography className={ classes.description } variant="body2" component="p">
          { data.description ?? 'No description provided' }
        </Typography>
        <Typography className={ classes.pos } color="textSecondary">
          Sent by { data.sender ?? 'Unknown' } { moment.duration(data.creationDate.valueOf() / 10).humanize() } ago
        </Typography>
      </CardContent>
      {/* <div className={ classes.reactions }>
        <Accordion className={ classes.box }>
          <AccordionSummary
            expandIcon={ <ExpandMoreIcon /> }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={ classes.heading }>Reactions (2)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table className={ classes.reactions } aria-label="simple table">
                <TableBody>
                  <TableRow key="name" >
                    <TableCell component="th" scope="row">
                      <SmsFailed/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Reaction name
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Reaction description
                    </TableCell>
                    <TableCell align="right">02/01/2021 - 14:21:36</TableCell>
                  </TableRow>
                  <TableRow key="name" >
                    <TableCell component="th" scope="row">
                      <SmsFailed/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Reaction name
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Reaction description
                    </TableCell>
                    <TableCell align="right">02/01/2021 - 14:21:36</TableCell>
                  </TableRow>
                  <TableRow key="name" >
                    <TableCell component="th" scope="row">
                      <SmsFailed/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Reaction name
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Reaction description
                    </TableCell>
                    <TableCell align="right">02/01/2021 - 14:21:36</TableCell>
                  </TableRow>
                  <TableRow key="name" >
                    <TableCell component="th" scope="row">
                      <SmsFailed/>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Reaction name
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Reaction description
                    </TableCell>
                    <TableCell align="right">02/01/2021 - 14:21:36</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        <Accordion className={ classes.box } disabled>
          <AccordionSummary
            expandIcon={ <ExpandMoreIcon /> }
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={ classes.heading }>No reactions</Typography>
          </AccordionSummary>
        </Accordion>
      </div> */}
    </Card>
  )
}

export default function Posts({ data }: { data: NonNullable<GetterData<Array<Post>>> }) {
  return (
    <Container maxWidth="md">
      <Box my={ 4 }>
        <Typography variant="h5" gutterBottom>
          { `${ data.data.length } posts found` }
        </Typography>
      </Box>
      <Box my={ 2 }>
        {data.data.map((row) => (
          <div>
            <PostComponent data={ row } />
            <br/>
          </div>
        ))}
      </Box>
    </Container>
  );
}
