import { KakaoOAuthToken, KakaoProfile, login, logout, getProfile as getKakaoProfile, unlink } from "@react-native-seoul/kakao-login";
import { useNavigation } from "@react-navigation/native";

const navigation = useNavigation()
// 로그인
export const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    if(token != null || token != undefined) {
        
        console.log(JSON.stringify(token))
    }
};

// 로그아웃
export const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

};

// 프로필 조회
export const getProfile = async (): Promise<void> => {
    const profile: KakaoProfile = await getKakaoProfile();

    console.log(JSON.stringify(profile))

};

export const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();

};