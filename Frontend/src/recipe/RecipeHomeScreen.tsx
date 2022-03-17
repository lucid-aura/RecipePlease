import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text,StyleSheet, Button } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

/*
npm i react-native-image-slider-box -HSH 추가
*/

const testImage = 
    [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", // Network image
            // Local image
    ]

export default function RecipeHomeScreen(){

    const navigation = useNavigation()


    return(
        <View style={styles.container}>

            <Text>Home Screen</Text>
            <Button title="레시피로 이동" onPress={()=>navigation.navigate('RecipeDetail')}></Button>
            <SliderBox
                images={testImage}
                sliderBoxHeight={200}
                parentWidth={200}
                onCurrentImagePressed={index => 
                    navigation.navigate('RecipeDetail',{
                        url: testImage[index]
                    })}
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={20}
                autoplay
                circleLoop
            />

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