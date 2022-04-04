import { DrawerActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Colors } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import * as L from '../../store/login'
import { logoutAction } from "../../store/login";
import { NavigationHeader } from "../../theme";

/* 

npm i react-native-flexi-radio-button --save
npm i @types/react-native-flexi-radio-button
npm i @actbase/react-daum-postcode
npm i react-native-webview

*/

export default function MyAccount() {

    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])
    const [memberId, setMemberId] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>(password)
    const [memberNickname, setMemberNickname] = useState<string>('')
    
    const [msg, setMsg] = useState<string>('msg')

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const goMyPage = useCallback(() => {
          dispatch(L.loginAction({memberId, memberNickname}))
          navigation.navigate('MyPage')
      }, [memberId, memberNickname, password, confirmPassword])

    //아이디 중복확인
    const idCheck = () => {
        
        if(memberId.trim() === '') {
            Alert.alert("아이디", "아이디를 입력해주세요")
            return memberId 
        } else {
            axios.post("http://192.168.219.102:3000/idCheck", null, {params: {memberId:memberId}})
                .then(function(response) {
                    console.log(response.data)
                    if(response.data == "yes") {
                       setMsg("사용할 수 없습니다.") 
                       setMemberId("")
                       Alert.alert("아이디 중복",msg)
                    } else {
                        return setMsg("사용할 수 있습니다.")
                    }
                })
                .catch(function(err) {
                    console.log(err)
                })
        }
    }
    
    const regist = () => {
        if(memberId.trim() === '') {
            Alert.alert('아이디를 입력해주세요')
        } else if(password.trim() === '') {
            Alert.alert('패스워드를 입력해주세요')
        } else if(memberNickname.trim() === '') {
            Alert.alert('닉네임을 입력해주세요')
        } else {
            axios.post("http://192.168.219.102:3000/regist", null, 
            {
                params: {
                    memberId: memberId,
                    memberPwd: password,
                    memberNickname: memberNickname
                }
            }).then(function(response) {
                console.log(response.data)
                if(response.data == "yes") {
                    Alert.alert("회원가입","가입되었습니다.", 
                                [{
                                    text:"확인",
                                    onPress: () => goMyPage()
                                }]
                    )
                } else {
                    Alert.alert("회원가입", "가입이 안되었습니다.")
                }
            }).catch((err:Error) => {
                console.log(err)
            })
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={[styles.topBar]} >
                <NavigationHeader title="회원가입" viewStyle={{}}
                    Left= {() => <Icon name="arrow-left" size={30} onPress={goBack} />}
                    Right= {() => <Icon name="cart-heart" size={30} />}
                    />
            </View>
            <View style={[styles.contentView]}>
                <View>
                    <TextInput 
                        placeholder="아이디 입력"
                        value={memberId}
                        placeholderTextColor='#003f5c'
                        onChangeText={(memberId) => setMemberId(memberId)}
                    />
                </View>
                <View>
                    <Text>{msg}</Text>
                    <TouchableHighlight onPress={() => idCheck()}>
                        <Text>id 확인</Text>
                    </TouchableHighlight>
                </View>

                <View>
                    <TextInput 
                        placeholder="패스워드"
                        value={password}
                        placeholderTextColor='#003f5c'
                        secureTextEntry
                        onChangeText={(password) => setPassword(password)}
                    />
                </View>
                <View>
                    <TextInput 
                        placeholder="패스워드 확인"
                        value={confirmPassword}
                        placeholderTextColor='#003f5c'
                        secureTextEntry
                        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                    />
                </View>
                <View>
                    <TextInput 
                        placeholder="닉네임"
                        value={memberNickname}
                        underlineColorAndroid='transparent'
                        onChangeText={(memberNickname) => setMemberNickname(memberNickname)}
                    />
                </View>
                <TouchableOpacity style={styles.accountBtn} onPress={() => {
                        if(password === confirmPassword){
                            regist()
                        } else Alert.alert('password is invalid')
                        
                    }}>
                    <Text>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
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
        flex:17,
        justifyContent:'center',
        alignItems:'center'
    },
    accountBtn: {
        width: 100,
        height: 30,
        backgroundColor: Colors.amber300,
        justifyContent: "center",
        alignItems: "center"
    }
})