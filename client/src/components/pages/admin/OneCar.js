import React,{useState} from 'react';
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

export default function MainFeaturedPost(props) {
  const [progress, setProgress] = React.useState(10);
  const classes = useStyles();
  

  return (
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
            BMW
            </Typography>
            <Typography variant="h4" color="inherit" paragraph>
            State :  In Progress...
            </Typography>
            <Typography variant="h4" color="inherit" paragraph>
            Bill :  $2300
            </Typography>
            <Typography variant="subtitle1"  color='inherit'>
            Comments : We are working now on fixing this..
            lorem ips
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia ratione non architecto, ea modi molestiae. Facere laborum magnam molestiae placeat! Maxime eligendi accusantium assumenda, pariatur est veritatis necessitatibus accusamus cupiditate?
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
          20,
        )}%`}</Typography>
      </Box>
    </Box>
 
    </Paper>
  );
}

