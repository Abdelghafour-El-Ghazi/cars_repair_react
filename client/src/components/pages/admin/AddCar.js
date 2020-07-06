import React from 'react';
import {connect} from 'react-redux';
import { removeFeature,addItem } from "../../../actions/addcar_actions";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';







const AddCar = ({car_name,car_price,features,additionalPrice,store,addItem,removeFeature}) => {  
  
  return (
    <div className="boxes">
      <div className="box">
      <figure className="image is-128x128">
          <img src="https://cdn.motor1.com/images/mgl/0AN2V/s1/2019-ford-mustang-bullitt.jpg" />
        </figure>
        {/* <input type="file" id="file"  /> */}
      <input accept="image/*"  id="icon-button-file" type="file" display='none !important'/>
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>

        <h2>{car_name}</h2>
        <div className="content">
          <h2>Car Parts to repair:</h2>
          {features.length ? 
            (
              <ol type="1">
                {features.map((item) => (
                  
                  <li key={item.id}>
                    {/* <button
                      onClick={() => removeFeature(item)}
                      className="button">X
                    </button> */}
                    <Tooltip title="Remove" aria-label="add">
                  <Fab color="primary" >
                    <DeleteIcon onClick={() => removeFeature(item)} />
                  </Fab>
                </Tooltip>
                    {item.name}
                  </li>
                ))}
              </ol>
            ) : <p>You can purchase items from the store.</p>
          }
        </div>
      </div>
      <div className="box">
        <div className="content">
          <h2>Car parts</h2>
          {store.length ? 
            (
            <ol type="1">
              {store.map((item) => {
                
                return(<li key={item.id}>
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
                  {item.name} (+{item.price})
                </li>)
              })}
            </ol>
            ) : <p>Nice looking car!</p>
          }
        </div>

        <div className="content">
        <h4>
          Total Amount: ${additionalPrice}
        </h4>
      </div>
      </div>
      <Button href='/addcar' variant="contained" color="primary">
                    Add Car
                  </Button>

    </div>
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