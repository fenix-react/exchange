import React, {Component} from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import {Route,Redirect} from 'react-router-dom'
import Settings from '../../Containers/Settings/Settings'
import UserInfo from '../../Containers/UserInfo/UserInfo'
import classes from './Home.module.css'
import {connect} from 'react-redux'
import * as actions from '../../Redux/Actions/UiActions'
import BankAccounts from '../BankAccounts/BankAccounts'
import Modal from '../../Components/Modal/Modal'
import EhrazHoviat from '../EhrazHoviat/EhrazHoviat'

class Home extends Component {

    state = {
        showSidebar: false
    }

  
    render() {

        let redirect=null

        if((!this.props.token && !localStorage.getItem('accessToken')) || (!this.props.validated2fa && !localStorage.getItem('validated'))){
            redirect= <Redirect to='/'></Redirect>
        }
        let modal = null
        if(this.props.userw === 'w0') {
             modal=<Modal></Modal>
        }

        return (
            <div className={this.props.togglee ? classes.dark : classes.light}>
                {modal}
                <Navbar click={()=>{this.props.toggle()}} click2={()=>{this.props.toggle()}}></Navbar>
                <button onClick={()=>{console.log(this.props.validated2fa)}}></button>
                <Route path='/home/settings' component={Settings}></Route>
                <Route path='/home/info' component={UserInfo}></Route>
                <Route path='/home/BankAccounts' component={BankAccounts}></Route>
                <Route path='/home/verification' component={EhrazHoviat}></Route>
                {redirect}
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        togglee: state.ui.darkmode,
        token: state.auth.accessToken,
        userW: state.twofa.userW,
        validated2fa: state.twofa.Validated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggle: ()=>dispatch(actions.darkToggle())
    }
}


export default  connect(mapStateToProps,mapDispatchToProps)(Home)