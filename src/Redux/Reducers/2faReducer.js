import * as actions from '../actionTypes'

const initialState = {
    googleCode: null,
    emailCode: null,
    qrCode: null,
    loading: false,
    Googleloading: null,
    EmailLoading: null,
    twoFASuccess: false,
    emailVerified: true,
    userW: null,
    Validated: false
}

const TwofaReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.QR_CODE_START:
            return{
                ...state,
                loading: true
            }
        case actions.QR_CODE_SUCCESS:
            return {
                ...state,
                // loading: false,
                qrCode: action.qrcode
            }
        case actions.QR_CODE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actions.TWO_FA_START:
            return {
                ...state,
                loading: true
            }
        case actions.TWO_FA_SUCCESS: 
            return {
                ...state,
                loading: false,
                twoFASuccess: true
            }
        case actions.TWO_FA_FAILED:
             return {
                 ...state,
                 loading: false,
                 error: action.error
             }
        case actions.SEND_VERIFY_START:
            return {
                ...state,
                loading: true
            }
        case actions.SEND_VERIFY_SUCCESS:
            return {
                ...state,
                loading: false,
                emailVerified: true
            }
        case actions.SEND_VERIFY_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actions.TWOFA_LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case actions.TWOFA_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userW: action.userW
            }
        case actions.TWOFA_LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actions.SEND_VALIDATE_START:
            return {
                ...state,
                loading: true,
            }
        case actions.SEND_VALIDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                Validated: true,
                userW: action.userW
            }
        case actions.SEND_VALIDATE_FAILED:
            return {
                ...state,
                loading: false,
                Validated: false,
                error: action.error
            }
    
        default:
           return state;
    }
}

export default TwofaReducer
