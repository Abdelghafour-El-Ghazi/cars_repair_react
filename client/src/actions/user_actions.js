import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    LIST_USERS,
    LIST_CARS,
    DELET,
    ADD_CAR

} from './types/user_types';
import { USER_SERVER } from '../Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}


export async function listUsers(){
    const request = await axios.get(`${USER_SERVER}/users`)
    .then(response => response.data)

    return {
        type: LIST_USERS,
        payload: request
    }
}
export async function listCars(id){
    const request = await axios.get(`${USER_SERVER}/users/${id}`)
    
    // .then(response => response.data)
    return {
        type: LIST_CARS,
        payload: request
    }
}
export async function delet(id){
    const request = await axios.get(`${USER_SERVER}/delete/${id}`)
    
    // .then(response => response.data)
    return {
        type: DELET,
        payload: request
    }
}




export async function addCar(dataToSubmit){
    const request = await axios({
        method: 'post',
        url: `${USER_SERVER}/addcar`,
        data: dataToSubmit,
        headers: {'Content-Type': 'multipart/form-data' }
        })
        .then(response => response.data
            )
        .catch((err) => {
            //handle error
            console.log(err);
        });
    //  await axios.post(`${USER_SERVER}/addcar`,dataToSubmit)
    

    return {
        type: ADD_CAR,
        payload: request
    }
}
