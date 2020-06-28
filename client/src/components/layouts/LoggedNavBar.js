import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import LocalCarWashIcon from '@material-ui/icons/LocalCarWash';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';





  const useStyles = makeStyles((theme) => ({
    icon:{
      fontSize:60,
    },
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      flexGrow: 1,
      paddingBottom:'6px',
    },
    menuHome: {
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(2),
      
      
    },
    
    title: {
      flexGrow: 1,
      
    },
    MenuLog:{
      color:'black',
      display:'inline',
      
    }
  }));
  
  
  const LogNavbar = () => {
    const classes = useStyles();
    const auth = true;
    

  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    
  
   return (auth ? (
      
      <div  >
        <AppBar   className={classes.root} position="static">
        
          <Toolbar >
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Box >
            
             
            <Typography variant="h2" >
            <Link to='/' ><LocalCarWashIcon className={classes.icon} /></Link>

            <Link to='/' ><Box fontWeight="fontWeightBold" m={0.4}>TheCar </Box></Link>
            </Typography>
            
            </Box>
            <Box   >
            <Link to='/' ><Button  className={classes.menuHome} size="large" color="inherit">Home</Button></Link>
            <Link to='/mycars' ><Button  className={classes.menuHome} size="large" color="inherit">My Cars</Button></Link>
            </Box>
            <Box  className={classes.menuAccount}>
            {/* <Link to='/login'><Button className={classes.menuHome} fullWidth={true} color="inherit">Profile</Button> </Link> */}
            {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <Link to='/' ><MenuItem onClick={handleClose} className={classes.MenuLog} > Profile </MenuItem></Link>
                <Link to='/' ><MenuItem onClick={handleClose} className={classes.MenuLog}>Logout</MenuItem></Link>
              </Menu>
            </div>
          )}
            </Box>

            </Grid>
          </Toolbar>
          
        </AppBar>
      </div>

    ) : (
      
      <div  >
        <AppBar   className={classes.root} position="static">
        
          <Toolbar >
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Box >
            
             
            <Typography variant="h2" >
            <Link to='/' ><LocalCarWashIcon className={classes.icon} /></Link>

            <Link to='/' ><Box fontWeight="fontWeightBold" m={0.4}>TheCar </Box></Link>
            </Typography>
            
            </Box>
            <Box   >
            <Link to='/' ><Button className={classes.menuHome} size="large" color="inherit">Home</Button></Link>
            <Link to='/about' ><Button className={classes.menuHome} size="large" color="inherit">About</Button></Link>
            <Link to='/contact' ><Button className={classes.menuHome} size="large" color="inherit">Contact</Button></Link>
            </Box>
            <Box  className={classes.menuAccount}>
            <Link to='/login'><Button className={classes.menuHome} fullWidth={true} color="inherit">SignIn</Button> </Link>
            <Link to='/signup'><Button className={classes.menuHome} fullWidth={true} color="inherit">SignUp</Button> </Link>
            </Box>

            </Grid>
          </Toolbar>
          
        </AppBar>
      </div>
    ) )
  }
  


export default  LogNavbar;