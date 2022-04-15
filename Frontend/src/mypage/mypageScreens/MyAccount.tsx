import { DrawerActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors, RadioButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import * as L from '../../store/login'
import { NavigationHeader } from "../../theme";
import config from "../../project.config"
import { checkIdRule, checkPasswordRule } from "../utils";


/* 

npm i react-native-flexi-radio-button --save
npm i @types/react-native-flexi-radio-button
npm i @actbase/react-daum-postcode
npm i react-native-webview

*/

export default function MyAccount() {

    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])
    const [memberId, setMemberId] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState(password)
    const [memberNickname, setMemberNickname] = useState('')
    const [msg, setMsg] = useState('')
    const [checked, setChecked] = useState("남자")

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const goLoginPage = useCallback((response) => {
        dispatch(L.signUpAction({
            memberId: response.memberId, 
            memberNickname: response.memberNickname,
            memberEmail: response.memberEmail,
            memberPhone: response.memberPhone,
            memberName: response.memberName,
            memberCoin: response.memberCoin,
            memberGender: response.memberGender,
            memberGrade: response.memberGrade,
            memberMainAddr: response.memberMainAddr,
            memberDetailAddr: response.memberDetailAddr
        }))
        navigation.navigate('Login')
      }, [memberId, memberNickname, password, confirmPassword])

    //아이디 중복확인
    const idCheck = () => {
        
        if(memberId.trim() === '') {
            Alert.alert("아이디", "아이디를 입력해주세요")
            return memberId 
        } else {
            axios.post(config.address + "idCheck", null, {params: {memberId:memberId}})
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
            console.log(`memberId: ` + memberId + " password: " + password)
            const chkPassword = checkPasswordRule(password) // 비밀번호 정규식
            const chkId = checkIdRule(memberId) // 아이디 정규식
            if(chkPassword && chkId) {
                axios.post(config.address + "regist", null, 
                {
                params: {
                    memberId: memberId,
                    memberPwd: password,
                    memberNickname: memberNickname,
                    memberGender: checked
                }
                }).then((response) => {
                    console.log(response.data)
                    if(response.data.memberId == memberId) {
                        Alert.alert("회원가입","가입되었습니다.", 
                                    [{
                                        text:"확인",
                                        onPress: () => goLoginPage(response.data)
                                    }]
                        )
                    } else {
                        Alert.alert("회원가입", "가입이 안되었습니다.")
                    }
                }).catch((err:Error) => {
                    console.log(err)
                })
            } else {
                return Alert.alert("8자리 이상, 영문(소문자/대문자), 숫자, 특수문자 모두 포함해야 합니다.")
            }
            
        }
    }
    
    

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <View style={[styles.topBar]} >
                    <NavigationHeader title="회원가입" viewStyle={{}}
                        Left= {() => <Icon name="arrow-left" size={40} onPress={goBack} />}
                        Right= {() => <Icon name="cart-heart" size={40} />}
                        />
                </View>
                <View style={[styles.contentView]}>
                    <View style={[styles.contentBox]}>
                        <View style={[styles.textInput]}>
                            <TextInput 
                                placeholder="아이디 입력"
                                value={memberId}
                                placeholderTextColor='#003f5c'
                                onChangeText={(memberId) => setMemberId(memberId)}
                            />
                        </View>
                        <View style={[styles.check]}>
                            <View>
                                <Text style={{fontSize:17}}>{msg}</Text>
                            </View>
                            <Pressable style={{borderWidth:0.3, padding:5}} onPress={() => idCheck()}>
                                <Text>Id 중복 확인</Text>
                            </Pressable>
                        </View>
                        <View style={[styles.contentBox, {flexDirection:'row'}]}>
                            <View style={{flexDirection:'row', }}>
                                
                                <RadioButton 
                                    value= '남자'
                                    status={ checked === '남자' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('남자')}
                                />
                                <Text style={{marginTop:8}}>남자</Text>
                            </View>
                            <View style={{flexDirection:'row',marginLeft:10 }}>
                                <RadioButton 
                                    value= '여자'
                                    status={ checked === '여자' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('여자')}
                                />
                                <Text style={{marginTop:8}}>여자</Text>
                            </View>
                        </View>
                        <View style={[styles.textInput]}>
                            <TextInput 
                                placeholder="패스워드"
                                value={password}
                                placeholderTextColor='#003f5c'
                                secureTextEntry
                                onChangeText={(password) => setPassword(password)}
                            />
                        </View>
                        <View style={[styles.textInput]}>
                            <TextInput 
                                placeholder="패스워드 확인"
                                value={confirmPassword}
                                placeholderTextColor='#003f5c'
                                secureTextEntry
                                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                            />
                        </View>
                        <View style={[styles.textInput]}>
                            <TextInput 
                                placeholder="닉네임"
                                value={memberNickname}
                                placeholderTextColor='#003f5c'
                                underlineColorAndroid='transparent'
                                onChangeText={(memberNickname) => setMemberNickname(memberNickname)}
                            />
                        </View>
                        <TouchableOpacity style={styles.accountBtn} onPress={() => {
                            
                                if(msg == '') {
                                    Alert.alert('아이디 중복확인을 해주세요.')
                                } else {
                                    if(password === confirmPassword){
                                        regist()
                                    } else Alert.alert('password is invalid')
                                }
                               
                                
                            }}>
                            <Text>회원가입</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topBar: {
        borderWidth: 0.5,
        borderRadius:1
    },
    contentView: {
        flex:1,
        justifyContent:'center',
        width:'70%',
    },
    contentBox: {
        alignItems:'center'

    },
    check: {
        width:'70%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
        marginBottom:10

    },
    accountBtn: {
        width: 100,
        height:30,
        backgroundColor: Colors.amber300,
        justifyContent: "center",
        alignItems: "center",
        borderWidth:0.3,
        marginTop:10
    },
    textInput: {
        borderWidth: 0.3,
        width: '70%',
        margin:10

    },
})