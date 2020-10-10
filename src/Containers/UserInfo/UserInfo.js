import React, {Component} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import M from 'materialize-css'
import {Calendar} from 'react-modern-calendar-datepicker'
import {connect} from 'react-redux'
import * as actions from '../../Redux/Actions/userActions'

class UserInfo extends Component {

    state= {
        date: '',
        value: '',
        showCal: false,
        firstName: '',
        active: false
    }

    componentDidMount() {


        M.AutoInit()
        this.props.initUser(localStorage.getItem('userInfo'))
         this.props.fetchUser(localStorage.getItem('accessToken'))
      
      setTimeout(() => {
        this.setState({firstName: this.props.firstname,
                      lastName: this.props.lastname,
                      fatherName: this.props.fathername,
                      nCode: this.props.ncode,
                      home: this.props.home,
                      mobile: this.props.mobile,
                      date: this.props.date,
                      postCode: this.props.zipCode,
                      address: this.props.address,
                      active: true
                      })
      }, 200); 
     
    }

  
    

    render() {
        let cal=  <Calendar
        value={this.state.value}
        onChange={(e)=>{ let day=e.day
                          if(day.toString().length === 1) {
                              day= `0${day}`
                          }
                          let month=e.month
                          if(month.toString().length === 1) {
                              month= `0${month}`
                          }
                          let year=e.year
                          this.setState({date: `${year}-${month}-${day}`})
                          this.setState({value: e})
                          this.setState({showCal: false})
        }}
        shouldHighlightWeekends
       locale="fa"
   />
    

        return (
            <Container
                style={{
                width: '80vw',
                marginRight: '15vw',
                height: '87vh'
            }}
                fluid>
                   
                    <form>
                <Row style={{
                    marginTop: '5vh'
                }}>
                    <Col xs={{span:9,order: 7}}  lg={{span: 3, order: 1}}>
                        <div className="input-field">
                            <input  value={this.state.nCode} onChange={(e)=>{this.setState({nCode: e.target.value})}} dir='rtl' id="NCode" type="number" className="validate"/>
                            <label className={this.state.active ? 'active' : null} dir='rtl' htmlFor="NCode">شماره ملی</label>
                            <i className='material-icons prefix'>account_circle</i>
                        </div>
                    </Col>
                    <Col xs={{span:9,order: 6}}  lg={{span: 1, order: 2}}></Col>
                    <Col xs={{span:9,order: 5}}  lg={{span: 2, order: 3}}>
                        <div className="input-field">
                            <input ref={(input) => { this.nameInput = input; }}  value={this.state.fatherName} onChange={(e)=>{this.setState({fatherName: e.target.value})}} dir='rtl' id="fatherName" type="text" className="validate"/>
                            <label className={this.state.active ? 'active' : null} dir='rtl' htmlFor="fatherName">نام پدر</label>
                            <i className="material-icons prefix">account_circle</i>
                        </div>
                    </Col>
                    <Col xs={{span:9,order: 4}}  lg={{span: 1, order: 4}}></Col>
                    <Col xs={{span:9,order: 3}}  lg={{span: 2, order: 5}}>
                        <div  className="input-field">
                            <input value={this.state.lastName} onChange={(e)=>{this.setState({lastName: e.target.value})}} dir='rtl' id="lastName" type="text" className="validate"/>
                            <label className={this.state.active ? 'active' : null} dir='rtl' htmlFor="lastName">نام خانوادگی</label>
                            <i className="material-icons prefix">account_circle</i>
                        </div>
                    </Col>
                    <Col xs={{span:9,order: 2}}  lg={{span: 1, order: 6}}></Col>
                    <Col xs={{span:9,order: 1}}  lg={{span: 2, order: 7}}>
                        <div className="input-field">
                            <input value={this.state.firstName} onChange={(e)=>{this.setState({firstName: e.target.value})}} dir='rtl' id="firstName" type="text" className="validate"/>
                            <label className={this.state.active ? 'active' : null} dir='rtl' htmlFor="firstName">نام</label>
                            <i className="material-icons prefix">account_circle</i>
                        </div>
                    </Col>
                </Row>
                <Row style={{
                    marginTop: '5vh'
                }}>
                    <Col xs={9} md={4} lg={4}>
                    <div className="input-field">
                            <input value={this.state.home} onChange={(e)=>{this.setState({home: e.target.value})}} dir='rtl' id="HomeNumber" type="number" className="validate"/>
                            <label className={this.state.active ? 'active' : null} dir='rtl' htmlFor="HomeNumber">شماره منزل</label>
                            <i className="material-icons prefix">account_circle</i>
                        </div>
                    </Col>
                    <Col xs={9} md={1} lg={1}></Col>
                    <Col xs={9} md={3} lg={3}>
                    <div className="input-field">
                            <input value={this.state.mobile} onChange={(e)=>{this.setState({mobile: e.target.value})}} dir='rtl' id="PhoneNumber" type="number" className="validate"/>
                            <label className={this.state.active ? 'active' : null} dir='rtl' htmlFor="PhoneNumber">شماره موبایل</label>
                            <i className="material-icons prefix">account_circle</i>
                        </div>
                    </Col>
                    <Col xs={9} md={1} lg={1}></Col>
                    <Col dir='rtl' xs={9} md={3} lg={3}>
                    <div style={{marginTop: '3vh'}}>
                    <p style={{display: 'inline',marginTop: '8vh'}}>تاریخ تولد: </p>
                    <button type='button'  style={{marginTop: '0.5vh',display: 'inline'}} onClick={()=>{this.setState({showCal: !this.state.showCal})}} className="waves-effect waves-light btn btn-white">{this.state.date ? this.state.date : "    انتخاب کنید"}</button>
                    <div style={{position: "fixed",zIndex: 50}}>{this.state.showCal  ? cal : null}</div>
                    </div>
                   </Col>
                  
                </Row>
                <Row>
                <Col xs={{span: 12, order:3}} lg={{span: 2,order: 1}}>
                <div className="input-field">
                            <input value={this.state.postCode} onChange={(e)=>{this.setState({postCode: e.target.value})}} dir='rtl' id="ZIPCode" type="number" className="validate"/>
                            <label className={this.state.active ? 'active' : null} dir='rtl' htmlFor="ZIPCode">کد پستی</label>
                            <i className="material-icons prefix">account_circle</i>
                        </div>
                </Col>
                <Col xs={{span: 12, order:2}} lg={{span: 1,order: 2}}></Col>
                <Col xs={{span: 12, order:1}} lg={{span: 8,order: 3}}>
                <div className="input-field">
                            <input value={this.state.address} onChange={(e)=>{this.setState({address: e.target.value})}} dir='rtl' id="address" type="text" className="validate"/>
                            <label className={this.state.active ? 'active' : null} dir='rtl' htmlFor="address">آدرس</label>
                            <i className="material-icons prefix">account_circle</i>
                        </div>
                </Col>
                </Row>
                <button className='btn waves btn-white' onClick={(e)=>{e.preventDefault()
                                                             this.props.userPost(this.state.firstName,this.state.lastName,this.state.fatherName,this.state.date
                                                                ,this.state.nCode,this.state.mobile,this.state.home,this.state.address,this.state.postCode,localStorage.getItem('accessToken')
                )}}>ثبت تغییرات</button>
                        </form>
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
        firstname: state.user.firstName,
        lastname:state.user.lastName   ,
        fathername:state.user.fatherName   ,
        ncode:state.user.nCode   ,
        home:state.user.homeNumber   ,
        mobile:state.user.mobileNumber   ,
        date:state.user.birthDay   ,
        zipCode:state.user.zipCode   ,
        address:state.user.address   ,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userPost: (firstName,lastName,fatherName,date,nCode,mobile,home,address,postCode,token)=>dispatch(actions.postUser(firstName,lastName,fatherName,date,nCode,mobile,home,address,postCode,token)),
        initUser: (usr)=>dispatch(actions.initUser(usr)),
        fetchUser: (token)=>dispatch(actions.fetchUser(token))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserInfo)