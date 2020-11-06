import React, { Fragment, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import ToolTip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { toast } from 'react-toastify'
import { useHistory, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'


const useToolBarStyles = makeStyles(theme => ({
    
    root:{
    paddingLeft:theme.spacing(2), 
        paddingRight: theme.spacing(1),
    },
    title:{
        flex: '1 1 100%',
    }
}))

const FootBar = (props) => {
    const classes = useToolBarStyles()
    let history = useHistory()
    let location = useLocation()
    const [currentItem, setCurrentItem ] = useState()

    useEffect(() => {
        setCurrentItem(props.currentItem)
        
    }, [props])

    const handleAdd = (e) => {
        e.preventDefault()
        props.addHandler(currentItem)
    }

    const handleBack = (e) => {
        e.preventDefault()
        props.handleBack()
    }

    return (
        <Fragment>
            <Grid container justify='flex-start' spacing={1}>
                {props.backHandler ?
                <Grid item >
                <ToolTip title='Back'>
                    <IconButton 
                    aria-label='back'
                    onClick={handleBack} >
                    <Typography className= {classes.title}> Back </Typography>
                    <ArrowBackIcon />
                    
                    </IconButton>
                </ToolTip>
            </Grid>
            : null}
 
                <Grid item >
                <ToolTip title='Add'>
                    <IconButton 
                    aria-label='add'
                    onClick={handleAdd} >
                    <Typography className= {classes.title}> Add </Typography>
                    <AddIcon />
                    
                    </IconButton>
                </ToolTip>
            </Grid>
            
                
            </Grid>
        </Fragment>
    )
}

export default FootBar