import React, { useState } from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";

/* 

npm i react-native-flexi-radio-button --save
npm i @types/react-native-flexi-radio-button

*/

export default function MyAccount() {

    const [id, setId] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')
    const [nickName, setNickName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [name, setName] = useState<string>('')

    const [msg, setMsg] = useState<string>('msg')


    return (
        <View>
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
                <TouchableHighlight>
                    <Text>id 확인</Text>
                </TouchableHighlight>
            </View>

            <View>
                <TextInput 
                    placeholder="패스워드"
                    value={pwd}
                    underlineColorAndroid='transparent'
                    onChangeText={(pwd) => setPwd(pwd)}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="이름"
                    value={name}
                    underlineColorAndroid='transparent'
                    onChangeText={(name) => setName(name)}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="닉네임"
                    value={nickName}
                    underlineColorAndroid='transparent'
                    onChangeText={(nickName) => setNickName(nickName)}
                />
            </View>
            <View>
           
            </View>
            <View>
                <TextInput 
                    placeholder="이메일"
                    value={email}
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => setEmail(email)}
                />
            </View>
            <View>
                <TextInput 
                    placeholder="전화번호"
                    value={phone}
                    underlineColorAndroid='transparent'
                    onChangeText={(phone) => setPhone(phone)}
                />
            </View>
        </View>
    )
}