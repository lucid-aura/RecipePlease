import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PaymentFailed({navigation}:any) {

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.textView}>
                    결제를 취소하여 승인되지 않았거나 {'\n'}
                    결제 모듈을 불러오는데 실패하였습니다.
                </Text>
            </View>
            <View style={styles.btnGroup}>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={() => navigation.navigate('paymentInfo')}
                >
                    <Text style={styles.btnText}>이전 페이지로 이동</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    textView: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center'
    },
    btnGroup: {
        padding: 35
    },
    btn: {
        borderRadius: 15,
        backgroundColor: '#4852c7',
        padding: 20
    },
    btnText: {
        color: '#fff',
        fontSize: 17
    }
})