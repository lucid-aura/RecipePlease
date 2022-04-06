import React, { useCallback, useState } from "react";
import { View, Text,StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import { NavigationHeader } from "../theme";
import RecipeRecommendList from "./RecipeRecommendList";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";
import RecipeSearch from "./RecipeSearch";

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
    const navigation = useNavigation()
    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])

    return(
        <SafeAreaView style={styles.container}>
            <NavigationHeader title="홈" 
                Left= {() => <Icon name="arrow-left-bold" size={30} onPress={goBack} />}
                Right= {() => <Icon name="cart-heart" size={30} />} />

            <RecipeSearch />

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
        paddingVertical: 0,
        marginTop:30,
        marginBottom:200,
        width:'100%',
      },
    container: {
        alignItems: 'center',
    },

    recipeTitle:{
        fontSize:32,
        paddingLeft:30
    },
    ratingText: {
        color:'#f1c40f',
        fontSize:32,
        textAlign:'center'
    },
})// css