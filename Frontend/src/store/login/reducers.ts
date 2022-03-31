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

const initialLoggedUser: T.User = {memberId:'', memberNickname:''}
const loggedUserReducer = (state = initialLoggedUser, action: T.Actions) => {   // 과거의 상태(매개변수 state)에서 현재 가지고 있는 상태(state)를 유지해줌.
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