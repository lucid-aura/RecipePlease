import Postcode from "@actbase/react-daum-postcode";
import React, { useState } from "react";
import { Alert, Button, Modal, Text, TextInput, TouchableHighlight, View } from "react-native";
import { RadioButton } from "react-native-paper";

/* 

npm i react-native-flexi-radio-button --save
npm i @types/react-native-flexi-radio-button
npm i @actbase/react-daum-postcode
npm i react-native-webview

*/

export default function MyAccount() {

    const [id, setId] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')
    const [nickName, setNickName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [gender, setGender] = useState<string>('mail')
    const [name, setName] = useState<string>('')

    const [msg, setMsg] = useState<string>('msg')

    const[isModal, setModal] = useState(false)
    const[address, setAddress] = useState<string>('')
    const[zipCode, setZipCode] = useState<string>('')
    //zonecode => 우편번호 address => 주소

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
            <View style={{flexDirection: 'row'}}>
            <Text>남자</Text>
                <RadioButton
                    value='mail'
                    status={ gender === 'mail' ? 'checked' : 'unchecked'}
                    onPress={()=> setGender('mail')}>
                </RadioButton>
                <Text>여자</Text>
                <RadioButton
                    value='femail'
                    status={ gender === 'femail' ? 'checked' : 'unchecked'}
                    onPress={()=> setGender('femail')}>
                    
                </RadioButton>
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

            <View>
                <Modal
                    visible={isModal}
                    animationType="slide">
                    <Postcode 
                        style={{ width: 320, height: 320 }}
                        jsOptions={{ animation: true, hideMapBtn: true }}
                        onSelected={data => {
                            Alert.alert(JSON.stringify(data));
                            console.log(JSON.stringify(data))
                            setAddress(data.address) 
                            setZipCode(data.zonecode.toString())
                            console.log(address)
                            console.log(zipCode)
                            setModal(false);
                        }} 
                        onError={function (error: unknown): void {
                            throw new Error("Function not implemented.");
                        } }   />
                    <Button title='되돌아가기' onPress={() => setModal(false)} />
                </Modal>
                <Button title='주소찾기' onPress={() => setModal(true)}></Button>

                <Text>{zipCode}</Text>
                <Text>{address}</Text>
            </View>

        </View>
    )
}