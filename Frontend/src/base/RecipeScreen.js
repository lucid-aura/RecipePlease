import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import DetailScreen from "../detail/DetailScreen";
import HomeScreen from "../detail/HomeScreen";

const Stack = createNativeStackNavigator()

export default function RecipeScreen(){

    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <Text>Recipe Screen</Text>
            <Button title="검색결과로 이동" onPress={()=>navigation.navigate('Detail')}></Button>
            
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>

                <Stack.Screen name="Detail" component={DetailScreen}></Stack.Screen>

            </Stack.Navigator>

        </View>
    )
} //레시피 페이지에서 검색결과(Detail) 화면단 이동 실패..... 화면단 표출은 이상없음

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}) //css