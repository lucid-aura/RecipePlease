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
    // 서버에서 회원 가입을 성공적으로 했다고 가정
    U.writeToStorage(loggedUserkey, JSON.stringify(loggedUser))
        .then(() => {
            dispatch(loginAction(loggedUser))
        })
        .catch((e) => { // 저장할때 발생하는 오류 무시.
            dispatch(loginAction(loggedUser))   
        })
}