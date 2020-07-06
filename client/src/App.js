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
import './App.css';



const App = ()=> {

    
    return (
        <Router>
            {/* <Navbar/> */}
            <LoggedNavbar/>
            
            
            <Route exact path="/" component={Home}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/about" component={About}/>
            <Route path="/addcar" component={AddCar}/>
            <Route path="/mycars" component={MyCars}/>
            <Route path="/checkout" component={CheckOut}/>
            <Route path='/login' component={SignIn}/>
            <Route path='/signup' component={SignUp}/>
            <Route exact path='/users' component={Users}/>
            <Route exact path='/onecar' component={OneCar}/>
            <Route path='/users/:id' component={User}/>

        </Router>

        
    )
}


export default  App;