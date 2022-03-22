import axios from "axios";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PaymentResult({ navigation }:any) {

    // 결제 성공시 배송 및 주문 정보를 axios로 백엔드에 넘겨서 처리
    // axios({
    //     url: '',
    //     method: 'post',
    //     headers: {"Content-Type": "application/json"},
    //     data: {},
    // })

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
    },
    title: {
        color: '#000',
        fontWeight: '800',
        fontSize: 25
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 40,
        marginTop: 20,
        width: '40%',
    },
    btnText: {
        color: "#fff",
        fontSize: 17,
    },
    btnPrimary: {
        backgroundColor: '#3064b8',
    },
    btnBack: {
        backgroundColor: '#bd4646'
    }
})