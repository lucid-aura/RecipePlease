import Postcode from "@actbase/react-daum-postcode";
import { NavigationRouteContext, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Modal, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { Colors, RadioButton } from "react-native-paper";


/* 

npm i react-native-flexi-radio-button --save
npm i @types/react-native-flexi-radio-button
npm i @actbase/react-daum-postcode
npm i react-native-webview

*/

export default function MyAccount() {

    const [id, setId] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')
    const [nickname, setNickname] = useState<string>('')
    
    const [msg, setMsg] = useState<string>('msg')

    const [isModal, setModal] = useState(false)
    const navigation = useNavigation()
    
    //아이디 중복확인
    const idCheck = () => {
        
        if(id.trim() === '') {
            Alert.alert("아이디", "아이디를 입력해주세요")
            return id 
        } else {
            axios.post("http://192.168.219.102:3000/idCheck", null, {params: {memberId:id}})
                .then(function(response) {
                    console.log(response.data)
                    if(response.data == "yes") {
                       setMsg("사용할 수 없습니다.") 
                       setId("")
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
        if(id.trim() === '') {
            Alert.alert('아이디를 입력해주세요')
        } else if(pwd.trim() === '') {
            Alert.alert('패스워드를 입력해주세요')
        } else if(nickname.trim() === '') {
            Alert.alert('닉네임을 입력해주세요')
        } else {
            axios.post("http://192.168.219.102:3000/regist", null, 
            {
                params: {
                    memberId: id,
                    memberPwd: pwd,
                    memberNickname: nickname
                }
            }).then(function(response) {
                console.log(response.data)
                if(response.data == "yes") {
                    Alert.alert("회원가입","가입되었습니다.", 
                                [{
                                    text:"확인",
                                    onPress: () => navigation.navigate("MyPage")
                                }]
                    )
                } else {
                    Alert.alert("회원가입", "가입이 안되었습니다.")
                }
            }).catch(function(err) {
                console.log(err)
            })
        }
    }
    
    return (
        <View style={styles.container}>
            <Text>회원가입</Text>
            <View>
                <TextInput 
                    placeholder="아이디"
                    value={id}
                    underlineColorAndroid='transparent'
                    onChangeText={(id) => setId(id)}
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
                    value={pwd}
                    underlineColorAndroid='transparent'
                    secureTextEntry
                    onChangeText={(pwd) => setPwd(pwd)}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="닉네임"
                    value={nickname}
                    underlineColorAndroid='transparent'
                    onChangeText={(nickname) => setNickname(nickname)}
                />
            </View>
            <TouchableOpacity style={styles.accountBtn} onPress={() => regist()}>
                <Text>회원가입</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    accountBtn: {
        width: 100,
        height: 30,
        backgroundColor: Colors.amber300,
        justifyContent: "center",
        alignItems: "center"
    }
})