import {combineReducers} from 'redux'
import * as L from './login'
import * as D from './drawer'

export const rootReducer = combineReducers({
    login: L.reducer,
    drawer: D.reducer
})
