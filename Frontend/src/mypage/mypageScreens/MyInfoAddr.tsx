import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import Postcode from "react-native-daum-postcode";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { address } from "../../project.config";
import { AppState } from "../../store";
import * as L from "../../store/login"
// 주소 검색 관련 모듈
const MyInfoAddr = () => {

    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedUser} = log
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [zipcode, setZipcode] = useState<number>(0);  // 우편번호
    const [mainAddr, setMainAddr] = useState('');                           // 도로명 또는 지번 주소
    const [detailAddr, setDetailAddr] = useState('');                 // 상세주소

    const addrChange = () => {
        axios.post(address+"updateAddr", null, {
            params: {
                memberId: loggedUser.memberId,
                memberZipcode: zipcode,
                memberMainAddr: mainAddr,
                memberDetailAddr: detailAddr
            }
        }).then((response) => {
            if(response.data == "success") {
                Alert.alert("수정이 완료되었습니다.")
                dispatch(L.loginAction({
                    ...loggedUser,
                    memberZipcode: zipcode,
                    memberMainAddr: mainAddr,
                    memberDetailAddr: detailAddr
                }))
                navigation.navigate("MyInfo")
            } else {
                Alert.alert("수정이 되지 않았습니다. 다시 입력해주세요.")
            }
        }).catch((err:Error) => console.log(err))
    } 
    return (
        
        <View 
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            {/* node module 설치 여부 확인 필(react-native-daum-postcode) */}
            <Postcode
                style={{ width: 400, height: 200 }}
                jsOptions={{ animation: true }}     // 애니메이션 타입 지정

                // 주소 검색 후 특정 주소 클릭 시
                onSelected={(data) => {
                    setZipcode(data.zonecode);
                    setMainAddr('');        // 초기화
                    setDetailAddr('');   // 초기화

                    // 도로명 주소를 선택한 경우
                    if (data.userSelectedType == 'R') {
                        setMainAddr(data.roadAddress);

                        // 법정동명이 있는 경우, 법정동은 마지막 문자가 동, 로, 가로 끝남.
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            setDetailAddr(data.bname);
                            
                            // 건물명이 있고 공통주택인 경우
                            if (data.buildingName !== '' && data.apartment === 'Y') {
                                setDetailAddr((prev) => {
                                    return prev !== '' 
                                           ? `${prev}, ${data.buildingName}` 
                                           : `${data.buildingName}`;
                                });
                            }
                        }
                        
                        // 확인용
                        // console.log(data.zonecode)
                        // console.log(data.roadAddress)
                        // console.log(data.jibunAddress)
                    } else {
                        // 지번 주소를 선택한 경우 
                        setDetailAddr(data.jibunAddress);
                    }

                    // 주소를 가지고 PaymentInfo 페이지로 이동하기 위해 AsyncStorage 사용
                    
                    
                    
                }}
                
                // 에러 발생시 
                onError={(err) => {
                    throw new Error("Function not implemented.");
                }}
            />
            <View style={[styles.resultBox]}>
                <View style={[styles.resultTextInput]}>
                    <TextInput 
                        value={"지번: "+ zipcode.toString()}
                        editable={false}                    
                    />
                    </View>
                <View style={[styles.resultTextInput]}>
                    <TextInput 
                        value={mainAddr}
                    />
                </View>
                <View style={[styles.resultTextInput]}>
                    <TextInput 
                        value={detailAddr}
                        onChangeText={(text) => setDetailAddr(text)}
                    />
                </View>
                <View style={[styles.resultButton]}>
                    <Pressable style={{padding:3}} onPress={addrChange}>
                        <Text>주소변경</Text>
                    </Pressable>
                </View>
            </View>
            {/* 확인용 */}
            {/* <Text>우편번호: {postcode}</Text>
            <Text>주소: {addr}</Text> */}

        </View>
        
    )
}

export default MyInfoAddr

const styles = StyleSheet.create({
    resultBox: {
        borderWidth: 0.3,
        padding: 10,
        margin:10,
        borderRadius: 5,
        width:'70%'
    },
    resultTextInput: {
        borderWidth:0.3
    },
    resultButton: {
        marginTop:10,
        alignSelf:'center',
        borderWidth:0.3,
        maxWidth:100,
        borderRadius: 5,
    }
})