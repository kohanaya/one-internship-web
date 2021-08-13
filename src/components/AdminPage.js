import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from "@material-ui/core/Container";
import {AppBar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    title: {
        flexGrow: 1,
    },
});

function createData(username, email, admin, action) {
    return {username, email, admin, action};
}

const rows = [
    createData('Anna', 'anna@gmail.com', 'yes', 'change password'),
    createData('Andrei', 'andrei@gmail.com','no', 'change password'),
    createData('Artem', 'artem@gmail.com', 'no', 'change password'),
];

export default function AdminPage() {
    const classes = useStyles();

    return (
        <Container fixed>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Dashboard
                    </Typography>
                    <Button color="inherit" component={Link} to={'/'}>
                        Logout
                    </Button>
                    <Button color="inherit" component={Link} to={'/dashboard'}>
                        Dashboard
                    </Button>
                </Toolbar>
            </AppBar>



            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>USERNAME</TableCell>
                            <TableCell align="left">EMAIL</TableCell>
                            <TableCell align="left">ADMIN</TableCell>
                            <TableCell align="left">ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.username}>
                                <TableCell component="th" scope="row">
                                    {row.username}
                                </TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.admin}</TableCell>
                                <TableCell align="left">
                                    <Button variant="outlined" color="primary" style={ {marginRight: '10px'} }>
                                        Change password
                                    </Button>
                                    <Button variant="outlined">
                                        Deactivate user
                                    </Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
