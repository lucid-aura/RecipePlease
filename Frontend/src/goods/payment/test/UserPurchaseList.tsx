import React, { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CoinUseList from "./CoinUseList";
import PurchaseList from "./PurchaseList";
import * as L from "../../../store/login"

export default function UserPurchaseList(props:any, {route}:any) {

    const [initComponentVisible, setInitComponentVisible] = useState(true);
    const loginId = props.route.params.loginId;
    console.log("UserPurchaseList의 loginId: " + loginId);

    return (
        <View>
            <View>
                <View style={styles.topBtnContainer}>
                    <TouchableOpacity 
                        style={[styles.topBtn, styles.goodsPurchaseBtn]}
                        onPress={() => setInitComponentVisible(true)}
                    >
                        <Text style={styles.btnText}>상품 구매 이력</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.topBtn, styles.useCoinListBtn]}
                        onPress={() => setInitComponentVisible(false)}
                    >
                        <Text style={styles.btnText}>코인 충전/사용 이력</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                { initComponentVisible
                    ? <PurchaseList  />
                    : <CoinUseList />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topBtnContainer: { 
        // flex: 1,
        flexDirection: 'row',
    },
    topBtn: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e9e9e9',
    },
    goodsPurchaseBtn: {
        backgroundColor: '#573988'
    },
    useCoinListBtn: {
        backgroundColor: '#2f74ff'
    },
    btnText: {
        color: '#fff',
        fontWeight: '600'
    }
})