import {combineReducers} from 'redux'
import * as L from './login'

export const rootReducer = combineReducers({
    login: L.reducer
})
