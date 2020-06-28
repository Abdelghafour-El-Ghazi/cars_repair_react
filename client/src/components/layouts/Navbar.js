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
  }));
  
  const Navbar = () => {
    const classes = useStyles();
  
    return (
      
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

    );
  }


export default  Navbar;
