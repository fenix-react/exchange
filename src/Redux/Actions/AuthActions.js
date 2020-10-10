import * as actionTypes from '../actionTypes'
import axios from 'axios'
import {validateFailed} from './2faActions'

export const SignStart = () => {
    return {type: actionTypes.SIGN_UP_START}
}

export const SignSuccess = () => {
    return {type: actionTypes.SIGN_UP_SUCCESS}
}

export const SignFailed = (error) => {
    return {type: actionTypes.SIGN_UP_FAILED, error: error}
}

export const LoginStart = () => {
    return {type: actionTypes.LOGIN_START}
}

export const LoginSuccess = (data) => {
    return {type: actionTypes.LOGIN_SUCCESS, accessToken: data.access}
}

export const LoginFailed = () => {
    return {type: actionTypes.LOGIN_FAILED}
}

export const SignUp = (email, email2, password) => {
    return dispatch => {
        dispatch(SignStart())
        axios
            .post('http://192.168.1.190:8000/userAccount/api/register/', {

            'email': email,
            'username': email2,
            'password': password

        })
            .then(res => {
                console.log(res)
                dispatch(SignSuccess())
            })
            .catch(err => {
                console.log(err.response)
                dispatch(SignFailed(err))
            })
    }
}

export const Login = (email, password) => {
    return dispatch => {
        dispatch(LoginStart())
        axios
            .post('http://192.168.1.190:8000/userAccount/api/token/', {

            'username': email,
            'password': password

        })
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + 36000 * 1000);
                localStorage.setItem('accessToken', res.data.access)
                localStorage.setItem('expirationDate', expirationDate)
                dispatch(LoginSuccess(res.data))
                console.log(res.data)
                dispatch(checkAuthTimeout(36000));

            })
            .catch(err => dispatch(LoginFailed()))
    }
}

export const logOutStart = () => {
    return {type: actionTypes.LOGOUT_START}
}
export const logOutSuccess = () => {
    return {type: actionTypes.LOGOUT_SUCCESS}
}
export const logoutFailed = () => {
    return {type: actionTypes.LOGOUT_FAILED}
}

export const logout = (token) => {
    return dispatch => {
        dispatch(logOutStart())
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userW')
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('validated')
        axios.post('http://192.168.1.190:8000/userAccount/api/logout/', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            dispatch(validateFailed())

            dispatch(logOutSuccess())
        
        }).catch(err => dispatch(logoutFailed()))
    }
}

export const otpStart = () => {
    return {type: actionTypes.OTP_START}
}

export const otpSuccess = () => {
    return {type: actionTypes.OTP_SUCCESS}
}

export const otpFailed = (error) => {
    return {type: actionTypes.OTP_FAILED, error: error}
}

export const otp = (code, email, password) => {
    return dispatch => {
        dispatch(otpStart())
        axios
            .post('http://192.168.1.190:8000/userAccount/api/registervalidate/', {

            "email": email,
            'username': email,
            'password': password,
            "code": code

        })
            .then(res => {
                console.log(res)
                dispatch(otpSuccess())
            })
            .catch(err => {
                console.log(err.response)
                dispatch(otpFailed(err))
            })
    }
}

export const cleanUp = () => {
    return {type: actionTypes.CLEAN_UP}
}
export const checkAuthTimeout = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const accessToken = localStorage.getItem('accessToken');
                dispatch(LoginSuccess({access: accessToken}));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}
