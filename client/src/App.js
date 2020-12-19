import './App.css';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './components/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import {BrowserRouter,Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './Store'
 import React, { Component } from 'react'
 
 class App extends Component {
   render() {
     return (
      <Provider store = {store}>
    <BrowserRouter>
    <div className="App">
      
<Navbar></Navbar>
<Route exact path='/' component={Landing}/>
<Route exact path='/landing' component={Landing}/>

<div className="container" >
<Route path="/login" component={Login}/>
<Route path="/register" component={Register}/>
</div>

<Footer></Footer>

    </div>
    </BrowserRouter>
    </Provider>
     )
   }
 }
 



export default App;
