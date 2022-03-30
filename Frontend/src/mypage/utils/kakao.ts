import { KakaoOAuthToken, KakaoProfile, login, logout, getProfile as getKakaoProfile, unlink } from "@react-native-seoul/kakao-login";

// 로그인
export const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();

    console.log(JSON.stringify(token))
    
};

// 로그아웃
export const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

};

// 프로필 조회
export const getProfile = async (): Promise<string> => {
    const profile: KakaoProfile = await getKakaoProfile();
    JSON.stringify(profile.id)
    return profile.id
};

export const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();

};