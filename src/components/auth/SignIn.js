import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  let history = useHistory();
  const { user, setUser } = useContext(AuthContext);
  const [modified, setModified] = useState(false);
  const [open, setOpen] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const [credentials, setCredentials] = useState({
    username: localStorage.getItem('connectionId') !== '' ? localStorage.getItem('connectionId') : '',
    password: localStorage.getItem('password') !== '' ? localStorage.getItem('password') : '',
  });

  useEffect(() => {
    if (localStorage.getItem('rememberMeChecked') == true) {
      setCredentials({...credentials,
         username : localStorage.getItem('connectionId'), 
      password : localStorage.getItem('password')})
      setRememberMe(true)
      setModified(true)
    }
  }, []);

  const handleSignIn = event => {
    event.preventDefault();
    login(credentials);
    if (rememberMe) {
      localStorage.setItem('connectionId', credentials.username);
      localStorage.setItem('password', credentials.password);
      localStorage.setItem('rememberMeChecked', true);
    }
  };

  const handleRememberMe = event => {
    if (event.target.checked) {
      setRememberMe(true);
    } else {
      setRememberMe(false);
      localStorage.removeItem('connectionId');
      localStorage.removeItem('password');
      localStorage.setItem('rememberMeChecked', false);
    }
  };

  const login = credentials => {
    AuthService.signIn(credentials)
    .then(response =>  response.data.returnCode === '00'
        ? (auth.authenticate(response.data.jwttoken),
          setUser({ ...user, currentUser: sessionStorage.getItem('currentItem'), loggedIn: true }),
          history.push('/'))
        : toast.error(response.data.returnLabel)
    );
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="connectionId"
            label="Connection Id"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            autoComplete="connectionId"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={credentials.password}
            autoComplete="current-password"
            onChange={handleInputChange}
          />
          <FormControlLabel control={
          <Checkbox  
                    color="primary" 
                    onChange={handleRememberMe}
                    checked={rememberMe}
   />} label="Remember me" />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!modified}
            className={classes.submit}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                Don't you have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
