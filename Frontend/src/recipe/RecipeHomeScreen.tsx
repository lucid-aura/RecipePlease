import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text,StyleSheet, Button, SafeAreaView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { Rating } from "react-native-ratings";

/*
npm i react-native-image-slider-box -HSH 추가
npm install --save react-native-ratings - HSH 추가
*/

const testImage = 
    [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", // Network image
        // require('./assets/images/girl.jpg'),   // Local image
    ]

export default function RecipeHomeScreen(){

    const navigation = useNavigation()

    const [test, setTest] = useState("")
    const [rate, setRate] = useState("")

    return(
        <SafeAreaView style={styles.container}>
            
            {/* <Button title="레시피로 이동" onPress={()=>navigation.navigate('RecipeDetail')}></Button> */}
            <View style={styles.recipeSlide}>
                <Text style={styles.recipeTitle}>추천 레시피</Text>
                <SliderBox
                    images={testImage}
                    sliderBoxHeight={300}
                    parentWidth={500}
                    onCurrentImagePressed={index => 
                        navigation.navigate('RecipeDetail',{
                            url: testImage[index],
                            seq: index, // 이후에 해당 recipe의 seq로 변경해야함.
                            category: 'recipe'
                        })}
                    currentImageEmitter={ (index:any) => setTest(index)}
                    paginationBoxVerticalPadding={10}
                    autoplay
                    circleLoop
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE"
                    dotStyle={{
                        width: 15,
                        height: 15,
                        borderRadius: 15,
                        marginHorizontal: 10,
                        padding: 0,
                        margin: 0
                    }}
                />
                <Text>{test}</Text>
                <Rating
                    type='star'
                    ratingCount={5}
                    imageSize={30}
                    showRating
                    tintColor="#EEEEEE"
                    onFinishRating={point => setRate(point)}
                    startingValue={test}
                    // minValue={1}
                />
            </View>
            
        </SafeAreaView>
    )
} //버튼 생성 후 화면단 표출

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        
    },
    recipeTitle:{
        fontSize:48
    },
    recipeSlide:{
        width:600,
        height:300,
        alignItems:'center', 
    }
})// css