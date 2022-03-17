import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Stack = createNativeStackNavigator()
const context = createContext({})

export default function RecipeDetailScreen(){
    
    const navigation = useNavigation()
    const url = useContext(context)

    return(
        <View style={styles.container}>
            <Text>Recipe Detail Screen</Text>
            <Text>itemId: {JSON.stringify(url)}</Text>

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