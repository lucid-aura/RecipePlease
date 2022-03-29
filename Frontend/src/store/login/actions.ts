import type * as T from './types'

export const loginAction = (loggedUser: T.User): T.LoginAction => ({
    type: 'login',
    loggedUser
})

export const logoutAction = (): T.LogoutAction => ({
    type:'logout'
})