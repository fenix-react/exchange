import * as actions from '../actionTypes'

const initialState = {
    banksAccounts: null,
    loading: null,
    error: null
}

const BankReducer = (state=initialState,action) => {
    switch (action.type) {
        case actions.FETCH_BANK_START:
            return {
                ...state,
                loading: true
            }
        case actions.FETCH_BANK_SUCCESS:
            return {
                ...state,
                loading: false,
                banksAccounts: action.bankAccounts
            }
        case actions.FETCH_BANK_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
            
    
        default:
            return state
    }
}

export default BankReducer