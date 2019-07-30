import { ACTION_LOGIN } from '../actions/authActions';
import { ACTION_LOGOUT } from '../actions/authActions';

export interface authReducerState {
    login: boolean
}

const initialState: authReducerState = {
    login: false
}

export function authReducer(state = initialState, action): authReducerState {
    switch (action.type) {
        case ACTION_LOGIN:
            return {
                ...state,
                login: true
            }
        case ACTION_LOGOUT:
            return {
                ...state,
                login: false
            }
    }
    return state;
}