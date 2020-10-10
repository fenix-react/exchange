import * as actionTypes from '../actionTypes'

const initialState = {
    firstName: '',
    lastName: '',
    fatherName: '',
    nCode: '',
    birthDay: '',
    mobileNumber: '',
    homeNumber: '',
    address: '',
    zipCode: '',
    loading: false,
    userInfo: null

}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_START:
            return{
                ...state,
                loading: true
                        }
        case actionTypes.FETCH_USER_SUCCESS: 
            return{
                ...state,
                loading: false,
                firstName: action.firstname,
                lastName: action.lastname ,
                fatherName: action.fathername ,
                nCode: action.nCode ,
                birthDay: action.birthDay ,
                mobileNumber: action.mobileNumber ,
                homeNumber: action.homeNumber ,
                address: action.address ,
                zipCode: action.zipCode
            }
        case actionTypes.FETCH_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.POST_USER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.POST_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                posted: true
            }
        case actionTypes.POST_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.INIT_USER:
            return {
                ...state,
                userInfo: action.userInfo
            }
        default:
           return state;
    }
}

export default UserReducer 

