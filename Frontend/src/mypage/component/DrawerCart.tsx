import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Colors } from "react-native-paper";
import { useSelector } from "react-redux";
import * as L from '../../store/login'
import { AppState } from "../../store";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Stack = createNativeStackNavigator()

export default function DrawerCart({ cartData } :any) {
    const navigation = useNavigation();
    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log
    const [cart, setCart] = useState(JSON.parse(cartData._W))

    function reset() {
        //AsyncStorage.removeItem('cartData'); 
        //console.log("3" + JSON.parse(cartData))
        console.log("111" + cart)
        let temp = JSON.stringify(cartData._W)
        console.log(temp)
        let temp2 = JSON.parse(temp)
        console.log(temp2)
        setCart(temp2)
        console.log("4" +JSON.stringify(cartData._W[0]))
        console.log("리셋완료")
    }

    return (
        <SafeAreaView>
            {loggedIn &&
                <View  style={styles.container}>

                        <Text>장바구니</Text>
{/*                         
                        {cart !== undefined &&
                        cart.map((goods:{goodsName:string, goodsPrice:string, count:string}, index) :any=> (
                                <TouchableOpacity key={index} style={{backgroundColor:Colors.amber600}} 
                                    onPress={() => {
                                        console.log("click")
                                    }}>
                                    <Text>{goods.goodsName}</Text>
                                    <Text>{goods.count}</Text>
                                    <Text>{parseInt(goods.goodsPrice)*parseInt(goods.count)}원</Text>
                                </TouchableOpacity>



                            ))}
                             */}
                            

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