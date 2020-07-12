import React,{useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import CardMedia from '@material-ui/core/CardMedia';
import  image from '../../static/images/photo-1511407397940-d57f68e81203.jpg';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import { listCars } from "../../../actions/user_actions";




import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  colorPrimary: {
    backgroundColor: '#00695C',
  },
  barColorPrimary: {
    backgroundColor: '#B2DFDB',
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    height:'100vh',
    
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

const OneCar = (props) =>  {
  const [progress, setProgress] = React.useState(10);
  const classes = useStyles();
  const [rows,setRows] = useState([]);
  const [car,setCar] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user_id = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : ''

  const id =  props.match.params.id


useEffect( () => {
    setIsLoading(true);

    if(user_id){
      dispatch(listCars(user_id)).then(
        response => {
          
          // const cars = response.payload.user.cars;
          console.log(response.payload)
          const car = cars.filter((car) => car.id == id )
          console.log(car[0])
          setCar(car[0])
          setProgress(car[0].progress)
          setIsLoading(false)

    }
   
    
    
  
)}else{
  alert("You have to go from the user page and click on the car you want")
      
}
}
, [])


  return (
    !isLoading ? (
    <Paper className={classes.mainFeaturedPost} >
      {/* Increase the priority of the hero background image */}
      
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
          <figure className="image is-280x280">
          <img src="https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg" />
        </figure>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            {car.brand}
            </Typography>
            <Typography variant="h4" color="inherit" paragraph>
            State :  {car.state}
            </Typography>
            <Typography variant="h4" color="inherit" paragraph>
            Bill :  {car.price}
            </Typography>
            <Typography variant="subtitle1"  color='inherit'>
            Comments : {car.comments}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
             
            >
              Payment
            </Button>
          </div>
        </Grid>
      </Grid>
      <Box display="flex" alignItems="center" value={progress}>
      <Box width="100%" mr={1}>
        <LinearProgress   variant="indeterminate" value ={10} classes={{colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary}}/>
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color='inherit'>{`${Math.round(
          progress,
        )}%`}</Typography>
      </Box>
    </Box>
 
    </Paper>
  ) : (<h1>Loading...</h1>)
  )
        }

export default withRouter(OneCar);