import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import cover from '../media/cover.jpg';
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/user_actions";
import { withRouter } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

const Transition = (props)  => {
  return <Slide {...props} direction="left" />;
}

const TransitionValid = (props)  => {
  return <Slide {...props} direction="left" />;
}


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${cover})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
}));

const  SignIn =  (props) => {
  const dispatch = useDispatch();
  
  const classes = useStyles();
  
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;


  const [open, setOpen] = useState(false);
  const [openValid, setOpenValid] = useState(false);
  const [message,setMessage] = useState('Connected')


  const [isSubmitting,setSubmitting] = useState(false)
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  const [email,setEmail] = useState(initialEmail)
  const [password,setPassword] = useState('')

 
    
  
  

  const handleEmailChange = (e)=>{
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e)=>{
    setPassword(e.target.value)
  }

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      let dataToSubmit = {
        email,
        password
      };

      dispatch(loginUser(dataToSubmit))
        .then(response => {
          if (response.payload.loginSuccess) {
            window.localStorage.setItem('userId', response.payload.userId);
            if (rememberMe === true) {
              window.localStorage.setItem('rememberMe', email);
            } else {
              localStorage.removeItem('rememberMe');
            }
            setMessage(response.payload.message)
            setOpenValid(true)
            setTimeout(() => {setOpenValid(false);
            setSubmitting(false);
            props.history.push("/mycars")},5000)
           
          } else {
            setMessage(response.payload.message)
            setOpen(true);
            setTimeout(() => setOpen(false),5000);
            setSubmitting(false);
            
          }
        })
        .catch(err => {
          
          console.log(err)
            
          
        });
      
    }, 500);
    
  }
  

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
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
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" checked={rememberMe} color="primary" onChange={handleRememberMe} />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              
              disabled={isSubmitting}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      <Snackbar
        open={open}
        // onClose={handleClose}
        TransitionComponent={Transition}
        message={message}
        key={'Transition'}
      />
      <Snackbar
        open={openValid}
        // onClose={handleClose}
        TransitionComponent={TransitionValid}
        message={message}
        key={'TransitionValid'}
      />
    </Grid>
  );
}

export default withRouter(SignIn);