import {
    REMOVE_ITEM,
    ADD_ITEM,
} from './types/addcar_types';


const removeFeature = (item) => {
    return { type: REMOVE_ITEM, item }
  }
  
const addItem = (item) => {
    return { type: ADD_ITEM, item }
  }


export {removeFeature,addItem};