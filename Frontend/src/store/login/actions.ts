import { Dispatch } from 'redux'
import type * as T from './types'
import * as U from '../../mypage/utils'

export const loginAction = (loggedUser: T.User): T.LoginAction => ({
    type: 'login',
    loggedUser
})

export const logoutAction = (): T.LogoutAction => ({
    type:'logout'
})

export const loggedUserkey = 'loggedUser'

export const signUpAction = (loggedUser: T.User) => (dispatch: Dispatch) => {
    U.writeToStorage(loggedUserkey, JSON.stringify(loggedUser))
        .then(() => {
            dispatch(loginAction(loggedUser))
        })
        .catch((e) => { 
            dispatch(loginAction(loggedUser))   
        })
}