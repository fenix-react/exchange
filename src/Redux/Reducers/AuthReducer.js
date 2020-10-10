import * as actions from '../actionTypes'

const initialState = {
    loading: false,
    accessToken: null,
    email: null,
    id: null,
    signUped: false,
    otpChecked: false
}

const AuthReducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.SIGN_UP_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actions.SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
                signUped: true
               
            }
        case actions.SIGN_UP_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actions.LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                accessToken: action.accessToken,
            }
        case actions.LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actions.LOGOUT_START:
            return {
                ...state,
                loading: true
            }
        case actions.LOGOUT_SUCCESS:
            return {
                ...state,
                accessToken: null,
                loading: false
            }
        case actions.LOGOUT_FAILED:
            return {
                ...state,
                loading: false
            }
        case actions.OTP_START: {
            return {
                ...state,
                laoding: true
            }
        }
        case actions.OTP_SUCCESS:
            return {
                ...state,
                loading: false,
                otpChecked: true
            }
        case actions.OTP_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actions.CLEAN_UP:
            return {
                ...state,
                loading: false,
                otpChecked: false,
                signUped: false
            }
        default:
            return state

    }

}

export default AuthReducer