import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PaymentResult({ navigation, route }:any) {
    
    /* 
        Payment 컴포넌트에서 Iamport 모듈의 data 속성에 전달해주는 값을 그대로 가져온다.
        Payment 컴포넌트에서 사용자가 임의로 결제를 취소하는 경우 메모리 누수가 발생하므로
        이를 방지하기 위해 AsyncStorage가 remove되도록 했기 때문에 값을 가져올 수 없다.
        이 때 data에 넣어주는 값은 JavaScript 객체이고, 이 값을 PaymentResult로 가져오기 위해
        Iamport의 콜백함수에서 navigate 메소드에 data를 전달하는데, key-value 형태로 값을 가져와야 이 컴포넌트에서 불러올 수 있다.
        그냥 getter로 전달하려고 했더니 안된다...
    */
    // console.log(route.params.key);

    const paymentData = route.params.key;
    console.log(paymentData);

    // 결제 성공시 배송 및 주문 정보를 axios로 addGoodsShoppingList 컨트롤러에 넘겨서 처리
    useEffect(() => {
        axios.post('http://192.168.0.13:3000/payment/addGoodsShoppingList', null, { params: {
            memberId: paymentData.buyer_name,
            paymentPay: paymentData.amount,
            paymentMainAddr: paymentData.buyer_addr,
            paymentDetailAddr: paymentData.buyer_detail_addr,
            paymentZipcode: paymentData.buyer_postcode
        }})
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }, []);
    
    // addPaymentList 컨트롤러에 넘기기
    useEffect(() => {
        axios.post('http://192.168.0.13:3000/payment/addPaymentList', null, { params: {
            paymentSeq: 2,
            memberId: paymentData.buyer_name,
            purchaseProduceSeq: 3,
            paymentListCategory: '굿즈',
            paymentListPay: paymentData.amount
        }})
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>결제가 완료되었습니다!</Text>
            <View style={styles.btnGroup}>
                <TouchableOpacity 
                    style={[styles.btn, styles.btnPrimary]}
                    // onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.btnText}>상세 주문 정보</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.btn, styles.btnBack]}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.btnText}>계속 쇼핑하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },  // 전체 뷰 조정
    title: {
        color: '#000',
        fontWeight: '800',
        fontSize: 25
    },  // 결제 완료 메시지 
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  // 버튼 그룹
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 40,
        marginTop: 20,
        width: '40%',
    },  // 버튼 각각에 대한 스타일
    btnText: {
        color: "#fff",
        fontSize: 17,
    },  // 버튼 텍스트
    btnPrimary: {
        backgroundColor: '#3064b8',
    },  // 파란버튼
    btnBack: {
        backgroundColor: '#bd4646'
    }   // 돌아가기 버튼
})