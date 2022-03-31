import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavigationHeader } from "../theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getProfile, signOutWithKakao } from "./utils";
import { KakaoOAuthToken, login } from "@react-native-seoul/kakao-login";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import * as L from '../store/login'
import * as U from './utils'

export default function Login() {
    const navigation = useNavigation()
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])

    // 로그인 훅
    // 카카오 아이디
    const [memberId, setMemberId] = useState<string>('')
    const [memberNickname, setMemberNickname] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    
    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log
    const dispatch = useDispatch()

    let userInfo:string[]
    //카카오 아이디 가져오기
    const signInWithKakao = async (): Promise<void> => {
        const token: KakaoOAuthToken = await login();
    
        console.log(JSON.stringify(token))
        
        userInfo= (await getProfile()).split(" ")
        console.log("userInfo: " + userInfo[0])
        
        axios.post("http://192.168.219.102:3000/regist", null, 
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
        }).catch((err:Error) => console.log(err.message))
        setMemberId(userInfo[0])
        setMemberNickname(userInfo[1])
        dispatch(L.loginAction({memberId,memberNickname}))
        navigation.navigate("MyPage")
    };
    const kakao = useCallback(() => {
        getProfile().then(value => {
            userInfo = value.split(" ")
            setMemberId(userInfo[0])
        })
    }, [])
    kakao()
    console.log("loggedIn: "+ !loggedIn)
    if(loggedIn) {
        navigation.navigate("MyPage")
    } 

    const userLogin = () => {
        axios.post("http://192.168.219.102:3000/login", null, 
        {
            params: {
                memberId: memberId,
                memberPwd: password
        }
        }).then(function(response) {
            console.log(response.data.memberId)
            if(response.data.memberId == memberId) {
                console.log("로그인 되었습니다.")
                dispatch(L.loginAction({ memberId, memberNickname, password }))
                navigation.navigate("MyPage")
            } else {
                console.log("아이디 및 비밀번호가 틀립니다.")
            }
        }).catch((err:Error) => console.log(err.message))
    }

    // useEffect(() => {
    //     U.readFromStorage(L.loggedUserkey)
    //         .then((value) => {
    //             if(value.length > 0) {
    //                 const savedUser = JSON.parse(value)
    //                 setMemberId(savedUser.memberId)
    //                 setPassword(savedUser.password)
    //                 setMemberNickname(savedUser.memberNickname)
    //             }
    //         })
    //         .catch((e) => {})
    // }, [loggedIn])


    return(
        <View style={styles.container}>
        <NavigationHeader title="홈" 
        Left= {() => <Icon name="text-account" size={30} onPress={drawerOpen} />}
        Right= {() => <Icon name="cart-heart" size={30} />}
        />
        {/* 아이디 입력 */}
        <View>
            <TextInput
                placeholder="id를 입력해 주세요"
                placeholderTextColor='#003f5c'
                onChangeText = {(memberId) => setMemberId(memberId)} />
        </View>

        {/* 패스워드 입력 */}
        <View>
            <TextInput
                placeholder="패스워드를 입력해 주세요"
                placeholderTextColor='#003f5c'
                secureTextEntry={true}
                onChangeText = {(password) => setPassword(password)} />
        </View>

        {/* 로그인 버튼 */}
        <View>
            <TouchableOpacity onPress={() => userLogin()}>
                <Text>로그인</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={() => signInWithKakao()}>
                <Image source={require("./utils/kakao_login_medium_narrow.png")} />
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={() =>signOutWithKakao()}>
               <Text>로그아웃</Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={() => getProfile()}>
                <Text>프로필 조회</Text>
            </TouchableOpacity>
            <Text></Text>
        </View>
        {/* 회원가입 버튼 */}
        <View>
            <TouchableOpacity onPress={() => navigation.navigate('MyAccount')}>
                <Text>회원가입</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
}) 