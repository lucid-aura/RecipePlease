import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import IMP from "iamport-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Loading = (props:any) => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, color: "#000"}}>잠시만 기다려 주세요...</Text>
        </View>
    )
}

export default function Payment({ navigation }:any) {

    // 결제시 Iamport Module에 전송할 값을 세팅
    const [paymentInform, setPaymentInform] = useState({
        pg: '',
        pay_method: '',
        merchant_uid: '',
        name: '',
        amount: 0,
        buyer_email: '',
        buyer_name: '',
        buyer_tel: '',
        buyer_addr: '',
        buyer_detail_addr: '',
        buyer_postcode: '',
        app_scheme: '',
        escrow: false
    });

    // AsyncStorage로 저장해서 받아온 값을 poaymentInfo에 넣어줌.
    const getPaymentInform = async () => {
        let payInform = await AsyncStorage.getItem('payment');
        try {
            if (payInform !== null) {
                setPaymentInform(JSON.parse(payInform));
                // 결제 하지 않고 뒤로 돌아갈 때 메모리 누수 방지
                AsyncStorage.removeItem('payment');
            }
        } catch (err) {
            console.log(err);
        }
    }

    getPaymentInform();

    // Iamport 모듈 실행에 대한 콜백함수
    const callBack = (resp:any) => {
        // console.log(resp);
        if (resp.imp_success === 'true') {
            navigation.navigate('paymentResult', {"key": paymentInform});
            //navigation.replace('paymentResult', resp);        // 원래 방법
            //navigation.navigate('paymentResult', JSON.stringify(paymentInform));      // JSON.stringify로 해도 안됨...
            
        } else {
            navigation.replace('paymentFailed', resp);
        }
    }

    return (
        <>
            {/* Node Module 설치 확인 필(iamport-react-native) */}
            <IMP.Payment 
                userCode={'imp86589899'} 
                data={paymentInform} 
                loading={<Loading />}
                callback={callBack}
            />
        </>
    )
    
    
}