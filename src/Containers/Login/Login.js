import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../Redux/Actions/AuthActions'
import {Col, Row, Button} from 'react-bootstrap'
import './Login.css'
import logo from '../../../src/assets/imgs/Logo.svg'
import {Link, Redirect} from 'react-router-dom'
import 'react-modern-calendar-datepicker/lib/DatePicker.css';

class Login extends Component {

    state = {
        email: '',
        password: '',
        date: '',
        day: ''
    }

        
    componentDidMount() {
        this.props.cleanUp()
    }

    

    render() {

        let redirect = null

        if (this.props.token) {
            redirect = <Redirect to='/login'></Redirect>
        }

        let redirect2 = null

        return (
            <Row>
                      
                <Col className='d-none d-sm-block' sm={1} md={2}></Col>
                <Col xs={12} sm={10} md={8}>
                    <Row>

                        <Col className='d-none d-sm-block' lg={1}></Col>
                        <Col className='register d-none d-md-block z-depth-3' md={5} lg={4}>
                            <div>
                                <h4 className='label z-depth-4' dir='rtl'>ثبت نام</h4>
                                <h5>حساب کاربری ندارید؟</h5>
                                <Link
                                    style={{
                                    color: '#52575d'
                                }}
                                    to='/register'>
                                    <p
                                        style={{
                                        cursor: 'pointer',
                                        marginTop: '10vh',
                                        fontSize: '3vh',
                                        textDecoration: 'underline'
                                    }}>ثبت نام کنید</p>
                                </Link>
                            </div>
                            <Row className='CopyRight z-depth-4'></Row>
                        </Col>

                        <Col className='login z-depth-3' sm={12} md={7} lg={6}>
                            <Row className='logoCont z-depth-4'>
                                <Col xs={9} md={9}>
                                    <h3
                                        className='invex'
                                        style={{
                                        color: '#fddb3a',
                                        marginTop: '25px',
                                        marginLeft: '50px'
                                    }}>اینوکس</h3>
                                </Col>
                                <Col xs={3} md={3}>
                                    <img alt='logo' className='logo' src={logo}></img>
                                </Col>
                            </Row>
                            <h4 className='label z-depth-4'>ورود</h4>
                            {this.props.loading
                                ? <div className="lds-circle">
                                        <div></div>
                                    </div>
                                : <form>
                                    <Row>
                                        <Col xs={3} sm={3} md={2} lg={2}></Col>
                                        <Col xs={8} md={10} lg={10}>
                                            <div className='input-field input-fielddddd col s10'>
                                                <input
                                                    required='required'
                                                    value={this.state.email}
                                                    onChange={(e) => {
                                                    this.setState({email: e.target.value})
                                                }}
                                                    id="email"
                                                    type="email"></input>
                                                <i ></i>
                                                <label dir='rtl' htmlFor="email">ایمیل</label>
                                                <Col className='d-md-none' xs={1} sm={1}></Col>
                                            </div>
                                            <div className="input-field input-fielddddd col s10">

                                                <input
                                                    value={this.state.password}
                                                    onChange={(e) => {
                                                    this.setState({password: e.target.value})
                                                }}
                                                    id="password"
                                                    type="password"></input>
                                                <i className="material-icons prefix">lock</i>
                                                <label dir='rtl' htmlFor="password">رمز عبور</label>

                                                <Col className='hide-span d-md-none' xs={1} sm={1}></Col>
                                            </div>
                                        </Col>
                                        <Col xs={1} className='d-md-none'></Col>
                                    </Row>
                                    <Row>

                                        <Col xs={12} md={4} lg={5}>
                                            <Button
                                                onClick={(e) => {
                                                e.preventDefault()
                                                this.props.Login(this.state.email, this.state.password)
                                            }}
                                                onSubmit={(e) => {
                                                e.preventDefault()
                                                this.props.Login(this.state.email, this.state.password)
                                            }}
                                                variant='warning'
                                                className="btn-primary"
                                                type='submit'
                                                name="action">
                                                ورود
                                            </Button>
                                        </Col>
                                        <Col className='d-none d-md-block' md={1} lg={2}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                console.log(localStorage.getItem('accessToken'), console.log(this.props.token))
                                            }}>Test</button>
                                        </Col>

                                        <Col xs={12} md={6} lg={5}>
                                            <button
                                                onClick={() => {
                                                console.log(this.props.token)
                                            }}
                                                style={{
                                                fontSize: '1.5vh'
                                            }}
                                                className="btn waves-effect waves-light yellow grey-text  "
                                                type="button"
                                                name="action">فراموشی رمز عبور</button>
                                        </Col>

                                    </Row>
                                </form>}
                        </Col>
                        <Col className='d-none d-sm-block' lg={1}></Col>
                    </Row>
                </Col>
                <Col className='d-none d-sm-block' sm={1} md={2}></Col>
                {redirect}
                {redirect2}
            </Row>
        )
    }
}

const mapStateToProps = state => {
    return {token: state.auth.accessToken, loading: state.auth.loading}
}

const mapDispatchToProps = dispatch => {
    return {
        Login: (email, password) => dispatch(actions.Login(email, password)),
        cleanUp: () => dispatch(actions.cleanUp()),
        checkLoginStatus: ()=>dispatch(actions.authCheckState())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)