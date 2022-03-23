import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, BackHandler, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from "react-native-safe-area-context";

// 결제 하지 않고 뒤로 돌아갈 때 메모리 누수 방지
// AsyncStorage.removeItem('payment');

// 주문번호를 iamport 관리자 콘솔에 전달하기 위해 사용
const date = new Date()
let random = Math.floor(Math.random() * 10 + 1)
let uid = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}-${random}`

// 하이픈을 자동으로 추가해주는 함수
const addHyphenToPhoneNumber = (phoneNum:String) => {
    let trimNum = phoneNum.replace(/[^0-9]/g, "");
    let collectNum = trimNum.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
    return collectNum;
}

export default function PaymentInfo({navigation}:any, props:any) {

    // 결제관련 정보
    const [buyerName, setBuyerName] = useState('카카오');
    const [buyerPostcode, setBuyerPostcode] = useState();
    const [buyerAddr, setBuyerAddr] = useState('');
    const [buyerAddrDetail, setBuyerAddrDetail] = useState('');
    const [buyerTel, setBuyerTel] = useState('');
    const [pg, setPg] = useState('');
    const amount = 20000
    const [toPay, setToPay] = useState("결제 수단이 선택되지 않았습니다.");

    // 주소 변경에서 가져온 값으로 화면상의 주소를 바꿔줌
    // 주소를 화면단으로 가져와 반영하여 새로고침 해주기 위해 useIsFocused, useEffect 사용
    const isFocused = useIsFocused();
    useEffect(() => {
        const getNewAddr = async () => {
            let addrData = await AsyncStorage.getItem('addrData');
            try {
                if (addrData !== null) {
                    let data = JSON.parse(addrData);
                    console.log(`넘겨받는 데이터: ${addrData}`);
                    setBuyerPostcode(data.zipcode);
                    setBuyerAddr(data.roadAddr);
                }
            } catch(err) {
                console.log(err);
            }
        }
    
        getNewAddr();

    }, [isFocused]);


    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{
                        paddingLeft: 20, 
                        paddingRight: 20, 
                        flex: 1, 
                        alignItems: 'stretch'
                    }}
                >

                    {/* 결제 메인 화면 */}
                    <View style={{flex: 1}}>

                        {/* 주문정보(주문 상품 확인), 임의로 기입되었으므로 향후 보완 필요 */}
                        <View>
                            <Text style={styles.subTitle}>주문 정보</Text>
                            <View style={styles.buyContainer}>
                                <Text>IMG</Text>
                                <Text>카카오 도마 칼세트</Text>
                                <Text>1개</Text>
                                <Text>{amount}원</Text>
                            </View>
                        </View>

                        <View>
                            {/* 배송지 정보 */}
                            <Text style={styles.subTitle}>배송지 정보</Text>
                            <View style={styles.informContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="받는 사람 이름"
                                    value={buyerName}
                                    onChangeText={buyerName => setBuyerName(buyerName)}
                                />
                                <View>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="받는 사람 주소"
                                        value={`[${buyerPostcode}] ${buyerAddr}`}
                                        onChangeText={(addr) => setBuyerAddr(addr)}
                                        editable={false}
                                    />
                                    <TouchableOpacity 
                                        style={{
                                            backgroundColor: '#fff', 
                                            position: 'absolute', 
                                            padding: 7, 
                                            right: 12,
                                            top: 7
                                        }}
                                        onPress={() => {
                                            navigation.navigate('paymentAddr');
                                        }}
                                    >
                                        <Text style={{color: '#47619e', textDecorationLine: 'underline'}}>주소찾기</Text>
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="상세주소"
                                    value={buyerAddrDetail}
                                    onChangeText={(addrDetail) => setBuyerAddrDetail(addrDetail)}
                                />
                                <TextInput
                                    keyboardType="numeric"
                                    style={styles.textInput}
                                    placeholder="받는 사람 연락처"
                                    value={buyerTel}
                                    onChangeText={(buyerTel) => setBuyerTel(addHyphenToPhoneNumber(buyerTel))}
                                />
                            </View>
                        </View>
                        
                        {/* 결제수단 선택(카카오페이, 토스페이먼츠 지원) */}
                        <View>
                            <Text style={styles.subTitle}>결제 수단</Text>
                            <View style={styles.selectBox}>
                                <RNPickerSelect
                                    placeholder={{ label: '결제 수단을 선택하세요', value: null }}
                                    items={[
                                        { label: '카카오페이로 결제', value: 'kakaopay' },
                                        { label: '토스페이먼츠로 결제', value: 'tosspay'}
                                    ]}
                                    onValueChange={(val) => {
                                        if (val === 'kakaopay') {
                                            setToPay(`카카오페이로 ${amount}원을 결제합니다.`);
                                            setPg('kakaopay');
                                        } else if (val === 'tosspay') {
                                            setToPay(`토스 페이먼츠로 ${amount}원을 결제합니다.`);
                                            setPg('tosspay');
                                        }
                                    }}
                                />
                            </View>
                        </View>
                        
                        {/* 결제 페이지로 이동 및 결제 정보를 AsyncStorage로 가지고 결제 성공 페이지로 이동(백엔드 전처리) */}
                        <View>
                            <Text style={styles.toPayView}>{toPay}</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <TouchableOpacity 
                                    style={[styles.calcelBtn, styles.btn]}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Text style={styles.btnText}>돌아가기</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={[styles.paymentBtn, styles.btn]}
                                    onPress={() => {
                                        if (buyerName === '' || buyerName === null) {
                                            Alert.alert('배송지 정보 누락', '받는 사람의 이름이 입력되지 않았습니다.');
                                        } else if (buyerAddr === '' || buyerAddr === null) {
                                            Alert.alert('배송지 정보 누락','받는 사람의 주소가 입력되지 않았습니다.');
                                        } else if (buyerAddrDetail === '' || buyerAddrDetail === null) {
                                            Alert.alert('배송지 정보 누락','받는 사람의 상세 주소가 입력되지 않았습니다.');
                                        } else if (buyerTel === '' || buyerTel === null) {
                                            Alert.alert('배송지 정보 누락','받는 사람의 연락처가 입력되지 않았습니다.');
                                        } else if (pg === '' || pg === null) {
                                            Alert.alert('결제수단 누락', '결제수단이 선택되지 않았습니다');
                                        } else {
                                            // 모든 정보를 가지고
                                            AsyncStorage.setItem('payment', JSON.stringify({
                                                pg: pg,
                                                pay_method: 'card',
                                                merchant_uid: `ORD-${uid}-userId`,   // 사용자 아이디를 추가
                                                name: '카카오 도마 칼 세트',
                                                amount: amount,
                                                buyer_email: 'kakao@kakao.com',
                                                buyer_name: buyerName,
                                                buyer_tel: buyerTel,
                                                buyer_addr: buyerAddr,
                                                buyer_detail_addr: buyerAddrDetail,
                                                buyer_postcode: buyerPostcode,
                                                app_scheme: 'example',
                                                escrow: false
                                            }));

                                            // Payment 컴포넌트로 이동
                                            navigation.navigate('payment');
                                        }
                                    }}
                                >
                                    <Text style={styles.btnText}>결제하기</Text>
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    subTitle: {
        fontSize: 20,
        fontWeight: "800",
        paddingTop: 20,
        paddingBottom: 5
    },
    nameSpace: {
        flexDirection: 'row', 
        borderWidth: 2, 
        borderColor: '#e9e9e9', 
        height: 80, 
        alignItems: 'center', 
        padding: 10, 
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    buyerName: {
        fontSize: 20, 
        fontWeight: "800", 
    },
    changeBtn: {
        marginLeft: 10,
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#4b99ff',
    },
    textInput: {
        width: '98%',
        height: 40,
        margin: 3,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#e9e9e9',
    },
    informContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 2,
        borderColor: '#e9e9e9'
    },
    changeBtnText: {
        fontWeight: '700',
    },
    buyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
        padding: 15,
        borderWidth: 2,
        borderColor: '#e9e9e9',
        height: 55,
        backgroundColor: '#fff'
    },
    selectBox: {
        borderWidth: 2,
        borderColor: '#e9e9e9',
        fontSize: 17,
        backgroundColor: '#fff',
        // height: 40,
        borderRadius: 10,
        padding: 3
    },
    toPayView: {
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 20
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        // height: 45,
        marginTop: 10,
        marginBottom: 10,
        width: '40%',
        padding: 15
    },
    btnText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: "700"
    },
    paymentBtn: {
        backgroundColor: '#4852c7',
    },
    calcelBtn: {
        backgroundColor: '#bd4646'
    }
})