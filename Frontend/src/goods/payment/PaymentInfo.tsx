import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, BackHandler, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from "react-native-safe-area-context";


const date = new Date()
let random = Math.floor(Math.random() * 10 + 1)
let uid = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}-${random}`

// 주소의 길이를 줄여서 표현해주는 함수
const reduceAddr = (addr:String) => {
    if(addr.length > 25) {
        return addr.substring(0, 13) + '...';
    }
    return addr;
}

// 하이픈을 자동으로 추가해주는 함수
const addHyphenToPhoneNumber = (phoneNum:String) => {
    let trimNum = phoneNum.replace(/[^0-9]/g, "");
    let collectNum = trimNum.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
    return collectNum;
}

export default function PaymentInfo({navigation}:any, props:any) {

    const [modalVisible, setModalVisible] = useState(false);
    const [toPay, setToPay] = useState("결제 수단이 선택되지 않았습니다.");
    
    // 결제관련 정보
    const [buyerName, setBuyerName] = useState('테스트');
    const [buyerPostcode, setBuyerPostcode] = useState(12345);
    const [buyerAddr, setBuyerAddr] = useState('대전광역시 서구 둔산로 100');
    const [buyerTel, setBuyerTel] = useState('010-2345-7891');
    const [pg, setPg] = useState('');
    const amount = 12400

    // 주소 변경에서 가져온 값으로 화면상의 주소를 바꿔줌
    // 주소 변경 시 화면단의 주소 정보를 바꿔주기 위해 useEffect와 isFocused 사용
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
            <View style={{paddingLeft: 20, paddingRight: 20, flex: 1, alignItems: 'stretch'}}>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {setModalVisible(!modalVisible)}}
                    >
                        <View style={modalStyles.centeredView}>
                            <View style={modalStyles.modalView}>
                                <Text style={{fontSize: 20, marginBottom: 10, fontWeight: '700'}}>받는 사람 정보 변경</Text>
                                <TextInput
                                    style={modalStyles.modalInput}
                                    placeholder="받는 사람"
                                    value={buyerName}
                                    onChangeText={buyerName => setBuyerName(buyerName)}
                                />
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <TextInput
                                        style={modalStyles.modalInput}
                                        placeholder="받는 사람 주소"
                                        value={buyerAddr}
                                        onChangeText={(addr) => setBuyerAddr(addr)}
                                        editable={false}
                                    />
                                    <TouchableOpacity 
                                        style={{backgroundColor: '#fff', position: 'absolute', padding: 7, right: 13}}
                                        onPress={() => navigation.navigate('paymentAddr')}
                                    >
                                        <Text>주소찾기</Text>
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={modalStyles.modalInput}
                                    placeholder="받는 사람 연락처"
                                    value={buyerTel}
                                    onChangeText={(buyerTel) => setBuyerTel(addHyphenToPhoneNumber(buyerTel))}
                                />
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity 
                                        style={[modalStyles.button, modalStyles.buttonClose]}
                                        onPress={() => setModalVisible(false)}
                                    >
                                        <Text style={{color: '#fff', fontWeight: '700'}}>취소</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={[modalStyles.button, modalStyles.buttonApply]}
                                        onPress={() => { setModalVisible(false)}
                                        }
                                    >
                                        <Text style={{color: '#fff', fontWeight: '700'}}>확인</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.eachComponent}>
                        <Text style={styles.subTitle}>배송지 정보</Text>
                        <View style={styles.nameSpace}>
                            <Text style={styles.buyerName}>{buyerName}</Text>
                            <View>
                                <Text>{reduceAddr(buyerAddr)}</Text>
                                <Text>{addHyphenToPhoneNumber(buyerTel)}</Text>
                            </View>
                            <TouchableOpacity style={styles.changeBtn} onPress={() => setModalVisible(true)}>
                                <Text style={styles.changeBtnText}>정보변경</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.eachComponent}>
                        <Text style={styles.subTitle}>주문 정보</Text>
                        <View style={styles.buyContainer}>
                            <Text>IMG</Text>
                            <Text>카카오 편수냄비</Text>
                            <Text>1개</Text>
                            <Text>{amount}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.eachComponent}>
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

                    <View style={styles.eachComponent}>
                        <Text style={styles.toPayView}>{toPay}</Text>
                        <TouchableOpacity 
                            style={[styles.paymentBtn, styles.btn]}
                            onPress={() => {
                                if(pg !== '') {
                                    AsyncStorage.setItem('payment', JSON.stringify({
                                        pg: pg,
                                        pay_method: 'card',
                                        merchant_uid: `ORD-${uid}-userId`,   // 사용자 아이디를 추가
                                        name: '카카오 편수냄비',
                                        amount: amount,
                                        buyer_email: 'kakao@kakao.com',
                                        buyer_name: buyerName,
                                        buyer_tel: buyerTel,
                                        buyer_addr: buyerAddr,
                                        buyer_postcode: '12345',
                                        app_scheme: 'example',
                                        escrow: false
                                    }));
                                    setModalVisible(false);
                                    navigation.navigate('payment');
                                } else {
                                    Alert.alert('결제수단 확인', '결제수단이 선택되지 않았습니다');
                                }
                            }}
                        >
                            <Text style={styles.btnText}>결제하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.calcelBtn, styles.btn]}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.btnText}>돌아가기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    eachComponent: {
        marginBottom: 10
    },
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
        height: 150,
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
        height: 55,
        marginTop: 10,
        marginBottom: 10
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

const modalStyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: 'rgba(255,255,255, 0.8)'
    },
    modalView: {
      margin: 20,
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      margin: 5,
      width: 95,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonApply: {
      backgroundColor: "#2196F3",
    },
    buttonClose: {
      backgroundColor: "#bd4646",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    // 모달 내부 컴포넌트 스타일
    modalInput: {
        width: 300,
        height: 40,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#e9e9e9'
    }
  });