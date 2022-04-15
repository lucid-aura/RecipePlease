import { KakaoOAuthToken, KakaoProfile, login, logout, getProfile as getKakaoProfile, unlink } from "@react-native-seoul/kakao-login";
import axios from "axios";
import config from "../../project.config"

// 로그인
export const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    console.log(JSON.stringify(token))

    let userInfo:string[]= (await getProfile()).split(" ")
    console.log("userInfo: " + userInfo[0])
    
    axios.post(config.address + "regist", null, 
    {
        params: {
            memberId: userInfo[0],
            memberNickname: userInfo[1],
        }
    }).then(function(response) {
        if(response.data == "yes") {
            console.log("로그인 및 회원가입 되었습니다.")
        } else {
            console.log("로그인 되었습니다.")
        }
    })
    
};

// 로그아웃
export const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

};

// 프로필 조회
export const getProfile = async (): Promise<string> => {
    const profile: KakaoProfile  = await getKakaoProfile();
    console.log( JSON.stringify(profile))
    return profile.id +" "+ profile.nickname + " " + profile.email + " " + profile.gender 
};

export const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();

};
/*
export const test = async (accessToken:any) => {
    axios.post("https://kapi.kakao.com/v2/user/me", null, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                property_keys: ["properties.nickname", "properties.profile_image", "properties.thumbnail_image	", "kakao_account.email","kakao_account.gender"]
            },
        }).then(function (response) {
            console.log(response.data)

        }).catch(function (error) {
            console.log(error)
            //Alert.alert("추가되지 않았습니다.")
        })
}
*/