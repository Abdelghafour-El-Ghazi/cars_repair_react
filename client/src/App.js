import React from 'react';
import {BrowserRouter as Router,Route}from 'react-router-dom';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import About from './components/pages/About';
import LoggedNavbar from './components/layouts/LoggedNavbar';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import AddCar from './components/pages/admin/AddCar';
import Users from './components/pages/admin/Users';
import MyCars from './components/pages/MyCars';
import User from './components/pages//admin/User';
import OneCar from './components/pages//admin/OneCar';
import CheckOut from './components/pages/checkout/CheckOut';
import Auth from "./hoc/auth";
import './App.css';



const App = ()=> {

    
    return (
        <Router>
            {/* <Navbar/> */}
            <LoggedNavbar/>
            
            
            <Route exact path="/" component={Auth(Home,null)}/>
            <Route path="/contact" component={Auth(Contact,null)}/>
            <Route path="/about" component={Auth(About,null)}/>
            <Route path="/addcar" component={Auth(AddCar,null)}/>
            <Route path="/mycars" component={Auth(MyCars,null)}/>
            <Route path="/checkout" component={Auth(CheckOut,null)}/>
            <Route path='/login' component={Auth(SignIn,null)}/>
            <Route path='/signup' component={Auth(SignUp,null)}/>
            <Route exact path='/users' component={Auth(Users,null)}/>
            <Route exact path='/onecar/:id' component={Auth(OneCar,null)}/>
            <Route path='/users/:id' component={Auth(User,null)}/>

        </Router>

        
    )
}


export default  App;