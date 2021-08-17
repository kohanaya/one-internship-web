import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import { AppBar } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    flexGrow: 1,
  },
})

export default function AdminPage () {
  const classes = useStyles()
  const [changePassOpen, setChangePassOpen] = React.useState(false)
  const [changeDeactivateOpen, setDeactivateOpen] = React.useState(false)
  const [error, setError] = React.useState('')
  const [users, setUsers] = React.useState([])

  // edit password
  const [userEdit, setUserEdit] = React.useState()
  const [newPassword, setNewPassword] = React.useState()

  function refreshData () {
    axios.get('/api/users')
      .then(result => {
        setUsers(result.data)
      })
  }

  useEffect(() => {
    refreshData()
  }, [])

  const handleChangePassBtn = (user) => {
    setUserEdit(user)
    setChangePassOpen(true)
  }

  const handleChangePassClose = (save) => {
    if (save) {
      axios.post('/api/users/password', { userId: userEdit.id, newPassword: newPassword })
        .then(() => {
          setChangePassOpen(false)
          setNewPassword('')
        })
        .catch(() => {
          setError('Something went wrong.')
        })
    } else {
      setChangePassOpen(false)
      setNewPassword('')
    }
  }

  const handleDeactivateBtn = (user) => {
    setUserEdit(user)
    setDeactivateOpen(true)
  }

  const handleDeactivateClose = (save) => {
    if (save) {
      axios.post('/api/users/' + userEdit.id + '/enableDisable')
        .then(() => {
          setDeactivateOpen(false)
          refreshData()
        })
    } else {
      setDeactivateOpen(false)
    }
  }

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
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>USERNAME</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Active</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.username}>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="left">{row.admin ? 'Admin' : 'User'}</TableCell>
                <TableCell align="left">{row.enabled ? 'Enabled' : 'Disabled'}</TableCell>
                <TableCell align="left">
                  <Button variant="outlined" onClick={() => handleChangePassBtn(row)} color="primary"
                          style={{ marginRight: '10px' }}>
                    Change password
                  </Button>
                  <Button variant="outlined" onClick={() => handleDeactivateBtn(row)}>
                    {row.enabled ? 'deactivate' : 'activate'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Dialog
        open={changePassOpen}
        onClose={handleChangePassClose}
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to change the password?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The password will be changed permanently
          </DialogContentText>
          <Typography color="error">
            {error}
          </Typography>
          <TextField
            id="text"
            label="User password"
            type="password"
            variant="outlined"
            fullWidth
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleChangePassClose(true)} color="secondary">
            Change
          </Button>
          <Button onClick={() => handleChangePassClose(false)} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={changeDeactivateOpen}
        onClose={handleDeactivateClose}
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to change account status?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {userEdit && userEdit.enabled
              ? 'That user will no longer be active'
              : 'That user will be active'
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeactivateClose(true)} color="secondary">
            {userEdit && userEdit.enabled ? 'deactivate' : 'activate'}
          </Button>
          <Button onClick={() => handleDeactivateClose(false)} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>

  )
}
