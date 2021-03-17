import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Following from "./Following"
import Typography from "@material-ui/core/Typography";
import {Avatar} from "@material-ui/core";

let jessy = {
    'firstName': 'Jessy',
    'lastName': 'SOBREIRO',
    'email': 'jessy.sobreiro@epitech.eu',
    'username': 'jess_sys',
    'phoneNumber': '+33 6 59 28 15 37',
    'birthday': '1998-11-17',
    'nickname': 'M. Jessy SOBREIRO',
    'creationDate': '2014-04-02',
    'gender': 'Male',
    'profilePicture': 'https://pbs.twimg.com/profile_images/888475149846106113/ddRQCpDE.jpg'
}

let clovis = {
    'firstName': 'Clovis',
    'lastName': 'ROUX DE VILLARS',
    'email': 'clovis.roux-de-villars@epitech.eu',
    'username': 'Xelorion',
    'phoneNumber': '+33 6 69 69 69 69',
    'birthday': '1989-04-21',
    'nickname': 'M. Clovis De Villars',
    'creationDate': '2012-09-02',
    'gender': 'Male',
    'profilePicture': ''
}

let profiles: { firstName: string; lastName: string; email: string; username: string; phoneNumber: string; birthday: string; nickname: string; creationDate: string; gender: string; profilePicture: string; }[] = [];

profiles.push(jessy)
profiles.push(clovis)

const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

function handleClick(setOpen: any, profile: any, setProfile: any) {
    setProfile(profile)
    setOpen(true);
    return profile;
}

export default function App() {
    const classes = useStyles();
    let [open, setOpen] = React.useState(false)
    let [profile, setProfile] = React.useState({});

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Contact list
                </Typography>
            </Box>
            <Following state={[open, setOpen]} profile={jessy}/>
            <Box my={2}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Picture</StyledTableCell>
                                <StyledTableCell>First name</StyledTableCell>
                                <StyledTableCell>Last name</StyledTableCell>
                                <StyledTableCell>Username</StyledTableCell>
                                <StyledTableCell>E-mail</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {profiles.map((row) => (
                                <StyledTableRow key={row.nickname}>
                                    <TableCell onClick={() => handleClick(setOpen, row, setProfile)} component="th" scope="row">
                                        <Avatar alt={row.firstName} src={row.profilePicture}>
                                            {row.firstName.charAt(0)}
                                            {row.lastName.charAt(0)}
                                        </Avatar>
                                    </TableCell>
                                    <TableCell onClick={() => handleClick(setOpen, row, setProfile)} component="th" scope="row">
                                        {row.firstName}
                                    </TableCell>
                                    <TableCell onClick={() => handleClick(setOpen, row, setProfile)} component="th" scope="row">
                                        {row.lastName}
                                    </TableCell>
                                    <TableCell onClick={() => handleClick(setOpen, row, setProfile)} component="th" scope="row">
                                        {row.username}
                                    </TableCell>
                                    <TableCell onClick={() => handleClick(setOpen, row, setProfile)} component="th" scope="row">
                                        {row.email}
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}
