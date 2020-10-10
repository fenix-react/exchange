import * as actionTypes from '../actionTypes'
import Axios from 'axios'

export const qrcodestart = () => {
    return {type: actionTypes.QR_CODE_START}
}

export const qrcodeSuccess = (data) => {
    return {type: actionTypes.QR_CODE_SUCCESS, qrcode: data.qr_url, secureCode: data.secure_code}
}

export const qrcodeFailed = (error) => {
    return {type: actionTypes.QR_CODE_FAILED, error: error}
}

export const qrCode = (token) => {
    return dispatch => {
        dispatch(qrcodestart())
        Axios
            .get('http://192.168.1.190:8000/userAccount/api/enable2fa/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res)
                dispatch(qrcodeSuccess(res.data))
            })
            .catch(err => dispatch(qrcodeFailed(err)))
    }

}

export const sendVerifyStart = () => {
    return {type: actionTypes.SEND_VERIFY_START}
}

export const sendVerifySuccess = () => {
    return {type: actionTypes.SEND_VERIFY_SUCCESS}
}
export const sendVerifyFailed = () => {
    return {type: actionTypes.SEND_VERIFY_FAILED}
}
export const sendVerify = (token) => {
    return dispatch => {
        dispatch(sendVerifyStart())
        Axios.post('http://192.168.1.190:8000/userAccount/api/enable2fa/SendEmail/', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}

export const twoFAstart = () => {
    return {type: actionTypes.TWO_FA_START}
}

export const twoFAsuccess = () => {
    return {type: actionTypes.TWO_FA_SUCCESS}
}

export const twoFAfailed = (error) => {
    return {type: actionTypes.TWO_FA_FAILED, error: error}
}

export const twoFA = (email_code, google_code, token) => {
    return dispatch => {
        dispatch(twoFAstart())
        Axios.post('http://192.168.1.190:8000/userAccount/api/enable2fa/', {
            "email_code": email_code,
            "google_code": google_code
        }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => dispatch(twoFAstart(res)))
            .catch(err => {
                console.log(err)
                dispatch(twoFAfailed(err))
            })
    }
}

export const twofaloginStart = () => {
    return {type: actionTypes.TWOFA_LOGIN_START}
}
export const twofaloginSuccess = (data) => {
    return {type: actionTypes.TWOFA_LOGIN_SUCCESS, userW: data.user.WithdrawalLevel,userType: data.user.userinfo}
}
export const twofaloginFailed = (error) => {
    return {type: actionTypes.TWOFA_LOGIN_FAILED, error: error}
}

export const twofaLogin = (token) => {
    return dispatch => {
        dispatch(twofaloginStart())
        Axios
            .get('http://192.168.1.190:8000/userAccount/api/Index/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res =>{console.log(res.data) 
                        localStorage.setItem('userW',res.data.user.WithdrawalLevel)
                        localStorage.setItem('userInfo',res.data.UserInfo)
                        dispatch(twofaloginSuccess(res.data))})
          .catch(err => dispatch(twofaloginFailed(err.response)))
    }
}

export const validateStart = () => {
    return {
        type: actionTypes.SEND_VERIFY_START
    }
}
export const validateSuccess = () => {
    return {
        type: actionTypes.SEND_VALIDATE_SUCCESS
    }
}
export const validateFailed = (err) => {
    return {
        type: actionTypes.SEND_VERIFY_FAILED, error: err
    }
}

export const validate = (code,token) => {
    return dispatch=>{
        dispatch(validateStart())
        Axios.post('http://192.168.1.190:8000/userAccount/api/2faValidate/',{
            "code": code
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res=>{localStorage.setItem('validated',true)
            dispatch(validateSuccess())})
        .catch(err=>dispatch(validateFailed(err)))
    }
}