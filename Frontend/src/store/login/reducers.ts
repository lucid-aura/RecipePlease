import * as T from './types'
import {combineReducers} from 'redux'

// 디스패치(액션)으로부터 받는곳
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
    //이걸 하지 않으면 자신이 처리하지 않은 액션에 대해서는 상태를 반환하지 않으므로 
    //타입 관점에서는 State 혹은 undefihned 타입을 반환하는 함수가 되어버리므로 리덕스의 설계원칙을 위반하게 된다.
}

export const reducer = combineReducers({
    loggedIn: loggedInReducer,      //loggedIn:AppState의 키, loggedInReducer는 reducer타입의 함수.
    loggedUser: loggedUserReducer
})