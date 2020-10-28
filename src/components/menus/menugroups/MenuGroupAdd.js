import React, { Fragment,  useState, useMemo} from "react";

import MenuService from "../../../services/MenuService"
import { toast } from 'react-toastify'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from '@material-ui/core/Switch'
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom'

const mgInitialState = {
  mgCode:'',
  mgDescription: '',
  mgRoute: '',
  mgActive: true,
  mgLabel: '',
  mgSortBy: ''
}
const MenuGroupAdd = (props) => {
  const [menuGroup, setMenuGroup] = useState(mgInitialState)
  const [open, setOpen] =useState(true)
  const [modified, setModified] = useState(false)
  const {addMenuGroupHandler} = props
  const history = useHistory()

  const validTypes = useMemo(
    () => [1,2,3,4,5],
    []
  )

  const handleInputChange = (event) => {
    const {name, value } = event.target;
    setMenuGroup({...menuGroup, [name]: value})
    setModified(true)
  }

  const handleSwitchChange = (event) => {
    setMenuGroup({...menuGroup, [event.target.name]: event.target.checked})
    setModified(true)
  }

  const handleAdd = (event) =>{
    addMenuGroupHandler(menuGroup)
    setModified(mgInitialState)
  }
  const handleClose = () => {
    setOpen(false)
    history.push('/route_Z2')
  }

  const saveMenuGroup = () => {
    let data = {
      mgCode: menuGroup.mgCode,
      mgDescription: menuGroup.mgDescription,
      mgRoute: menuGroup.mgRoute,
      mgSortBy: menuGroup.mgSortBy,
      mgLabel: menuGroup.mgLabel
    }
    MenuService.saveAMenuGroup(data)
      .then(response => (response.data.returnCode == '00'
      ? (
        toast.success(response.data.returnMessages[0]),
            history.push('route_Z2')
        )
  : toast.warning(JSON.stringify(response.data.returnMessages))
      )).catch((e) => (
        toast.error(JSON.stringify(e))))


  }
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'> Add a Menu Group</DialogTitle>
        <DialogContent>
            <DialogContentText >
              Fill the form and press ADD
            </DialogContentText>
          <TextField
          required
          autoFocus
          margin='dense'
          label='Code'
          placeholder='Enter a unique Uppercase letter'
          type='text'
          fullWidth
          name='mgCode'
          value={menuGroup.mgCode}
          onChange={handleInputChange}
          inputProps={{
            maxLength: 1
          }}>

          </TextField>

        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default MenuGroupAdd


