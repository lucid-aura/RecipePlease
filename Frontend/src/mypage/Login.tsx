import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NavigationHeader } from "../theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getProfile, signOutWithKakao, test } from "./utils";
import { KakaoOAuthToken, login } from "@react-native-seoul/kakao-login";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import * as L from '../store/login'
import config from "../project.config"
import * as D from "../store/drawer"
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";


export default function Login() {
    const navigation = useNavigation()
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    console.log("Login")
    
    // 로그인 훅
    // 카카오 아이디
    const [memberId, setMemberId] = useState('')
    const [memberNickname, setMemberNickname] = useState<string | null>('')
    const [password, setPassword] = useState('')
    
    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log
    const dispatch = useDispatch()
    console.log("loggedIn: "+ loggedIn + " loggedUser: " + loggedUser.memberEmail)

    let userInfo:string[]

    useEffect(() => {   // 처음 시작할때 로그인 체크.
        isSignedIn()
        kakao()
    },[])

    const goShoppingCart = () => {
        dispatch(D.drawerChangeFalseAction())
        navigation.dispatch(DrawerActions.openDrawer())
    }
    const goSetting = () => {
        dispatch(D.drawerChangeTrueAction())
        navigation.dispatch(DrawerActions.openDrawer())
    }

    const isSignedIn = async () => {    // 구글로그인 되어있는지 체크. 되어있으면 로그인하기.
        const isSignedIn = await GoogleSignin.isSignedIn();
        console.log("isSignedIn: " + isSignedIn)
        if(isSignedIn) {
            googleSignIn()
        }
    }

    const googleSignIn= async() => {    // 구글 로그인하기.
        await GoogleSignin.hasPlayServices()
        const userInfo = await GoogleSignin.signIn()
        console.log(userInfo)
        setMemberId(userInfo.user.id)
        setMemberNickname(userInfo.user.name)
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
                        memberDetailAddr: response.data.memberDetailAddr
                    }))
                } else if(response.data = '') {
                    console.log("실패")
                } else {
                    console.log("로그인 되었습니다.")
                    setPassword("")
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
                        memberDetailAddr: response.data.memberDetailAddr
                    }))
                }
            }).catch((err:Error) => {})
    }

    const googleSignOut = async () => { // 구글 로그아웃
        try {
          await GoogleSignin.signOut();
        } catch (error) {}
      };

    const signInWithKakao = async (): Promise<void> => {    //카카오 로그인
        const token: KakaoOAuthToken = await login();
        console.log("token: " + JSON.stringify(token))
        userInfo= (await getProfile()).split(" ")
        console.log("userInfo: " + userInfo)
        setMemberId(userInfo[0])
        setMemberNickname(userInfo[1])
        if(userInfo[3] == 'MAIL') {
            userInfo[3] = '남자'
        } else if(userInfo[3] == 'FEMAIL') {
            userInfo[3] = '여자'
        }
        
        axios.post(config.address + "regist", null, 
            {
                params: {
                    memberId: userInfo[0],
                    memberNickname: userInfo[1],
                    memberEmail: userInfo[2],
                    memberGender: userInfo[3]
                }
            }).then((response) => {
                if(response.data.memberId == memberId) {
                    console.log("로그인 및 회원가입 되었습니다.")
                    setPassword("")
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
                        memberDetailAddr: response.data.memberDetailAddr
                    }))
                } else if(response.data = '') {
                    console.log("실패")
                } else {
                    console.log("로그인 되었습니다.")
                    setPassword("")
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
                        memberDetailAddr: response.data.memberDetailAddr
                    }))
                }
            }).catch((err:Error) => console.log(err.message))
            
        }
  
    const kakao = useCallback(() => {   // 카카오 로그인 체크후 로그인 되었으면 로그인 하기.
            getProfile().then(value => {
                userInfo = value.split(" ")
                if(userInfo.length > 0){
                    console.log("koko")
                    dispatch(L.loginAction({
                        memberId: userInfo[0],
                        memberNickname: userInfo[1],
                        memberEmail: userInfo[2],
                        memberGender: userInfo[3]
                    }))
                    
                }
            })
    }, [memberId, memberNickname])
    
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
                        memberDetailAddr: response.data.memberDetailAddr
                }))
                
            } 
        }).catch((err:Error) => console.log(err.message))
    }

    const goMyfavoritePage = () => {
        navigation.navigate('MyFavoriteRecipe')
    }

    if(!loggedIn){  // 로그아웃 상태일 때
        return(
            <SafeAreaView style={styles.container}>
                <View style={[styles.topBar]}>
                    <NavigationHeader title="홈" viewStyle={{}}
                    Left= {() => <Icon name="text-account" size={40} onPress={drawerOpen} />}
                    Right= {() => <Icon name="cart-heart" size={40} />}
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
                    Left= {() => <Icon name="text-account" size={40} onPress={drawerOpen} />}
                    Right= {() => <Icon name="cart-heart" size={40} />} />
                </View>
                <View style={[styles.contentView]}>
                    <Text>마이페이지</Text>
                    <View style={[styles.contentBox]}>
                        <View >
                            <TouchableOpacity style={[styles.content]} onPress={() => {
                                signOutWithKakao()
                                googleSignOut()
                                dispatch(L.logoutAction())
                                console.log(loggedIn)
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