import React from 'react';
import {BrowserRouter as Router,Route}from 'react-router-dom';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import About from './components/pages/About';
import Navbar from './components/layouts/Navbar';
import LoggedNavbar from './components/layouts/LoggedNavbar';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import AddCar from './components/pages/AddCar';
import MyCars from './components/pages/MyCars';
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
            <Route path='/login' component={SignIn}/>
            <Route path='/signup' component={SignUp}/>
        </Router>

        
    )
}


export default  App;