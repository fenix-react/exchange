import React, {Component} from 'react'
import classes from './Register.module.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import {AiOutlineLock, AiOutlineMail} from 'react-icons/ai'
import {Link,Redirect} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {connect} from 'react-redux'
import * as actions from '../../Redux/Actions/AuthActions'

class Register extends Component {


    state= {
        email: '',
        password: '',
        otpVlue: ''
    }

    render() {

        let redirect=null
        if(this.props.otpChecked) {
            redirect=<Redirect to='/'></Redirect>
        }

        return (
            <Container fluid>

                <Row className={classes.container}>
                    <Col d-none d-sm-1 d-md-2 d-lg-3></Col>
                    <Col sm={10} md={8} lg={6}>
                        <Row
                            style={{
                            overflow: "hidden",
                            height: '70vh',
                            borderRadius: '2vh'
                        }}>
                            <Col className={classes.register} xs={12} sm={12} md={6}>
                                <Row>
                                    <Col xs={2} md={1}></Col>
                                    <Col xs={8} md={10}>
                                       {this.props.signUped ? <div> <input value={this.state.otpVlue} onChange={(e)=>{this.setState({otpVlue: e.target.value})}}></input> <button onClick={()=>{this.props.otp(this.state.otpVlue,this.state.email,this.state.password)}}>send</button> </div>: <Form className={classes.form}>
                                            <h2 className='mb-5'>ثبت نام</h2>
                                            
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                            required='true' 
                                                            value={this.state.email}
                                                             onChange={(e)=>{this.setState({email: e.target.value})}}
                                                    className={classes.input}
                                                    style={{
                                                    width: '2vw'
                                                }}
                                                    placeholder="ایمیل"
                                                    dir='rtl'
                                                    type='email'/>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text className={classes.iconCont} id="basic-addon1"><AiOutlineMail/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                            </InputGroup>
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    value={this.state.password}
                                                    onChange={(e)=>{this.setState({password: e.target.value})}}
                                                    className={classes.input}
                                                    placeholder="رمز عبور"
                                                    dir='rtl'
                                                    type='password'/>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text className={classes.iconCont} id="basic-addon1"><AiOutlineLock/></InputGroup.Text>
                                                </InputGroup.Prepend>
                                            </InputGroup>
                                         
                                            <Col>
                                                <Row
                                                    style={{
                                                    marginTop: '5vh'
                                                }}>

                                                    <Col
                                                        xs={{
                                                        order: "first"
                                                    }}
                                                        md={{
                                                        order: 'last'
                                                    }}
                                                        lg={12}>
                                                        <Button onClick={(e)=>{ e.preventDefault()
                                                            this.props.signUp(this.state.email,this.state.email,this.state.password)}} className={classes.vorood} variant='primary' type='submit'>ثبت نام</Button>
                                                    </Col>
                                                </Row>
                                            </Col>

                                        </Form>}
                                    </Col>
                                    <Col xs={2} md={1}></Col>
                                </Row>
                                <Row className='d-xs-block d-md-none mt-3 col-12'>

                                    <Col xs={6}>
                                        <Button className={classes.vorood2}>وارد شوید</Button>
                                    </Col>
                                    <Col xs={6}>
                                        <p
                                            style={{
                                            fontSize: '2vh',
                                            color: "white",
                                            marginTop: '.5vh'
                                        }}>حساب دارید؟</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                style={{
                                backgroundColor: '#20a8d8'
                            }}
                                className='d-none d-md-block'
                                md={6}>
                                <h2
                                    style={{
                                    color: "white",
                                    marginTop: '8vh'
                                }}>ورود</h2>
                                <p
                                    style={{
                                    marginTop: '20vh',
                                    color: "white"
                                }}>حساب کاربری دارید؟</p>
                                <p
                                    style={{
                                    color: "white"
                                }}>از حساب کاربری خود وارد شوید</p>
                                <Link to='/'>
                                    <Button
                                        style={{
                                        marginTop: '8vh'
                                    }}
                                        className={classes.vorood}
                                        variant='primary'
                                        type='submit'>ورود</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col d-none d-sm-1 d-md-2 d-lg-3></Col>
                </Row>
                {redirect}
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        signUped: state.auth.signUped,
        otpChecked: state.auth.otpChecked
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (email,email2,password)=>dispatch(actions.SignUp(email,email2,password)),
        otp: (code,email,password)=>dispatch(actions.otp(code,email,password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)