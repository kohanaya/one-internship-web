import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

const filter = createFilterOptions()

function EditNoteModal ({ note, open, handleClose, categories }) {

  const [noteId, setNoteId] = React.useState()
  const [noteText, setNoteText] = React.useState()
  const [category, setCategory] = React.useState()
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    if (!note) {
      note = { id: null, category: null, note: '' }
    }
    setNoteId(note.id)
    setNoteText(note.note)
    setCategory({ name: note.categoryName })
  }, [note])

  const handleEditClose = () => {
    setError('')
    handleClose(false)
  }

  const handleSave = (e) => {
    e.preventDefault()

    if (!noteText || !category.name) {
      setError('Note text and category required.')
      return
    }

    axios.post('/api/notes', {
      noteId: noteId,
      note: noteText,
      categoryName: category.name
    }).then((response) => {
      handleClose(true)
    }).catch((error) => {
      if (error.response) {
        setError(error.response.data.msg)
      } else {
        setError('Cannot save note.')
      }
    })
  }

  return (
    <Dialog open={open} onClose={handleEditClose}>
      <DialogTitle id="form-dialog-title">Create/Update Note</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter note text below:
        </DialogContentText>

        <Typography color="error">
          {error}
        </Typography>

        <Autocomplete
          value={category}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              setCategory({
                name: newValue,
              })
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setCategory({
                name: newValue.inputValue,
              })
            } else {
              setCategory(newValue)
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params)

            // Suggest the creation of a new value
            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
              })
            }

            return filtered
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="free-solo-with-text-demo"
          options={categories}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue
            }
            // Regular option
            return option.name
          }}
          renderOption={(option) => option.name}
          style={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Choose or create a new category" variant="outlined"/>
          )}
        />
        <br/>
        <TextField
          id="text"
          label="Note text"
          type="text"
          variant="outlined"
          fullWidth
          multiline
          maxRows={4}
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Add/Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditNoteModal