import React from 'react';
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
        margin: theme.spacing(3),
    },
}));

function Dashboard() {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [value, setValue] = React.useState('female');
    const [notes, setNotes] = React.useState([
        {
            id: 1,
            category: {id: 1, name: "personal"},
            text: "hello world"
        },
        {
            id: 2,
            category: {id: 1, name: "personal"},
            text: "aloha"
        }
    ]);
    const [categories, setCategories] = React.useState([
        {id: 1, name: "personal"},
        {id: 2, name: "work"}
    ]);

    const handleChange = (event) => {
        let newVal = event.target.value;
        if (!newVal) setValue("");
        else setValue(parseInt(newVal));
    };

    return (
        <Container fixed>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Dashboard
                    </Typography>
                    <Button color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>

            <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Categories
                    </Typography>

                <div className={classes.rootForFilters}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Choose one</FormLabel>
                        <RadioGroup name="category" value={value} onChange={handleChange}>
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

            <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                    My Notes:
                </Typography>

                <div className={classes.demo}>
                    {notes.length === 0 ? <div>No notes.</div> : null}

                    <List dense={dense}>
                        {notes.map(note => (
                            <ListItem key={note.id}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={note.text}
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon/>
                                    </IconButton>
                                    <IconButton edge="end" aria-label="edit">
                                        <EditIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Grid>

            <Box mt={3}>

                <Button variant="contained">
                    Previous Page
                </Button>
                <Button variant="contained"
                        color="primary">
                    Next Page
                </Button>

            </Box>
        </Container>
    );
}


export default Dashboard;