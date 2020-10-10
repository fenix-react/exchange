import React, {Component} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import classes from './TwoFA.module.css'
import QRCode from 'qrcode.react'
import {connect} from 'react-redux'
import * as actions from '../../Redux/Actions/2faActions'

class TwoFA extends Component {

    state = {
        scanned: false,
        entered: false,
        email_code: '',
        google_code: ''
    }


    componentDidMount() {
        this.props.qrcodeFetch(localStorage.getItem('accessToken'))
    }
   

    render() {
       let qrCode=null
        if(this.props.qrcode) {
            qrCode= <QRCode value={this.props.qrcode}></QRCode>
        } else if(this.props.loading) {
            qrCode= <div className="lds-circle"><div></div></div>
        }
    

        return (
            <Container fluid>
                <Row>
                    <Col xs={1} sm={2} md={3}></Col>
                    <Col xs={10} sm={8} md={6}>
                        <Row>
                            <div class={`z-depth-4 ${classes.cont}`}>
                                {!this.state.scanned && !this.state.entered
                                    ? <React.Fragment>
                                            <p dir='rtl' className={classes.title}>لطفا کد زیر را با گوشی خود اسکن کنید و کد دریافتی را در صفحه بعد وارد کنید</p>
                                            <div
                                                style={{
                                                marginTop: '15vh'
                                            }}
                                                className='z-dept-5'>
                                               {qrCode}
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                    this.setState({scanned: true})
                                                }}
                                                    class={`waves-effect waves-light btn amber ${classes.button}`}>
                                                    <i class="material-icons left">arrow_back</i>مرحله بعد</button>
                                                    <button onClick={()=>{
                                                                            console.log(this.props.qrcode)}}>test</button>

                                            </div>
                                        </React.Fragment>
                                    : this.state.scanned && !this.props.entered
                                        ? <React.Fragment>
                                                <div
                                                    style={{
                                                    marginTop: '20vh',
                                                    marginLeft: '5vw'
                                                }}
                                                    class="row">
                                                    <form class="col s12">
                                                        <div class="row">
                                                            <div
                                                                style={{
                                                                marginLeft: '15vw'
                                                            }}
                                                                class="input-field ">

                                                                <input style={{color: 'white'}} value={this.state.google_code} onChange={(e)=>{this.setState({google_code: e.target.value})}} dir='rtl' id="icon_telephone" type="number"/>
                                                                <label dir='rtl' for="icon_telephone">کد google Authenticate</label>
                                                                <i class="material-icons prefix">tap_and_play</i>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div
                                                                style={{
                                                                marginLeft: '15vw'
                                                            }}
                                                                class="input-field ">

                                                                <input style={{color: 'white'}} value={this.state.email_code} onChange={(e)=>{this.setState({email_code: e.target.value})}} dir='rtl' id="icon_telephone2" type="tel"/>
                                                                <label dir='rtl' for="icon_telephone2">کد ایمیل شده</label>
                                                                <i class="material-icons prefix">mail</i>
                                                                <button onClick={()=>{this.props.sendVerify(localStorage.getItem('accessToken'))}} class="btn waves-effect waves-light" type="button" name="action">ارسال ایمیل فعالسازی
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type='button'
                                                            onClick={() => {this.props.twofaP(this.state.email_code,this.state.google_code,localStorage.getItem('accessToken'))}}
                                                            class={`waves-effect waves-light btn col s3 amber ${classes.button}`}>
                                                            <i class="material-icons left">arrow_back</i>مرحله بعد</button>
                                                            <div className='col s4'></div>
                                                        <button
                                                            type='button'
                                                            onClick={() => {
                                                            this.setState({scanned: false})
                                                        }}
                                                            class={`waves-effect waves-light btn col s3 amber ${classes.button}`}>
                                                            <i class="material-icons left">arrow_forward</i>مرحله قبل</button>
                                                       
                                                       

                                                    </form>
                                                </div>
                                            </React.Fragment>
                                        : <h3
                                            style={{
                                            color: 'green'
                                        }}>تبریک! اکانت شما با موفقیت دو مرحله ای شد!</h3>}
                            </div>
                        </Row>
                    </Col>
                    <Col xs={1} sm={2} md={3}></Col>
                </Row>
            </Container>
        )
    }
}

export const mapStateToProps = state => {
    return {
        qrcode: state.twofa.qrCode,
        loading: state.twofa.loading,
        entered: state.twofa.twoFASuccess
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        qrcodeFetch: (token)=>dispatch(actions.qrCode(token)),
        twofaP: (email_code,google_code,token)=>dispatch(actions.twoFA(email_code,google_code,token)),
        sendVerify: (token)=>{dispatch(actions.sendVerify(token))}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(TwoFA)