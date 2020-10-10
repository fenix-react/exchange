import React, {Component} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import * as actions from '../../Redux/Actions/BankActions'

class BankAccounts extends Component {

    state = {
        shaba: 'IR',
        card: null,
        bank: '',
        banksAccounts: [],
        bankNames: [ 
            {name: 'بانک ملی ایران	', key: 603799},
            {name: 'بانک سپه' , key: 589210 },
            {name: 'بانک توسعه صادرات' , key: 627648},
            {name: 'بانک صنعت و معدن' , key: 627961},
            {name: 'بانک کشاورزی' , key: 603770 },
            {name: 'بانک مسکن' , key: 628023 },
            {name: 'پست بانک ایران' , key: 627760 },
            {name: 'بانک توسعه تعاون' , key: 502908 },
            {name: 'بانک اقتصاد نوین' , key: 627412},
            {name: 'بانک پارسیان' , key: 622106},
            {name: 'بانک پاسارگاد	' , key: 502229 },
            {name: 'بانک قوامین	' , key: 639599 },
            {name: 'بانک کارآفرین' , key: 627488 },
            {name: 'بانک سامان' , key: 621986 },
            {name: 'بانک سینا' , key: 639346},
            {name: 'بانک سرمایه	' , key: 639607 },
            {name: 'بانک شهر' , key: 504706 },
            {name: 'بانک شهر' , key: 502806},
            {name: 'بانک دی	' , key: 502938 },
            {name: 'بانک صادرات	' , key: 603769 },
            {name: 'بانک ملت	' , key: 610433},
            {name: 'بانک تجارت' , key: 627353},
            {name: 'بانک تجارت' , key: 585983},
            {name: 'بانک رفاه' , key: 589463},
            {name: 'بانک انصار' , key: 627381},
            {name: 'بانک مهر اقتصاد	' , key: 639370},
            {name: 'موسسه اعتباری نور' , key: 507677},
            {name: 'موسسه اعتباری توسعه' , key: 628157},
            {name: 'موسسه اعتباری کوثر' , key: 505801},
            {name: 'موسسه اعتباری ملل (عسکریه)' , key: 606256},
            {name: 'بانک قرض الحسنه مهرایرانیان' , key: 606373}


        ]
    }

    componentDidMount() {
        this.props.fetchBank(localStorage.getItem('accessToken'))
        setTimeout(() => {
            this.setState({banksAccounts: this.props.banksAccounts})

        }, 1000);
    }

    render() {

        let bankName = null
        if(this.state.card > 5) {
            bankName= this.state.bankNames.filter(e=> e.key === this.state.card.slice(0,5)).name
        }

        let banks = this.state.banksAccounts.map(e=>{
            return(<div><Row style={{
                marginTop: '8vh'
            }}>
                <Col className='d-none d-md-block' md={3}></Col>
                <Col xs={12} md={6}>
                    <div className='input-field'>
                        <input
                            required='required'
                            value={e.Sheba_Number}
                            onChange={(e) => {
                            this.setState({shaba: e.target.value})
                        }}
                            id="shaba"
                            type="text"></input>
                        <i className="material-icons prefix">account_circle</i>
                        <label dir='rtl' htmlFor="shaba">شماره شبا</label>
                    </div>
                </Col>
                <Col className='d-none d-md-block' md={3}></Col>
            </Row>
            <Row style={{
                marginTop: '8vh'
            }}>
                <Col className='d-none d-md-block' md={3}></Col>
                <Col xs={12} md={6}>
                    <div className='input-field'>
                        <input
                            required='required'
                            value={e.Card_Number}
                            onChange={(e) => {
                            this.setState({card: e.target.value})
                        }}
                            id="card"
                            type="number"></input>
                        <i className="material-icons prefix">account_circle</i>
                        <label dir='rtl' htmlFor="card">شماره کارت</label>
                    </div>
                </Col>
                <Col className='d-none d-md-block' md={3}></Col>
            </Row></div>)
        })

        return (
            <Container style={{width: '80vw',marginLeft: '2vw'}}>
                {banks}
                <Row style={{
                    marginTop: '8vh'
                }}>
                    <Col className='d-none d-md-block' md={3}></Col>
                    <Col xs={12} md={6}>
                        <div className='input-field'>
                            <input
                                required='required'
                                value={this.state.shaba}
                                onChange={(e) => {
                                this.setState({shaba: e.target.value})
                            }}
                                id="shaba"
                                type="text"></input>
                            <i className="material-icons prefix">account_circle</i>
                            <label dir='rtl' htmlFor="shaba">شماره شبا</label>
                        </div>
                    </Col>
                    <Col className='d-none d-md-block' md={3}></Col>
                </Row>
                <Row style={{
                    marginTop: '8vh'
                }}>
                    <Col className='d-none d-md-block' md={3}></Col>
                    <Col xs={12} md={6}>
                        <div className='input-field'>
                            <input
                                required='required'
                                value={this.state.card}
                                onChange={(e) => {
                                this.setState({card: e.target.value})
                            }}
                                id="card"
                                type="number"></input>
                            <i className="material-icons prefix">account_circle</i>
                            <label dir='rtl' htmlFor="card">شماره کارت</label>
                        </div>
                    </Col>
                    <Col className='d-none d-md-block' md={3}></Col>
                </Row>
                <button onClick={()=>{this.props.postBank(this.state.shaba,this.state.card,'meli',localStorage.getItem('accessToken'))}}>POST</button>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.accessToken,
        banksAccounts: state.bank.banksAccounts
    }
}

const mapDispatchProps = dispatch => {
    return {
        postBank: (shaba,card,bank,token)=>dispatch(actions.postBank(shaba,card,bank,token)),
        fetchBank: (token)=>dispatch(actions.fetchBank(token))
    }
}

export default connect(mapStateToProps,mapDispatchProps)(BankAccounts)