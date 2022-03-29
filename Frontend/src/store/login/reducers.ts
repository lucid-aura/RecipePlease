import * as T from './types'
import {combineReducers} from 'redux'

const initialLoggedIn = false
const loggedInReducer = (state = initialLoggedIn, action: T.Actions) => {
    switch(action.type) {
        case 'login' :
            return true
        case 'logout' :
            return false
    }
    return state
}

const initialLoggedUser: T.User = {email:'', name:'', password:''}
const loggedUserReducer = (state = initialLoggedUser, action: T.Actions) => {
    switch(action.type) {
        case 'login':
            return {...state, ...action.loggedUser}
        case 'logout':
            return initialLoggedUser
    }
    return state
}

export const reducer = combineReducers({
    loggedIn: loggedInReducer,
    loggedUser: loggedUserReducer
})