import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import classes from './Navbar.module.css'
import {Container} from 'react-bootstrap'
import {
    FaMoon,
    FaSun,
    FaBell,
    FaBars,
    FaAngleDown,
    FaAngleUp
} from 'react-icons/fa'
import userPhoto from '../../assets/imgs/user.jpg'
import {NavLink, Link} from 'react-router-dom'
import Logo from '../../assets/imgs/Logo.svg'
import {AiOutlineUser, AiOutlineHome, AiOutlineWallet} from 'react-icons/ai'
import {connect} from 'react-redux'
import * as actions from '../../Redux/Actions/AuthActions'


class NavigationBar extends React.Component {

    state = {
        darkTheme: false,
        showSidebar: true,
        showUserCont: false,
        showWallet: false
    }

    render() {

        return (
            <Container className={classes.dark} fluid>
                <Navbar
                    className={this.state.showSidebar
                    ? classes.navWithSide
                    : classes.nav}
                    variant="dark">
                    <Nav className="mr-auto">
                        <button
                            className={classes.iconLight}
                            onClick={() => {
                            this.setState({
                                darkTheme: !this.state.darkTheme
                            })
                        }}>{this.state.darkTheme
                                ? <FaSun onClick={this.props.click}
                                        style={{
                                        fontSize: '3VH',
                                        marginTop: '1vh'
                                    }}/>
                                : <FaMoon onClick={this.props.click2}
                                    style={{
                                    fontSize: '3vh',
                                    marginTop: '1vh'
                                }}/>}</button>
                        <button className={classes.iconLight}><FaBell
                            style={{
                fontSize: '3VH',
                marginTop: '1vh',
                marginLeft: '.7vw'
            }}/></button>
            <button type='submit' onClick={()=>{console.log(localStorage)
                this.props.logOut(localStorage.getItem('accessToken'))
                }}>Logout</button>
                <button onClick={()=>{console.log(localStorage.getItem('userW'))}}></button>
                    </Nav>

                </Navbar>
                <div
                    className={this.state.showSidebar
                    ? classes.sidebarOpen
                    : classes.sidebarClose}>
                    {this.state.showSidebar
                        ? <div>
                                <div
                                    style={{
                                    marginTop: '3vh',
                                    display: 'flex'
                                }}>
                                    <button
                                        className={classes.iconLight}
                                        onClick={() => {
                                        this.setState({
                                            showSidebar: !this.state.showSidebar
                                        })
                                    }}>
                                        <FaBars
                                            style={{
                                            fontSize: '4vh',
                                            marginTop: '-3vh'
                                        }}></FaBars>
                                    </button>

                                    <h6
                                        style={{
                                        marginTop: '1.5vh',
                                        flex: '.6',
                                        color: "white",
                                        marginLeft: '3vw'
                                    }}>اینوکس</h6>
                                    <img
                                        style={{
                                        flex: '.4',
                                        marginRight: '1vw'
                                    }}
                                        alt='logo'
                                        src={Logo}></img>
                                </div>
                                <div
                                    style={{
                                    color: 'white',
                                    display: "flex",
                                    flexDirection: 'row',
                                    marginTop: '6vh',
                                    marginLeft: '6vw'
                                }}>
                                    <div>
                                        <h6 dir='rtl'>کاربر</h6>
                                        <p
                                            style={{
                                            fontSize: '1.5vh'
                                        }}
                                            dir='rtl'>خوش آمدید!</p>
                                    </div>
                                    <img
                                        style={{
                                        height: '7vh',
                                        marginLeft: '1vw',
                                        borderRadius: '5vh'
                                    }}
                                        alt='ddd'
                                        src={userPhoto}></img>
                                </div>
                                <div
                                    onClick={() => {
                                    console.log('dwadw')
                                }}
                                    className={classes.sideNavFirst}
                                    dir='rtl'>
                                    <AiOutlineHome
                                        style={{
                                        marginRight: '1vw',
                                        fontSize: '3vh',
                                        marginTop: '1vh'
                                    }}></AiOutlineHome>
                                    <Link to='/home'>
                                        <p
                                            style={{
                                            marginRight: '1vw',
                                            marginTop: '1.5vh'
                                        }}>داشبورد</p>
                                    </Link>
                                </div>
                                <div
                                    onClick={() => {
                                    this.setState({
                                        showUserCont: !this.state.showUserCont
                                    })
                                }}
                                    className={classes.sideNav}
                                    dir='rtl'>
                                    <AiOutlineUser
                                        style={{
                                        marginRight: '1vw',
                                        fontSize: '3vh',
                                        marginTop: '1vh'
                                    }}></AiOutlineUser>
                                    <p
                                        style={{
                                        marginRight: '1vw',
                                        marginTop: '1.5vh',
                                        fontSize: '1.8vh',
                                        width: '10vw'
                                    }}>حساب کاربری</p>
                                    {!this.state.showUserCont
                                        ? <FaAngleDown className={classes.sideArrow}/>
                                        : <FaAngleUp
                                            onClick={() => {
                                            this.setState({
                                                showUserCont: !this.state.showUserCont
                                            })
                                        }}
                                            className={classes.sideArrow}/>}
                                </div>
                                {this.state.showUserCont
                                    ? <div
                                            className={classes.animate}
                                            style={{
                                            textAlign: "end"
                                        }}>
                                            <NavLink
                                                className={classes.userLinks}
                                                style={{
                                                display: "block"
                                            }}
                                                to='/home/settings'>تنظیمات</NavLink>
                                            <NavLink
                                                className={classes.userLinks}
                                                style={{
                                                display: "block"
                                            }}
                                                to='/home/info'>اطلاعات</NavLink>
                                            <NavLink
                                                className={classes.userLinks}
                                                style={{
                                                display: "block"
                                            }}
                                                to='/home/verification'>احراز هویت</NavLink>
                                            <NavLink
                                                className={classes.userLinks}
                                                style={{
                                                display: "block"
                                            }}
                                                to='/home/BankAccounts'>حساب های بانکی</NavLink>
                                        </div>
                                    : null
}
                                <div
                                    onClick={() => {
                                    this.setState({
                                        showWallet: !this.state.showWallet
                                    })
                                }}
                                    className={classes.sideNav}
                                    dir='rtl'>
                                    <AiOutlineWallet
                                        style={{
                                        marginRight: '1vw',
                                        fontSize: '3vh',
                                        marginTop: '1vh'
                                    }}></AiOutlineWallet>
                                    <p
                                        style={{
                                        marginRight: '1vw',
                                        marginTop: '1.5vh',
                                        fontSize: '1.8vh',
                                        width: '10vw'
                                    }}>کیف پول</p>
                                    {!this.state.showWallet
                                        ? <FaAngleDown className={classes.sideArrow}/>
                                        : <FaAngleUp
                                            onClick={() => {
                                            this.setState({
                                                showWallet: !this.state.showWallet
                                            })
                                        }}
                                            className={classes.sideArrow}/>}
                                </div>
                                {this.state.showWallet
                                    ? <div
                                            className={classes.animate}
                                            style={{
                                            textAlign: "end"
                                        }}>
                                            <NavLink
                                                className={classes.userLinks}
                                                style={{
                                                display: "block"
                                            }}
                                                to='/home/settings'>واریز</NavLink>
                                            <NavLink
                                                className={classes.userLinks}
                                                style={{
                                                display: "block"
                                            }}
                                                to='/home/info'>برداشت</NavLink>
                                            <NavLink
                                                className={classes.userLinks}
                                                style={{
                                                display: "block"
                                            }}
                                                to='/home/verification'>تبدیل</NavLink>
                                            <NavLink
                                                className={classes.userLinks}
                                                style={{
                                                display: "block"
                                            }}
                                                to='/home/BankAccounts'>
                                                تاریخچه عملیات</NavLink>
                                        </div>
                                    : null
}
                            </div>
                        : <div
                            onMouseEnter={() => {
                            this.setState({showSidebar: true})
                        }}
                            style={{
                            textAlign: 'center'
                        }}>
                            <button
                                className={classes.iconLight}
                                onClick={() => {
                                this.setState({
                                    showSidebar: !this.state.showSidebar
                                })
                            }}>
                                <FaBars
                                    style={{
                                    fontSize: '4vh',
                                    marginTop: '2vh'
                                }}></FaBars>
                            </button>
                            <img
                                alt='logo'
                                style={{
                                marginLeft: '.5vw',
                                marginTop: '2vh',
                                display: 'block'
                            }}
                                src={Logo}></img>
                            <img
                                style={{
                                marginLeft: '.5vw',
                                height: '7vh',
                                display: 'block',
                                borderRadius: '5vh',
                                marginTop: '5vh'
                            }}
                                alt='user'
                                src={userPhoto}></img>
                            <AiOutlineHome
                                style={{
                                marginLeft: '17px',
                                display: 'block',
                                color: "white",
                                fontSize: '4vh',
                                marginTop: '3vh'
                            }}></AiOutlineHome>
                            <AiOutlineUser
                                style={{
                                marginLeft: '17px',
                                display: 'block',
                                color: "white",
                                fontSize: '4vh',
                                marginTop: '3vh'
                            }}></AiOutlineUser>
                            <AiOutlineWallet
                                style={{
                                marginLeft: '17px',
                                display: 'block',
                                color: "white",
                                fontSize: '4vh',
                                marginTop: '3vh'
                            }}></AiOutlineWallet>
                        </div>}
                </div>

            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.accessToken,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: (token)=>{dispatch(actions.logout(token))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavigationBar)