import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, Button, Dimensions, Modal, PanResponder, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

// 레시피 구매 버튼 tap할 때 구매 요청을 보낼 함수
const requestPurchaseRecipe = () => {

}

export default function PurchaseRecipe() {

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
                                        if (loginData.memberCoin < 1100) {
                                            Alert.alert("결제 코인 수량 부족", "코인 충전이 필요합니다. 충전 페이지로 이동하시겠습니까?", [{text: "예"}, {"text": "아니오"}])
                                        } else {
                                            requestPurchaseRecipe()}}
                                        }
                                        
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
    },
    alignContentsCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    bottomSheetContainer: {
        height: 300,
        backgroundColor: '#fff',
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        padding: 20
    },
    modalBtn: {
        padding: 10,
        backgroundColor: '#ff47bb',
        borderRadius: 7
    }
})