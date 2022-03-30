import axios from "axios";
import React from "react";
import { View, Text,StyleSheet, SafeAreaView, ScrollView } from "react-native";
import RecipeRecommendList from "./RecipeRecommendList";

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
    const star = function() { // 댓글 평가 작성 시 추천 레시피 재조회
        console.log("this is test function")
        axios.get("http://192.168.0.4:3000/getRecommendRecipe")
            .then(function(res){
                console.log(res.data)
            })
            .catch(function(err) {
                console.log(err)
            })
    }

    return(
        
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.contentContainer} showsHorizontalScrollIndicator={false}>
                <Text style={styles.recipeTitle}>축산물 추천 레시피</Text>
                <View>
                    <RecipeRecommendList category="livestock" star={star}/>
                </View>

                <Text style={styles.recipeTitle}>해산물 추천 레시피</Text>
                <View>
                    <RecipeRecommendList category="seafood" star={star}/>
                </View> 

                <Text style={styles.recipeTitle}>조회순 추천 레시피</Text>
                <View>
                    <RecipeRecommendList category="readcount" star={star}/>
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