import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, NavigationRouteContext } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Postcode from "react-native-daum-postcode";

export default function PaymentAddr({navigation}:any) {

    const [postcode, setPostcode] = useState<number | null>(null);
    const [addr, setAddr] = useState('');
    const [extraAddr, setExtraAddr] = useState('');

    return (
        <View 
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <Postcode
                style={{ width: 400, height: 200 }}
                jsOptions={{ animation: true }}
                onSelected={(data) => {
                    setPostcode(data.zonecode);
                    setAddr('');
                    setExtraAddr('');
                    if (data.userSelectedType == 'R') {
                        // 도로명 주소를 선택한 경우
                        setAddr(data.roadAddress);

                        // 법정동명이 있는 경우, 법정동은 마지막 문자가 동, 로, 가로 끝남.
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            setExtraAddr(data.bname);

                            if (data.buildingName !== '' && data.apartment === 'Y') {
                                setExtraAddr((prev) => {
                                    return prev !== '' ? `${prev}, ${data.buildingName}` : `${data.buildingName}`;
                                });
                            }
                        } else {
                            setExtraAddr('');
                        }

                        // console.log(data.zonecode)
                        // console.log(data.roadAddress)
                        // console.log(data.jibunAddress)
                    } else {
                        // 지번 주소를 선택한 경우 
                        setExtraAddr(data.jibunAddress);
                    }

                    
                    AsyncStorage.setItem('addrData', JSON.stringify({
                        zipcode: data.zonecode,
                        roadAddr: data.roadAddress,
                        pastAddr: data.jibunAddress,
                    }));

                    navigation.navigate('paymentInfo');
                }} 
                onError={(err) => {
                    throw new Error("Function not implemented.");
                }}
            />

            <Text>우편번호: {postcode}</Text>
            <Text>주소: {addr}</Text>
        </View>
    )
}