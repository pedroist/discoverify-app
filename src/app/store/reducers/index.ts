import { authReducer, authReducerState } from './authReducer';
import { ActionReducerMap } from '@ngrx/store';

interface appState {
    authReducer: authReducerState
}

export const reducers: ActionReducerMap<appState> = {
    authReducer: authReducer
}