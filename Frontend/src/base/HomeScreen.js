import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text,StyleSheet, Button } from "react-native";

export default function HomeScreen(){

    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Button title="레시피로 이동" onPress={()=>navigation.navigate('Recipe')}></Button>


        </View>
    )
} //버튼 생성 후 화면단 표출

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})// css