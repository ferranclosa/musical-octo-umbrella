import React, { Fragment,  useState, useMemo, useEffect} from "react";

import MenuService from "../../../services/MenuService"
import DataService from '../../../services/DataService'
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
import { useHistory, useLocation} from 'react-router-dom'
import { Typography } from "@material-ui/core";



const initialStatus = {
  compositeStatus: '', 
  description: '', 
  cases: ''
}

const MenuGroupEdit = (props) => {
  const history = useHistory()
  const location = useLocation()

  const [menuGroup, setMenuGroup] = useState(location.state)
  const [status, setStatus] = useState([initialStatus])
  const [open, setOpen] =useState(true)
  const [modified, setModified] = useState(false)
  const {addMenuGroupHandler} = props
 
  
  //const validStatus = useMemo(() => {

    useEffect(() => {
      DataService.getStatus()
      .then(response => (response.data.returnCode === '00'
          ? 
            setStatus(response.data.listOfDynamicStatus)
          
          : 
            setStatus([]) 
          
      ))
      .catch(e => {
        setStatus([])
      })
    }, [])
      
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

  const handleEdit = (event) =>{
    addMenuGroupHandler(menuGroup)
    //setModified(mgInitialState)
  }
  const handleClose = () => {
    setOpen(false)
    history.push('/route_Z2')
  }

  const saveMenuGroup = () => {
    let data = {
      id : menuGroup.id,
      mgCode: menuGroup.mgCode,
      mgDescription: menuGroup.mgDescription,
      mgRoute: menuGroup.mgRoute,
      mgSortBy: menuGroup.mgSortBy,
      mgLabel: menuGroup.mgLabel, 
      mgStatus: menuGroup.mgStatus

    }
    MenuService.updateAMenuGroup(data)
      .then(response => (response.data.returnCode == '00'
      ? (
        toast.success(response.data.returnLabel),
        history.push('/route_Z2')
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
        <DialogTitle id='form-dialog-title'> Edit</DialogTitle>
        <DialogContent>
            <DialogContentText >
              Fill the form and press Save
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

          <TextField
          required
          autoFocus
          margin='dense'
          label='Label'
          placeholder='The label will appear on the menu'
          type='text'
          fullWidth
          name='mgLabel'
          value={menuGroup.mgLabel}
          onChange={handleInputChange}
          inputProps={{
            maxLength: 25
          }}>
          </TextField>

          <TextField
          required
          autoFocus
          margin='dense'
          label='Description'
          placeholder='A further Description'
          type='text'
          fullWidth
          name='mgDescription'
          value={menuGroup.mgDescription}
          onChange={handleInputChange}
          inputProps={{
            maxLength: 250
          }}>
          </TextField>

          <TextField
          required
          autoFocus
          margin='dense'
          label='Route'
          placeholder='The route'
          type='text'
          fullWidth
          name='mgRoute'
          value={menuGroup.mgRoute}
          onChange={handleInputChange}
          inputProps={{
            maxLength: 20
          }}>
          </TextField>

          <TextField
          required
          autoFocus
          margin='dense'
          label='Sort By'
          placeholder='Sorting '
          select
          fullWidth
          name='mgSortBy'
          value={menuGroup.mgSortBy}
          onChange={handleInputChange}
          
          >
            {validTypes.map((digit, i) => (
              <MenuItem key={i} value={parseInt(digit)}>
                {digit}
              </MenuItem> 
            ))}
          </TextField>
          
          <TextField
          required
          margin='dense'
          label='Status'
          placeholder='Status of the record '
          select
          fullWidth
          name='mgStatus'
          value={menuGroup.mgStatus.fullStatus}
          onChange={handleInputChange}
          
          >
            {status
            .filter((statu) => (statu.cases.includes("U")))
            .map((statu, i) => (
              <MenuItem key={i} value={statu.compositeStatus}>
                {statu.description}
              </MenuItem> 
            ))}
          </TextField>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color='primary'>
                <Typography>Cancel</Typography>
          </Button>
          <Button 
              onClick={saveMenuGroup} 
              disable={!modified} 
              color='primary'>
                <Typography>Edit</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default MenuGroupEdit


