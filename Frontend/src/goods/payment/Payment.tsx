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
        buyer_postcode: '',
        app_scheme: '',
        escrow: false
    });

    const getPaymentInform = async () => {
        let payInform = await AsyncStorage.getItem('payment');
        try {
            if (payInform !== null) {
                setPaymentInform(JSON.parse(payInform));
                AsyncStorage.removeItem('payment'); // 결제 하지 않고 뒤로 돌아갈 때 메모리 누수 방지
            }
        } catch (err) {
            console.log(err);
        }
    }

    getPaymentInform();

    const callBack = (resp:any) => {
        // console.log(resp);
        if (resp.imp_success === 'true') {
            navigation.replace('paymentResult', resp);
        } else {
            navigation.replace('paymentFailed', resp);
        }
    }

    return (
        <>
            {/* <Text>{data.pg}로 결제 테스트하기</Text> */}
            <IMP.Payment 
                userCode={'imp86589899'} 
                data={paymentInform} 
                loading={<Loading />}
                callback={callBack}
            />
        </>
    )
    
    
}