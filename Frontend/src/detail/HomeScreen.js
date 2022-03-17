import React from "react";
import { Button, Text, View } from "react-native";

export default function HomeScreen(){

    return(
        <View>
            <Text>Home Screen</Text>
            <Button title="레시피로 이동" onPress={()=>navigation.navigate('Recipe')}></Button>

            <Text>Home Screen</Text>
            <Button title="굿즈로 이동" onPress={()=>navigation.navigate('Pay')}></Button>
        </View>
    )
} //디테일 페이지 완성 버튼 (*버튼이동 완료)