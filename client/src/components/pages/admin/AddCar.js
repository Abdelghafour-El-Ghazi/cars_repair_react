import React,{useState,useEffect} from 'react';
import  {useDispatch} from 'react-redux';
import {connect} from 'react-redux';
import { removeFeature,addItem } from "../../../actions/addcar_actions";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { addCar } from "../../../actions/user_actions";
import { listCars } from "../../../actions/user_actions";
import Typography from '@material-ui/core/Typography';


import TextField from '@material-ui/core/TextField';
import { withRouter } from "react-router-dom";







const AddCar = ({car_name,car_price,features,additionalPrice,store,addItem,removeFeature}) => {  

  const bodyFormData = new FormData();

  

  const [id,setId] = useState(0)
  const [brand,setBrand] = useState('')
  const [state,setState] = useState('')
  const [comments,setComments] = useState('')
  const [file,setFile] = useState('')
  const [image,setImage] = useState('')

  const dispatch = useDispatch()

  const handleImagenameChange = (e)=>{
    setFile(e.target.files[0].name)
    
    setImage(e.target.files)
    
  }

  const handleBrandChange = (e)=>{
    setBrand(e.target.value)
  }
  const handleStateChange = (e)=>{
    setState(e.target.value)
  }
  const handleCommentsChange = (e)=>{
    setComments(e.target.value)
  }
  const user_id = localStorage.getItem('user_id') || '' ;

  
  dispatch(listCars(user_id)).then(
    response => {
      
      const cars = response.payload.user.cars;
       const num = cars.length
      setId(num+1)


    })
  const HandleSubmit =  (e) => {
    e.preventDefault();
    const parts = []
    for (let f in features){
      parts.push(f.name)
    }
  bodyFormData.set('user_id', user_id)  
  bodyFormData.set('id', id);
  bodyFormData.set('brand', brand);
  bodyFormData.set('state', state);
  bodyFormData.set('comments', comments);
  bodyFormData.set('parts', parts);
  bodyFormData.set('additionalPrice', additionalPrice);
  bodyFormData.append('CarImage', image[0],image[0].name);

    setTimeout(() => {
      // let dataToSubmit = {
      //   id,
      //   brand,
      //   state,
      //   comments,
      //   parts,
      //   additionalPrice,
      //   file

      // };
      // console.log(bodyFormData)
      dispatch(addCar(bodyFormData))
        .then(response => {
          if (response.payload.loginSuccess) {
            setTimeout(() => {
            props.history.push("/mycars")},5000)
           
          } else {
            setTimeout(() => {
              props.history.push("/mycars")},5000)
            
          }
        })
        .catch(err => {
          
          console.log(err)
            
          
        });
      
    }, 500);
  }



  return (
    <form action='/upload' method='POST' encType='multipart/formdata'>
    <div className="boxes">
      <div className="box">
      {/* <figure className="image is-128x128">
          <img src="https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg" />
        </figure> */}
        {/* <input type="file" id="file"  /> */}
        
        <TextField
          error
          style={{margin:'10px'}}
          label="The Car Image"
          variant="outlined"
          value={file}
          
        />  
      <input className='upload' accept="image/*" name='CarImage' id="icon-button-file" onChange={handleImagenameChange}  type="file" style={{display:'none'}}/>
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>

      <TextField
          error
          style={{margin:'10px'}}
          label="Car Brand"
          variant="outlined"
          value={brand}
          onChange={handleBrandChange}
        />
        <TextField
          error
          style={{margin:'10px'}}
          label="State"
          variant="outlined"
          value={state}
          onChange={handleStateChange}
        />
        <TextField
          error
          style={{margin:'10px'}}
          label="Comments"
          variant="outlined"
          multiline
          rows={4}
          value={comments}
          onChange={handleCommentsChange}
        />
        <div className="content">
          
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
          Car Parts to repair:
            </Typography>
          {features.length ? 
            (
              <ol type="1">
                {features.map((item) => (
                  
                  <li  style={{margin:'10px'}} key={item.id}>
                    {/* <button
                      onClick={() => removeFeature(item)}
                      className="button">X
                    </button> */}
                    <Tooltip title="Remove" aria-label="add">
                  <Fab color="primary" >
                    <DeleteIcon onClick={() => removeFeature(item)} />
                  </Fab>
                </Tooltip>
                    
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    {item.name}
                </Typography>
                  </li>
                ))}
              </ol>
            ) : 
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
             You can choose items to repair 
            </Typography>
            
          }
        </div>
      </div>
      <div className="box">
        <div className="content">
        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
             Car parts
            </Typography>
          
          {store.length ? 
            (
            <ol type="1">
              {store.map((item) => {
                
                return(<li style={{margin:'10px'}} key={item.id}>
                  {/* <button
                    onClick={() => {
                      addItem(item)}}
                    className="button">Add</button> */}
                    <Tooltip title="Add" aria-label="add">
                  <Fab color="primary" >
                    <AddIcon onClick={() => {
                      addItem(item)}} />
                  </Fab>
                </Tooltip>
                  
                  <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                  {item.name} (+{item.price})
                </Typography>
                </li>)
              })}
            </ol>
            ) : 
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            Happy repairing !!
            </Typography>
          }
        </div>

        <div className="content">
        
        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
        Total Amount: ${additionalPrice}
            </Typography>
          
        
      </div>
      
      </div>
      <Button  onClick={HandleSubmit} href='/addcar' style={{margin:'10px'}} variant="contained" color="primary">
                    Add Car
                  </Button>
                  
    </div>
    </form>
  );
}


















const mapStateToProps = (state) => { 
  const {car,store,additionalPrice } = state.addcar
  return {
    car_name:car.name,
    car_price:car.price,
    features:car.features,
    store,
    additionalPrice

  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    removeFeature : (item)  => dispatch(removeFeature(item)),
    addItem : (item)  => dispatch(addItem(item))
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(AddCar);