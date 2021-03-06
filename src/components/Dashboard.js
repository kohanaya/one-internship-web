import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { Link } from 'react-router-dom'
import { TextField } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditNoteModal from './EditNoteModal'
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
}))

function Dashboard () {
  const classes = useStyles()

  const [page, setPage] = React.useState(1)

  // filters:
  const [categoryValue, setCategoryValue] = React.useState('')
  const [searchValue, setSearchValue] = React.useState('')

  const [notes, setNotes] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [noteIdToDelete, setNoteIdToDelete] = React.useState()
  const [editOpen, setEditOpen] = React.useState(false)
  const [editNote, setEditNote] = React.useState()

  const auth = useAuth()

  const refreshData = () => {
    axios.get('/api/notes', {
      params: {
        noteContains: searchValue,
        categoryId: categoryValue,
        page: page
      }
    })
      .then(result => {
        setNotes(result.data)
      })
    axios.get('/api/categories')
      .then(result => {
        setCategories(result.data)
      })
  }

  useEffect(() => {
    refreshData()
  }, [categoryValue, searchValue, page])

  const handleSearchUpdate = (event) => {
    let newVal = event.target.value
    console.log(newVal)
    setSearchValue(newVal)
  }

  const handleCategoryChange = (event) => {
    let newVal = event.target.value
    if (!newVal) setCategoryValue('')
    else setCategoryValue(parseInt(newVal))
  }

  const handleDeleteBtn = (note) => {
    setNoteIdToDelete(note.id)
  }

  const handleDeleteClose = (remove) => {
    if (remove) {
      axios.delete('/api/notes/' + noteIdToDelete)
        .then(() => {
          setNoteIdToDelete(null)
          refreshData()
        })
    } else {
      setNoteIdToDelete(null)
    }
  }

  const handleEditBtn = (note) => {
    setEditNote(note)
    setEditOpen(true)
  }

  const handleEditClose = (reload) => {
    // reload list of notes
    if (reload) {
      refreshData()
    }
    setEditOpen(false)
  }

  const handleEditSave = () => setEditOpen(false)

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

          {auth.user.admin && (
            <Button color="inherit" component={Link} to="/admin">
              ADMIN
            </Button>
          )}

        </Toolbar>
      </AppBar>

      <Grid container spacing={4}>
        <Grid item xs={6} md={8}>

          <Typography variant="h6" className={classes.title} style={{ marginTop: '20px' }}>
            My Notes:
          </Typography>

          <Grid container>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Note search" variant="outlined"
                fullWidth
                onChange={handleSearchUpdate}
              />
            </form>

            &nbsp;

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
                    secondary={note.categoryName}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleDeleteBtn(note)}>
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
              <RadioGroup name="category" value={categoryValue} onChange={handleCategoryChange}>
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
        {page !== 1 &&
        <Button variant="contained" style={{ marginRight: '10px' }} onClick={() => setPage(page - 1)}>
          Previous Page
        </Button>
        }

        <Typography style={{ marginRight: '10px', marginLeft: '10px'}}>
          {page}
        </Typography>

        {notes.length === 5 &&
        <Button variant="contained"
                color="primary"
                onClick={() => setPage(page + 1)}>
          Next Page
        </Button>
        }

      </Box>

      <Dialog
        open={!!noteIdToDelete}
        onClose={handleDeleteClose}
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure want to delete?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This note will be deleted permanently. You sure want to delete it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeleteClose(true)} color="secondary">
            Delete
          </Button>
          <Button onClick={() => handleDeleteClose(false)} color="primary" autoFocus>
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
  )
}

export default Dashboard
