import axios from "axios";
import React, { useCallback } from "react";
import { View, Text,StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { NavigationHeader } from "../theme";
import RecipeRecommendList from "./RecipeRecommendList";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";
/*
npm i react-native-image-slider-box -HSH 추가
npm install --save react-native-ratings - HSH 추가
*/
 
// 더미
const testImage = 
    [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree", // Network image
        // require('./assets/images/girl.jpg'),   // Local image
    ]

export default function RecipeHomeScreen(){
    /*
    const updateRecipeDataAfterComment = function() { // 댓글 평가 작성 시 추천 레시피 재조회
        console.log("this is test function")
        axios.get("http://192.168.0.4:3000/getRecommendRecipe")
            .then(function(res){
                console.log(res.data)
            })
            .catch(function(err) {
                console.log(err)
            })
    }
    */
   const navigation = useNavigation()
    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])

    return(
        
        <SafeAreaView style={styles.container}>
            <NavigationHeader title="홈" 
                Left= {() => <Icon name="arrow-left-bold" size={30} onPress={goBack} />}
                Right= {() => <Icon name="cart-heart" size={30} />} />
            <ScrollView style={styles.contentContainer} showsHorizontalScrollIndicator={false}>
                <Text style={styles.recipeTitle}>축산물 추천 레시피</Text>
                <View>
                    <RecipeRecommendList category="livestock" />
                </View>

                <Text style={styles.recipeTitle}>해산물 추천 레시피</Text>
                <View>
                    <RecipeRecommendList category="seafood"/>
                </View> 

                <Text style={styles.recipeTitle}>조회순 추천 레시피</Text>
                <View>
                    <RecipeRecommendList category="readcount"/>
                </View> 
            </ScrollView>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 0
      },
    container: {
        alignItems: 'center',
    },

    recipeTitle:{
        fontSize:48
    },
    recipeSlide:{
        width:600,
        height:300,
        alignItems:'center', 
    },
    ratingText: {
        color:'#f1c40f',
        fontSize:32,
        textAlign:'center'
    }
})// css