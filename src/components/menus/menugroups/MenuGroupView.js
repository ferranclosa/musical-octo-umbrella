import React, { Fragment,  useState, useMemo, useEffect} from "react";

import MenuService from "../../../services/MenuService"
import { toast } from 'react-toastify'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory, useLocation } from 'react-router-dom'
import { Typography } from "@material-ui/core";


const MenuGroupView = (props) => {

  const history = useHistory()
  const location = useLocation()

  const [menuGroup, setMenuGroup] = useState(location.state)
  const [open, setOpen] =useState(true)
  const {addMenuGroupHandler} = props
      
 
 
  const handleDelete = (event) =>{
    let data = {
      id: menuGroup.id

    }
    MenuService.deleteAMenuGroup(data)
      .then(response => (response.data.returnCode == '00'
      ? (
        toast.success(response.data.returnLabel),
        history.push('/route_Z2')
        )
  : toast.warning(JSON.stringify(response.data.returnMessages))
      )).catch((e) => (
        toast.error(JSON.stringify(e))))
  }
  const handleClose = () => {
    setOpen(false)
    history.push('/route_Z2')
  }

 
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'> 
        {props.requestToDelete ? "Delete": "View"}</DialogTitle>
        <DialogContent>
            <DialogContentText >
              Details
            </DialogContentText>

            <TextField
      
      margin='dense'
      label='id'
      type='text'
      fullWidth
      name='mgCode'
      value={menuGroup.id}
      InputProps={{
        readOnly: true
      }}>
 
      </TextField>
          <TextField      
          margin='dense'
          label='Code'
          type='text'
          fullWidth
          name='mgCode'
          value={menuGroup.mgCode}
          InputProps={{
            readOnly: true
          }}>
     
          </TextField>

          <TextField
          margin='dense'
          label='Label'
          type='text'
          fullWidth
          name='mgLabel'
          value={menuGroup.mgLabel}
          InputProps={{
            readOnly: true
          }}>
          </TextField>

          <TextField
       
          margin='dense'
          label='Description'
          type='text'
          fullWidth
          name='mgDescription'
          value={menuGroup.mgDescription}
          InputProps={{
            readOnly: true
          }}>
          </TextField>

          <TextField
          
          margin='dense'
          label='Route'
          type='text'
          fullWidth
          name='mgRoute'
          value={menuGroup.mgRoute}
          InputProps={{
            readOnly: true
          }}>
          </TextField>

          <TextField
         
          margin='dense'
          label='Sort By'
          type="text"
          fullWidth
          name='mgSortBy'
          value={menuGroup.mgSortBy}
          InputProps={{
            readOnly: true
          }}>

          </TextField>
          
          <TextField
          margin='dense'
          label='Status'
          fullWidth
          type='text'
          name='mgStatus'
          value={menuGroup.mgStatus}
          InputProps={{
            readOnly: true
          }}>
          </TextField>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color='primary'>
                <Typography>Cancel</Typography>
          </Button>
          {props.requestToDelete ? 
        <Button 
        onClick={handleDelete} 
     
        color='primary'>
          <Typography>Delete</Typography>
    </Button>
    : null  
        }
          
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default MenuGroupView


