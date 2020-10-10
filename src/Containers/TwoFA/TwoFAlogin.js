import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actions from '../../Redux/Actions/2faActions'
import { Redirect } from 'react-router'
import './TwoFAlogin.css'

class TwoFALogin extends Component {

    state= {
        code: ''
    }

    componentDidMount() {
        this.props.twoFAlogin(localStorage.getItem('accessToken'))
    }

    render() {
        let main=null
        if(this.props.userW) {
            if (this.props.userW === 'w0') {
                main=<Redirect to='/2fa'></Redirect>
            }
            else if(this.props.userW ==='w1') {
                  main =  <form><div className='input-field input-fielddddd col s10'>
                                            <input
                                                required='required'
                                                value={this.state.code}
                                                onChange={(e) => {
                                                this.setState({code: e.target.value})
                                            }}
                                                id="number"
                                                type="text"></input>
                                            
                    </div>
                    <button type='button' onClick={()=>{this.props.validate(this.state.code,localStorage.getItem('accessToken'))}}>send</button>
                    </form>
            }
        }
        else {
            main= <div className="lds-circle"><div></div></div>
        }

        let redirect=null
        if(this.props.validated) {
            redirect=<Redirect to='/home'></Redirect>
        }
        

        return(
            <React.Fragment>
                {main}
                {redirect}
                <button onClick={()=>{console.log(localStorage.getItem('userW'))}}>TEST</button>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userW: state.twofa.userW,
        validated: state.twofa.Validated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        twoFAlogin: (token)=>dispatch(actions.twofaLogin(token)),
        validate: (code,token)=>dispatch(actions.validate(code,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TwoFALogin)