import AsyncStorage from "@react-native-async-storage/async-storage";
import IMP from "iamport-react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Loading = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, color: "#000"}}>잠시만 기다려 주세요...</Text>
        </View>
    )
}

export default function Payment({ navigation }:any) {

    // 결제시 Iamport Module에 전송할 값을 객체 형태로 세팅
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
                // 결제 하지 않고 뒤로 돌아갈 때 메모리 누수를 방지하기 위해 removeItem 메소드 사용
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

        // 결제 성공시
        if (resp.imp_success === 'true') {
            /* 
                네비게이션 통해서 key-value 형태로 Iamport 모듈에 전달한 값을 결제 성공 화면으로 전달(백엔드로 넘기기 위해서) 
                공식 문서에서 다음 화면으로 넘기기위해 replace 메소드를 사용해 전환할 화면과 넘길 정보를 매개변수로 사용하라고 기술하였으나,
                메모리 누수 방지를 위해 AsyncStorage에서 데이터를 제거하기 때문에 객체형태로 별도 전달 ==> navigate 메소드를 통해 객체형태로 전달
            */
            navigation.navigate('paymentResult', {"key": paymentInform});
            //navigation.replace('paymentResult', resp);        // 원래 방법
            //navigation.navigate('paymentResult', JSON.stringify(paymentInform));      // JSON.stringify로 해도 안됨...
            
        } else {
            // 결제 실패 시 imp_success가 false로 지정되며, 이 때 결제 실패 화면으로 이동함.
            navigation.replace('paymentFailed', resp);
        }
    }

    return (
        // 빈태그로 묶어줍니다.
        <>
            {/* Node Module 설치 확인 필(iamport-react-native) */}
            <IMP.Payment 
                userCode={'imp86589899'} // 가맹점 고유코드
                data={paymentInform}    // 모듈에 전송할 데이터
                loading={<Loading />}   // 모듈 로딩 시 보여줄 컴포넌트
                callback={callBack}     // 결제 성공, 실패 시 처리될 콜백함수
            />
        </>
    )
    
    
}