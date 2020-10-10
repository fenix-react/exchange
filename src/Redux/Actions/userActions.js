import * as actionTypes from '../actionTypes'
import Axios from 'axios'

export const fetchUserStart = () => {
    return {type: actionTypes.FETCH_USER_START}
}

export const fetchUsercSuccess = (data) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        firstname: data.UserInfo.user.first_name,
        lastname: data.UserInfo.user.last_name,
        fathername: data.UserInfo.Father_Name,
        nCode: data.UserInfo.National_Code,
        birthDay: data.UserInfo.Birth_Day,
        mobileNumber: data.UserInfo.Mobile_Number,
        homeNumber: data.UserInfo.Home_Number,
        address: data.UserInfo.Address,
        zipCode: data.UserInfo.Post_Code

    }
}

export const fetchUserFailed = (error) => {
    return {type: actionTypes.FETCH_USER_FAILED, error: error}
}

export const fetchUser = (token) => {
    return dispatch => {
        dispatch(fetchUserStart())
        Axios
            .get('http://192.168.1.190:8000/userAccount/api/UserInfo/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                dispatch(fetchUsercSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchUserFailed(err))
            })
    }
}

export const postUserStart = () => {
    return {type: actionTypes.POST_USER_START}
}

export const postUserSuccess = () => {
    return {type: actionTypes.POST_USER_SUCCESS}
}

export const postUserFailed = () => {
    return {type: actionTypes.POST_USER_FAILED}
}

export const postUser = (firstName,lastName,fatherName,birthDay,nCode,mobile,home,address,postCode,token) => {
    return dispatch => {
        dispatch(postUserStart())
        Axios
            .post('http://192.168.1.190:8000/userAccount/api/UserInfo/',{
                "first_name": firstName,
                "last_name": lastName,
                "Father_Name": fatherName,
                "Birth_Day": birthDay,
                "National_Code": nCode,
                "Mobile_Number": mobile,
                "Home_Number": home,
                "Address": address,
                "Post_Code": postCode
            },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => dispatch(postUserSuccess(res.data)))
            .catch(err => dispatch(postUserFailed(err)))
    }
}

export const initUser = (userInfo) => {
    return {
        type: actionTypes.INIT_USER,
        userInfo: userInfo
    }
}