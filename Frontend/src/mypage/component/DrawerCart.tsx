import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Colors } from "react-native-paper";
import { useSelector } from "react-redux";
import * as L from '../../store/login'
import { AppState } from "../../store";
import { useNavigation } from "@react-navigation/native";


const Stack = createNativeStackNavigator()

export default function DrawerCart() {
    const navigation = useNavigation();
    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log
    return (
        <SafeAreaView>
            {loggedIn &&
                <View  style={styles.container}>

                        <Text>장바구니</Text>

                    <TouchableOpacity style={{backgroundColor:Colors.amber600}} 
                        onPress={() => {
                            console.log("click")
                        }}>
                        <Text style={{color:'white'}}>테스트</Text>
                    </TouchableOpacity>
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