import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

function EditNoteModal({note, open, handleClose, categories}) {

    const [noteId, setNoteId] = React.useState(note.id);
    const [noteText, setNoteText] = React.useState(note.text);
    const [value, setValue] = React.useState(note.category);

    React.useEffect(() => {
        setNoteId(note.id);
        setNoteText(note.text);
        setValue(note.category);
    }, [note]);

    const handleEditClose = () => {
        handleClose();
    }

    const handleSave = () => {
        // save
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="form-dialog-title">Create/Update Note</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter note text below:
                </DialogContentText>
                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setValue({
                                name: newValue,
                            });
                        } else if (newValue && newValue.inputValue) {
                            // Create a new value from the user input
                            setValue({
                                name: newValue.inputValue,
                            });
                        } else {
                            setValue(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        // Suggest the creation of a new value
                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                name: `Add "${params.inputValue}"`,
                            });
                        }

                        return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free-solo-with-text-demo"
                    options={categories}
                    getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === 'string') {
                            return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        // Regular option
                        return option.name;
                    }}
                    renderOption={(option) => option.name}
                    style={{width: 300}}
                    freeSolo
                    renderInput={(params) => (
                        <TextField {...params} label="Free solo with text demo" variant="outlined"/>
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
    );
}

export default EditNoteModal;