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
      paddingBottom:'10px',
    },
    menuHome: {
      marginRight: theme.spacing(6),
      marginLeft: theme.spacing(6),
      
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

            <Link to='/' ><Box fontWeight="fontWeightBold" m={1}>TheCar </Box></Link>
            </Typography>
            
            </Box>
            <Box   >
            <Button className={classes.menuHome} size="large" color="inherit"><Link to='/' >Home</Link></Button>
            <Button  className={classes.menuHome} color="inherit"><Link to='/about'>About</Link></Button>
            <Button className={classes.menuHome} color="inherit"><Link to='/contact'>Contact</Link></Button>
            </Box>
            <Box  className={classes.menuAccount}>
            <Button fullWidth={true} color="inherit"><Link to='/login'>SignIn</Link></Button>
            <Button fullWidth={true} color="inherit"><Link to='/signup'>SignUp</Link></Button>
            </Box>

            </Grid>
          </Toolbar>
          
        </AppBar>
      </div>

    );
  }


export default  Navbar;
