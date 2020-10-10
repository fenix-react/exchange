import React, { Component } from 'react';

import './App.css';
import { Switch, Route} from 'react-router-dom'
import Login from './Containers/Login/Login'
import Register from './Containers/Register/Register'
import Home from './Containers/Home/Home'
import {connect} from 'react-redux'

import TwoFA from './Containers/TwoFA/TwoFA'
import TwoFALogin from './Containers/TwoFA/TwoFAlogin'
import * as actions from './Redux/Actions/AuthActions'
import M from 'materialize-css'


M.AutoInit()

class App extends Component {

   
    componentDidMount() {
        this.props.checkLoginStatus()
    }

    render() {
     
        
    
    

    return (
                <div className="App">
                    <Switch>
                        <Route exact path='/' component={Login}></Route>
                        <Route exact path='/register' component={Register}></Route>
                        <Route path='/home' component={Home}></Route>
                        <Route path='/2fa' component={TwoFA}></Route>
                        <Route path='/login' component={TwoFALogin}></Route>
                    </Switch>
                </div>
    )
}
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkLoginStatus: ()=>dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
