import React,{useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import  image from '../../static/images/photo-1511407397940-d57f68e81203.jpg';
import { listCars } from "../../../actions/user_actions";
import { withRouter } from "react-router-dom";


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
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function createData(id, brand, state) {
  return { id, brand, state };
}


function User(props) {


  const [rows,setRows] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  window.localStorage.setItem('user_id', props.match.params.id);


useEffect( () => {
    setIsLoading(true);
   
    dispatch(listCars(props.match.params.id)).then(
      response => {
        
        const cars = response.payload.user.cars;
        console.log(cars)
        
        const rowsArray = cars.map(car=>{
          return createData(car.id,car.brand,car.state)
        })
        rows.sort((a, b) => (a.id < b.id ? -1 : 1));
        
        setRows(rowsArray)
        setIsLoading(false);
      }
      
    
    
    )
    
  
}, [])

  const classes = useStyles();
  
  
  return (
    rows.length ? (
      
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          {rows.map( (row) => (
            <Grid item key='4' xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={image}
                    title="Image title"
                  />
                  
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {row.brand}
                    </Typography>
                    <Typography>
                      {row.state}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={()=>props.history.push(`/onecar/${row.id}`)}>
                      Details
                      
                    </Button>
                   
                  </CardActions>
                </Card>
              </Grid>
        
        ))}
              
            
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  ) : (<div> Loading </div> )
  )
}

export default withRouter(User);