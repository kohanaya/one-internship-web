import React, { useEffect } from 'react'
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {Link} from 'react-router-dom';
import {TextField} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditNoteModal from "./EditNoteModal";
import { useAuth } from './use-auth'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    rootForFilters: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3)
    },
}));

function Dashboard() {
    const classes = useStyles();
    const [secondary, setSecondary] = React.useState(false);
    const [categoryValue, setCategoryValue] = React.useState('');
    const [notes, setNotes] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const auth = useAuth();

    useEffect(async () => {
        const result = await axios.get('/api/notes');
        setNotes(result.data);
    }, []);

    useEffect(async () => {
        const result = await axios.get('/api/categories');
        setCategories(result.data);
    }, []);

    // modal
    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);
    const [editNote, setEditNote] = React.useState({id: null, categoryId: null, text: ''});


    const handleChange = (event) => {
        let newVal = event.target.value;
        if (!newVal) setCategoryValue("");
        else setCategoryValue(parseInt(newVal));
    };

    const handleDeleteBtn = () => setDeleteOpen(true);
    const handleDeleteClose = () => setDeleteOpen(false);
    const handleEditBtn = (note) => {
        setEditNote(note);
        setEditOpen(true);
        setEditOpen(true);
    }
    const handleEditClose = () => setEditOpen(false);
    const handleEditSave = () => setEditOpen(false);

    return (
        <Container fixed>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Dashboard
                    </Typography>
                    <Button color="inherit" onClick={auth.logout}>
                        Logout
                    </Button>
                    <Button color="inherit" component={Link} to={'/admin'}>
                        ADMIN
                    </Button>
                </Toolbar>
            </AppBar>

            <Grid container spacing={4}>
                <Grid item xs={6} md={8}>

                    <Typography variant="h6" className={classes.title} style={ {marginTop: '20px'}}>
                        My Notes:
                    </Typography>

                    <Grid container>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField id="outlined-basic" label="Note search" variant="outlined"/>
                        </form>

                        <Button variant="contained" color="secondary"
                                onClick={handleEditBtn}>
                            Add a new note
                        </Button>
                    </Grid>

                    <div className={classes.demo}>
                        {notes.length === 0 ? <div>No notes.</div> : null}
                        <List dense={false}>
                            {notes.map(note => (
                                <ListItem key={note.id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={note.note}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" onClick={handleDeleteBtn}>
                                            <DeleteIcon/>
                                        </IconButton>
                                        <IconButton edge="end" onClick={() => handleEditBtn(note)}>
                                            <EditIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Grid>

                <Grid item xs={6} md={4}>
                    <Typography variant="h6" className={classes.title} align="left">
                        Categories
                    </Typography>

                    <div className={classes.rootForFilters}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Choose one</FormLabel>
                            <RadioGroup name="category" value={categoryValue} onChange={handleChange}>
                                <FormControlLabel value="" control={<Radio/>} label="All"/>
                                {categories.map(category => (
                                    <FormControlLabel
                                        key={category.id}
                                        value={category.id}
                                        control={<Radio/>}
                                        label={category.name}/>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                </Grid>
            </Grid>

            <Box mt={6}>
                <Button variant="contained" style={ { marginRight: '10px'}}>
                    Previous Page
                </Button>
                <Button variant="contained"
                        color="primary">
                    Next Page
                </Button>

            </Box>

            <Dialog
                open={deleteOpen}
                onClose={handleDeleteClose}
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure want to delete?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This note will be deleted permanently. You sure want to delete it?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="secondary">
                        Delete
                    </Button>
                    <Button onClick={handleDeleteClose} color="primary" autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <EditNoteModal
                note={editNote}
                open={editOpen}
                handleClose={handleEditClose}
                handleSave={handleEditSave}
                categories={categories}
            />
        </Container>
    );
}

export default Dashboard;
