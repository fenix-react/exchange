import * as actions from '../actionTypes'

const initialState = {
    darkmode: false
}

const UiReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.DARK_LIGHT:
            return{
                ...state,
                darkmode: !state.darkmode
            }
    
        default:
           return state;
    }
}

export default UiReducer
