import * as actionTypes from '../actionTypes'
import Axios from 'axios'

export const fetchBankStart = () => {
    return {type: actionTypes.FETCH_BANK_START}
}

export const fetchBankSuccess = (data) => {
    return {type: actionTypes.FETCH_BANK_SUCCESS, bankAccounts: data.UserBankAccount}
}

export const fetchBankFailed = (error) => {
    return {type: actionTypes.FETCH_BANK_FAILED, error: error}
}

export const fetchBank = (token) => {
    return dispatch => {
        dispatch(fetchBankStart())
        Axios
            .get('http://192.168.1.190:8000/userAccount/api/UserBankAccount/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => dispatch(fetchBankSuccess(res.data)))
            .catch(err => dispatch(fetchBankFailed(err)))
    }
}

export const postBankStart = () => {
    return {type: actionTypes.FETCH_BANK_START}
}

export const postBankSuccess = () => {
    return {type: actionTypes.FETCH_BANK_SUCCESS}
}

export const postBankFailed = (error) => {
    return {type: actionTypes.FETCH_BANK_FAILED, error: error}
}

export const postBank = (shaba, card, bank, token) => {
    return dispatch => {
        dispatch(postBankStart())
        Axios.post('http://192.168.1.190:8000/userAccount/api/UserBankAccount/', {
            "Sheba_Number": shaba,
            "Card_Number": card,
            "Bank_Name": bank
        }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => dispatch(postBankSuccess()))
            .catch(err => dispatch(postBankFailed(err)))
    }
}