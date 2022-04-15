import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavigationHeader } from "../theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getProfile, signOutWithKakao } from "./utils";
import { KakaoOAuthToken, login } from "@react-native-seoul/kakao-login";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import * as L from '../store/login'
import config from "../project.config"
import * as D from "../store/drawer"
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loggedUserkey } from "../store/login";

export default function Login() {
    const navigation = useNavigation()
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    
    // 로그인 훅
    // 카카오 아이디
    const [memberId, setMemberId] = useState('')
    const [memberNickname, setMemberNickname] = useState<string | null>('')
    const [password, setPassword] = useState('')
    
    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log
    const dispatch = useDispatch()
    console.log("loggedIn: "+ loggedIn + " loggedUser: " + JSON.stringify(loggedUser))

    useEffect(() => {
        GoogleSignin.configure()
        console.log(`GoogleSignin.configure(): ${GoogleSignin.configure()}`)
    })
    let userInfo:string[]

    const goShoppingCart = useCallback(() => {
        dispatch(D.drawerChangeFalseAction())
        navigation.dispatch(DrawerActions.openDrawer())
    },[])
    const goSetting = useCallback(() => {
        dispatch(D.drawerChangeTrueAction())
        navigation.dispatch(DrawerActions.openDrawer())
    },[])

    const googleSignIn= useCallback(async() => {    // 구글 로그인하기.
        try{
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        console.log(userInfo)
        axios.post(config.address + "regist", null, 
            {
                params: {
                    memberId: userInfo.user.id,
                    memberNickname: userInfo.user.name,
            }
            }).then((response) => {
                if(response.data == memberId) {
                    console.log("로그인 및 회원가입 되었습니다.")
                    setPassword("")
                    setMemberId(userInfo.user.id)
                    setMemberNickname(userInfo.user.name)
                    dispatch(L.loginAction({ 
                        memberId: response.data.memberId, 
                        memberNickname: response.data.memberNickname,
                        memberEmail: response.data.memberEmail,
                        memberPhone: response.data.memberPhone,
                        memberName: response.data.memberName,
                        memberCoin: response.data.memberCoin,
                        memberGender: response.data.memberGender,
                        memberGrade: response.data.memberGrade,
                        memberMainAddr: response.data.memberMainAddr,
                        memberDetailAddr: response.data.memberDetailAddr,
                        memberZipcode: response.data.Zipcode,
                        memberThumbnail: userInfo.user.photo,
                        idSeq:2
                    }))
                } else if(response.data == '') {
                    console.log("실패")
                } else {
                    console.log("로그인 되었습니다.")
                    setPassword("")
                    setMemberId(userInfo.user.id)
                    setMemberNickname(userInfo.user.name)
                    dispatch(L.loginAction({ 
                        memberId: response.data.memberId, 
                        memberNickname: response.data.memberNickname,
                        memberEmail: response.data.memberEmail,
                        memberPhone: response.data.memberPhone,
                        memberName: response.data.memberName,
                        memberCoin: response.data.memberCoin,
                        memberGender: response.data.memberGender,
                        memberGrade: response.data.memberGrade,
                        memberMainAddr: response.data.memberMainAddr,
                        memberDetailAddr: response.data.memberDetailAddr,
                        memberZipcode: response.data.Zipcode,
                        memberThumbnail: userInfo.user.photo,
                        idSeq:2
                    }))
                }
            }).catch((err:Error) => {})
        }catch(err) {err}
        
    },[memberId, memberNickname])

    const googleSignOut = useCallback(async () => { // 구글 로그아웃
        try {
          await GoogleSignin.signOut();
          console.log("구글 비동기 로그아웃")
        } catch (error) {}
      },[])

    const signInWithKakao = useCallback(async (): Promise<void> => {    //카카오 로그인
        const token: KakaoOAuthToken = await login();
        console.log("token: " + JSON.stringify(token))
        userInfo= (await getProfile()).split(" ")
        console.log("userInfo: " + userInfo)
        
        axios.post(config.address + "regist", null, 
            {
                params: {
                    memberId: userInfo[0],
                    memberNickname: userInfo[1],
                    memberEmail: userInfo[2],
                    memberGender: userInfo[3]
            }
            }).then((response) => {
                console.log("response: " + JSON.stringify(response.data))

                if(response.data.memberId == memberId) {
                    console.log("로그인 및 회원가입 되었습니다.")
                    
                    dispatch(L.loginAction({ 
                        memberId: response.data.memberId, 
                        memberNickname: response.data.memberNickname,
                        memberEmail: response.data.memberEmail,
                        memberPhone: response.data.memberPhone,
                        memberName: response.data.memberName,
                        memberCoin: response.data.memberCoin,
                        memberGender: response.data.memberGender,
                        memberGrade: response.data.memberGrade,
                        memberMainAddr: response.data.memberMainAddr,
                        memberDetailAddr: response.data.memberDetailAddr,
                        memberZipcode: response.data.memberZipcode,
                        memberThumbnail: userInfo[4],
                        idSeq:1
                    }))
                } else if(response.data == '') {
                    console.log("실패")
                } else {
                    console.log("로그인 되었습니다.")
                    console.log("카카오로그인 받은 값: " + JSON.stringify(response.data))
                    dispatch(L.loginAction({ 
                        memberId: response.data.memberId, 
                        memberNickname: response.data.memberNickname,
                        memberEmail: response.data.memberEmail,
                        memberPhone: response.data.memberPhone,
                        memberName: response.data.memberName,
                        memberCoin: response.data.memberCoin,
                        memberGender: response.data.memberGender,
                        memberGrade: response.data.memberGrade,
                        memberMainAddr: response.data.memberMainAddr,
                        memberDetailAddr: response.data.memberDetailAddr,
                        memberZipcode: response.data.memberZipcode,
                        memberThumbnail: userInfo[4],
                        idSeq:1
                    }))
                }
            }).catch((err:Error) => console.log(err.message))
            
        },[memberId,memberNickname])

    const userLogin = () => {   // 일반 로그인
        console.log('userLogin')
        console.log(`memberId: ${memberId}`)
        if(password == '') {
            return Alert.alert('비밀번호를 입력해주세요.')
        }

        axios.post(config.address + "login", null, 
            {
                params: {
                    memberId: memberId,
                    memberPwd: password
            }
            }).then((response) => {
            
                if(response.data.memberId == memberId) {
                    console.log("로그인 되었습니다.")
                    AsyncStorage.getItem('thumbnail').then((value)=> {
                        console.log("thumbnail: "+ value)
                        dispatch(L.signUpAction({   
                            memberId: response.data.memberId, 
                            memberNickname: response.data.memberNickname,
                            memberEmail: response.data.memberEmail,
                            memberPhone: response.data.memberPhone,
                            memberName: response.data.memberName,
                            memberCoin: response.data.memberCoin,
                            memberGender: response.data.memberGender,
                            memberGrade: response.data.memberGrade,
                            memberMainAddr: response.data.memberMainAddr,
                            memberDetailAddr: response.data.memberDetailAddr,
                            memberZipcode: response.data.memberZipcode,
                            memberThumbnail: value,
                            idSeq: 3
                        }))
                    })
                
            } 
        }).catch((err:Error) => console.log(err.message))
    }

    if(!loggedIn){  // 로그아웃 상태일 때
        return(
            <SafeAreaView style={styles.container}>
                <View style={[styles.topBar]}>
                    <NavigationHeader title="홈"
                    Left= {() => <Icon name="text-account" size={40} onPress={goSetting} />}
                    Right= {() => <Icon name="cart-heart" size={40} onPress={goShoppingCart} />}
                    />
                </View>

                <View style={[styles.contentView]}>
                    {/* 아이디 입력 */}
                    <View style={[styles.contentBox]}>
                        <View style={[styles.content]}>
                            <TextInput
                                placeholder="id를 입력해 주세요"
                                placeholderTextColor='#003f5c'
                                onChangeText = {(memberId) => setMemberId(memberId)} />
                        </View>

                        {/* 패스워드 입력 */}
                        <View style={[styles.content]}>
                            <TextInput
                                placeholder="패스워드를 입력해 주세요"
                                placeholderTextColor='#003f5c'
                                secureTextEntry={true}
                                onChangeText = {(password) => setPassword(password)} />
                        </View>

                        {/* 로그인 버튼 */}
                        <View style={[styles.loginBox]}>
                            <TouchableOpacity style={[styles.loginBtn]} onPress={() => userLogin()}>
                                <Text>로그인</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => signInWithKakao()}>
                                <Image source={require("./utils/kakao_login_medium_narrow.png")} />
                            </TouchableOpacity>
                        </View>
                        {/* 구글 로그인 버튼 */}
                        <TouchableOpacity>
                            <GoogleSigninButton
                                style={{ marginTop:10,width: 192, height: 48 }}
                                size={GoogleSigninButton.Size.Standard}
                                color={GoogleSigninButton.Color.Light}
                                onPress={googleSignIn}
                                />
                        </TouchableOpacity>
                        
                        {/* 회원가입 버튼 */}
                        <View style={[styles.loginBox]}>
                            <TouchableOpacity style={[styles.loginBtn]} onPress={() => navigation.navigate('MyAccount')}>
                                <Text>회원가입</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    } else {    // 로그인 상태일 때
        return(
            <SafeAreaView style={[styles.container]}>
                <View style={[styles.topBar]}> 
                    <NavigationHeader title="홈" 
                    Left= {() => <Icon name="text-account" size={40} onPress={goSetting} />}
                    Right= {() => <Icon name="cart-heart" size={40} onPress={goShoppingCart} />} />
                </View>
                <View style={[styles.contentView]}>
                    <Text>마이페이지</Text>
                    <View style={[styles.contentBox]}>
                        <View >
                            <TouchableOpacity style={[styles.content]} onPress={() => {
                                dispatch(L.logoutAction())
                                signOutWithKakao()
                                console.log("동기1")
                                googleSignOut()
                                console.log("동기2")
                                AsyncStorage.removeItem(loggedUserkey)
                                navigation.navigate("Login")
                            }}>
                                <Text>로그아웃</Text>
                            </TouchableOpacity>
                        </View>
                        <View >
                            <TouchableOpacity style={[styles.content]} onPress={() => navigation.navigate('MyFavoriteRecipe')}>
                                    <Text>즐겨찾기</Text>
                            </TouchableOpacity>
                        </View>
                        <View >
                            <TouchableOpacity style={[styles.content]} onPress={() => navigation.navigate('MyInfo')}>
                                    <Text>내 정보</Text>
                            </TouchableOpacity>
                        </View>
                        <View >
                            <TouchableOpacity style={[styles.content]} onPress={() => navigation.navigate('MyUploadedRecipe')}>
                                    <Text>내가 쓴 레시피</Text>
                            </TouchableOpacity>
                        </View>
                        <View >
                            <TouchableOpacity style={[styles.content]} onPress={() => navigation.navigate('RecipeUpload')}>
                                    <Text>레시피 업로드</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topBar: {
        flex:1,
        borderWidth: 0.5,
        borderRadius:1
    },
    contentView: {
        flex:13,
        justifyContent:'center',
        alignItems:'center'
    },
    contentBox: {
        justifyContent:'center',
        alignItems:'center'
    },
    content: {
        borderWidth:1,
        borderRadius:10,
        width:200,
        marginTop: 10,
        justifyContent:'center',
        alignItems:'center'
    },
    loginBox: {
        borderWidth:1,
        borderRadius:10,
        width:100,
        marginTop: 10,
        marginBottom:10
    },
    loginBtn: {
        alignItems:'center',
        justifyContent:'center', 
        marginBottom:5,
        marginTop:5
    }
    
}) 