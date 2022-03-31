import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Button, Dimensions, Modal, PanResponder, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

export default function PurchaseRecipe({navigation}:any) {

    // 로그인 세션 정보
    const [loginData, setLoginData] = useState(Object);

    // 보유코인 및 레시피 가격 세팅
    const [userCoin, setUserCoin] = useState(0);
    const [recipePrice, setRecipePrice] = useState(3000);
    
    useEffect(() => {
        const getLoginData = async () => {
            let data = await AsyncStorage.getItem("loginData");
            try {
                if (data !== null) {
                    let loginSessionData = JSON.parse(data);
                    setLoginData(loginSessionData);
                    setUserCoin(loginData.memberCoin);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getLoginData();
    }, [userCoin]);

    // 레시피 구매 버튼 tap할 때 구매 요청을 보낼 함수
    const requestPurchaseRecipe = async () => {
        await axios.post("http://192.168.0.13:3000/coin/useCoin", null, {params: {
            memberId: loginData.memberId,
            docsSeq: 1,
            coinCount: recipePrice
        }})
        .then((res) => {
            console.log(res.data);
            Alert.alert("구매 성공", "구매가 완료되었습니다.", [
                {text: "확인", onPress: () => navigation.navigate("Home")}
            ]);
        })
        .catch((err) => console.log(err));
    }
    


    // 모달의 띄워짐을 조정할 변수
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    // 모달이 띄워질 때 설정될 속성들
    const screenHeight = Dimensions.get('screen').height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [-1, 0, 1]
    });
    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
    });
    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true
    });
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => panY.setValue(gestureState.dy),
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            } else {
                resetBottomSheet.start();
            }
        }
    })).current;

    const closeModal = () => {
        closeBottomSheet.start(() => setIsModalVisible(false));
    }

    useEffect(() => {
        if (isModalVisible) {
            resetBottomSheet.start();
        }
    }, [isModalVisible]);

    return (
        <View style={styles.flexible}>

            {/* 모달을 띄우게 할 버튼 */}
            <View style={styles.alignContentsCenter}>
                <Button 
                    title="버튼을 탭하여 레시피 구매"
                    onPress={() => setIsModalVisible(!isModalVisible)}
                />
            </View>

            {/* 모달 */}
            <Modal
                visible={isModalVisible}
                animationType={"slide"}
                transparent={true}
                statusBarTranslucent={true}
            >
                <Pressable 
                    style={styles.modalOverlay}
                    onPress={() => setIsModalVisible(!isModalVisible)}
                >
                    <TouchableWithoutFeedback>
                        <Animated.View
                            style={{...styles.bottomSheetContainer,
                                    transform: [{ translateY: translateY }]}}
                                  {...panResponder.panHandlers}
                        >

                            {/* 모달에 들어갈 내용을 아래에 작성 */}
                            <View>
                                <Text style={modalInnerStyle.recipeTitle}>레시피 제목</Text>
                                <Text style={[modalInnerStyle.coin, {color: '#00f'}]}>보유코인 {userCoin}원</Text>
                                <Text style={[modalInnerStyle.coin, { color: '#f00'}]}>구매가격 {recipePrice}원</Text>

                                <TouchableOpacity 
                                    style={modalInnerStyle.modalBtn}
                                    onPress={() => {
                                        Alert.alert("구매 의사 재확인", "보유하고 있는 코인으로 레시피를 구매하시겠습니까? \n 코인으로 구매한 상품은 환불이 어렵습니다.", [{text: "취소"}, {text: "확인", onPress: () => requestPurchaseRecipe()}])
                                    }}    
                                >
                                    <Text style={modalInnerStyle.btnText}>버튼을 탭하여 구매하기</Text>
                                </TouchableOpacity>

                                <Text style={modalInnerStyle.warningText}>레시피는 결제완료시 환불이 어렵습니다.</Text>
                            </View>

                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Pressable>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    flexible: {
        flex: 1
    },  // flex 속성 지정
    alignContentsCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },  // 가로세로 중앙정렬
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },  // 모달이 띄워졌을 때 화면을 어둡게 하기 위한 오버레이
    bottomSheetContainer: {
        height: 300,
        backgroundColor: '#fff',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        padding: 20
    },  // 모달 스타일
})

const modalInnerStyle = StyleSheet.create({
    recipeTitle: {
        fontSize: 22,
        fontWeight: '700'
    },
    coin: {
        fontSize: 17,
        fontWeight: '700',
        paddingTop: 10,
        textAlign: 'right'
    },
    modalBtn: {
        padding: 10,
        backgroundColor: '#4852c7',
        borderRadius: 7,
        marginTop: 30,
        marginBottom: 30
    },   // 모달 내 결제버튼
    btnText: {
        padding: 6,
        fontSize: 17,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center'
    },
    warningText: {
        color: '#f00',
        textAlign: 'center',
        fontSize: 16,
    }
})