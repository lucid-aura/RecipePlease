import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Colors } from "react-native-paper";
import { useSelector } from "react-redux";
import * as L from '../../store/login'
import { AppState } from "../../store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Stack = createNativeStackNavigator()

export default function DrawerCart() {
    const navigation = useNavigation();
    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log
    const [cart, setCart] = useState([])

    function reset() {
        AsyncStorage.removeItem('cartData'); 
        console.log("리셋완료")
    }

    useFocusEffect(
        useCallback( () => {
            async function getCart(){
                let cartData = await AsyncStorage.getItem('cartData'); 
                try {
                    if (cartData !== null) {
                        
                        let datas = JSON.parse(cartData);
                        console.log(datas)
                        setCart(datas)
                    }
                } catch(err) {
                    console.log(err);
                }
            }
        getCart()
        return () => {

            return (<View></View>)
            // 포커스가 벗어날 때 처리 추가
            };
        }, []));

    return (
        <SafeAreaView>
            {loggedIn &&
                <View  style={styles.container}>

                        <Text>장바구니</Text>

                        {cart.map((goods:{goodsName:string, goodsPrice:string, count:string}, index) :any=> (
                                <TouchableOpacity key={index} style={{backgroundColor:Colors.amber600}} 
                                    onPress={() => {
                                        console.log("click")
                                    }}>
                                    <Text>{goods.goodsName}</Text>
                                    <Text>{goods.count}</Text>
                                    <Text>{parseInt(goods.goodsPrice)*parseInt(goods.count)}원</Text>
                                </TouchableOpacity>



                            ))}

                            <Button onPress={reset}>리셋</Button>
                </View>
            }
            {!loggedIn &&
                <View>
                        <Text>로그인이 필요합니다</Text>
                        <Button icon="login" mode="contained" onPress={() => navigation.navigate('MyNavigator' as never)}>로그인</Button>
                </View>
            }
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column'
    }
})