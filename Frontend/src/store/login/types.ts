import {Action} from 'redux'

export type User = {
    memberId: string
    memberNickname: string
    memberEmail?: string
    memberPhone?: string
    memberCoin?: string
    memberMainAddr?: string
    memberDetailAddr?: string
    memberZipcode?: string
    memberName?: string
    memberGender?: string
    memberGrade?: string    
}

export type State = {
    loggedIn:boolean
    loggedUser: User
}
export type LogoutAction = Action<'logout'>
export type LoginAction = Action<'login'> & {   // 로그인했을때 사용자의 정보를 리듀서로 넘겨야함.
    loggedUser: User
}

export type Actions = LogoutAction | LoginAction    // 로그인 관련 액션은 로그인과 로그아웃 두개.