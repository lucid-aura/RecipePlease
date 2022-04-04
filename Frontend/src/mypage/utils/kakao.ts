import { KakaoOAuthToken, KakaoProfile, login, logout, getProfile as getKakaoProfile, unlink } from "@react-native-seoul/kakao-login";
import axios from "axios";
import { Value } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import * as L from "../../store/login"
import address from "../../project.config"

// 로그인
export const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    console.log(JSON.stringify(token))

    let userInfo:string[]= (await getProfile()).split(" ")
    console.log("userInfo: " + userInfo[0])
    
    axios.post(address + "regist", null, 
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
    const profile: KakaoProfile = await getKakaoProfile();
    JSON.stringify(profile)
    return profile.id +" "+ profile.nickname
};

export const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();

};