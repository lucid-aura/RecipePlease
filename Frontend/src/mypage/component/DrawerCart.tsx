import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button, Colors } from "react-native-paper";
import { useSelector } from "react-redux";
import * as L from '../../store/login'
import { AppState } from "../../store";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../project.config"

const Stack = createNativeStackNavigator()

export default function DrawerCart({ cartData } :any) {
    const navigation = useNavigation();
    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)

    const buy = ()  => {
        AsyncStorage.setItem('goodsData', JSON.stringify(cart));
        navigation.navigate('paymentInfo') 
    }

    const reset = async() => {
        await AsyncStorage.removeItem('cartData'); 
        await console.log("리셋완료")
        await console.log( JSON.stringify(AsyncStorage.getItem('cartData'))); 
        setTotal(0)
        setCart([])
    }

    useEffect(() => {
        const getCart = async() =>{
            let data = await AsyncStorage.getItem('cartData');
            if (data != null) {
                setCart(JSON.parse(data))
                setTotal((cart.reduce(function (sum, data) {
                    return sum + parseInt(data.goodsPrice)*parseInt(data.count);
                }, 0)));
            }
        }
        getCart()
    }, [cartData]) 

    return (
        <SafeAreaView>
            <ScrollView  style={styles.container}>
            <Text>장바구니</Text>
                {cart != null && loggedIn &&
                cart.map((goods:{goodsSeq:number, goodsName:string, goodsPrice:string, count:string}, index) :any=> (
                        <TouchableOpacity key={index} style={{marginBottom:10, marginTop:10}}
                            onPress={() => {
                                console.log("click")
                            }}>

                            <Image style={{alignSelf:'center',  width:100, height:100}} source={config.titleImageUri[goods.goodsSeq-1]}></Image>

                            <Text style={{fontSize:20}}>{goods.goodsName}</Text>
                            <Text style={{fontSize:15}}>수량 : {goods.count}개</Text>
                            <Text style={{fontSize:15}}>가격 : {parseInt(goods.goodsPrice)*parseInt(goods.count)}원</Text>

                        </TouchableOpacity>
                    ))}
                    <Text>총 가격 : {total}</Text>
                    <View style={{justifyContent:'center', flexDirection:'row'}}>
                    <Button onPress={buy}>구매</Button>
                    <Button onPress={reset}>리셋</Button>
                    </View>
                </ScrollView>

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