import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Button, Dimensions, Modal, PanResponder, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

export default function PurchaseRecipe({navigation}:any) {

    // 로그인 세션 정보
    const [loginData, setLoginData] = useState(Object);

    // 보유코인 및 레시피 가격 세팅
    // const [userCoin, setUserCoin] = useState(0);
    // const [recipePrice, setRecipePrice] = useState(1100);

    const getLoginData = async () => {
        let data = await AsyncStorage.getItem("loginData");
        try {
            if (data !== null) {
                let loginSessionData = JSON.parse(data);
                setLoginData(loginSessionData);
                // setUserCoin(loginData.memberCoin);
            }
        } catch (err) {
            console.log(err);
        }
    }
    getLoginData();

    // 레시피 구매 버튼 tap할 때 구매 요청을 보낼 함수
    const requestPurchaseRecipe = async () => {
        await axios.post("http://192.168.0.13:3000/coin/useCoin", null, {params: {
            memberId: loginData.memberId,
            docsSeq: 1,
            coinCount: 1100
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
                                <Text>레시피 제목</Text>
                                <Text>보유코인 {loginData.memberCoin}원</Text>
                                <Text>구매가격 10000원</Text>

                                <TouchableOpacity 
                                    style={styles.modalBtn}
                                    onPress={() => {
                                        requestPurchaseRecipe();
                                    }}    
                                >
                                    <Text>버튼을 탭하여 구매하기</Text>
                                </TouchableOpacity>

                                <Text>레시피는 결제완료시 환불이 어렵습니다.</Text>
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
    modalBtn: {
        padding: 10,
        backgroundColor: '#ff47bb',
        borderRadius: 7
    }   // 모달 내 결제버튼
})