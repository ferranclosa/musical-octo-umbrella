import React, { useState, useContext, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { AuthContext } from '../shared/context/AuthContext';
import auth from '../auth/auth-helper';
import AuthService from '../../services/AuthService';
import { toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://hsbc.com/">
        HSBC Bank
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  let history = useHistory();
  const [errors, setErrors] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  const [modified, setModified] = useState(false);
  const [open, setOpen] = useState(true);
  const [roles, setRoles] = useState([]);
  const [validEmail, setValidEmail] = useState(false);
  const [credentials, setCredentials] = useState({
    connectionId: ' ',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    requestedRole: '',
  });

  const handleSignUp = event => {
    event.preventDefault();
    register(credentials);
  };
  const register = credentials => {
    setErrors([])
    AuthService.register(credentials).then(response =>
      response.data.returnCode === '00'
        ? (auth.authenticate(response.data.jwttoken),
          setUser({ ...user, currentUser: sessionStorage.getItem('currentItem'), loggedIn: true }),
          history.push('/'))
        : (toast.error(response.data.returnLabel),
          setErrors(response.data.returnMessages),
          errors.map((one, i) => toast.error(one)))
    );
  };

  const ValidateEmail = event => {
    let candidateEmail = event.target.value.trim()
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(candidateEmail)) {
      setValidEmail(true);
    } else setValidEmail(false);
  };

  const handleInputChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
    setModified(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getRoles = useMemo(() => {
    AuthService.getRoles()
      .then(response => (response.data.returnCode === '00' ? setRoles(response.data.roleList) : toast.warning(response.data.returnLabel)))
      .catch(e => {
        setRoles([]);
      });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                autoFocus
                fullWidth
                id="connectionId"
                label="Connection Id"
                name="connectionId"
                type="text"
                value={credentials.connectionId}
                onChange={handleInputChange}
                onBlur={ValidateEmail}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </Grid>
            {validEmail == true ? (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                  <Checkbox 
                  value="emailIsConnectionId" 
                  color="primary" />}
                  label="ConnectionId and email are the same."
                />
              </Grid>
            ) : null}

            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth 
              id="email" label="Email Address" 
              name="email" 
              value={credentials.email}
              onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="firstName" 
              variant="outlined" 
              fullWidth 
              id="firstName" 
              label="First Name"
              value={credentials.firstName} 
              onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Name (last or Company)"
                name="lastName"
                value={credentials.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required 
              label="Profile Type" 
              select 
              fullWidth 
              name="requestedRole" 
              value={credentials.requestedRole}
              onChange={handleInputChange}>
                {roles
                  .filter(role => role.roleStatus.statusCode == 'A')
                  .filter(role => role.roleCodeNumber <= 60)
                  .map((role, i) => (
                    <MenuItem key={i} value={role.roleCode}>
                      ({role.roleCode}) {role.roleDescription}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleSignUp}>
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
