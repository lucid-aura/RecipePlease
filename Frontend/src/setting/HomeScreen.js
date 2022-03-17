import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text,StyleSheet, Button } from "react-native";

export default function HomeScreen(){

    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title="Pay로 이동" onPress={()=>navigation.navigate('Pay')}></Button>


        </View>
    )
}// 네비 함수 생성후 버튼 클릭시 이동처리

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})//css