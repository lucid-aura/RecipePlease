/* 작업중 */
import React, { useCallback, useEffect, useState } from "react";
import { View, Text,StyleSheet, SafeAreaView, ScrollView, Alert, Image, Platform } from "react-native";
import { NavigationHeader } from "../theme";
import RecipeRecommendList from "./RecipeRecommendList";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as D from "../store/drawer"

/*
npm i react-native-image-slider-box -HSH 추가
npm install --save react-native-ratings - HSH 추가
npm install react-native-fs
*/


export default function RecipeHomeScreen(){
    const navigation = useNavigation()
    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])

    const dispatch = useDispatch()
    const goShoppingCart = () => {
        dispatch(D.drawerChangeFalseAction())
        navigation.dispatch(DrawerActions.openDrawer())
    }
 
    return(
        <SafeAreaView style={styles.container}>
            <NavigationHeader
                target="recipe"
                Left= {() => <Icon name="arrow-left-bold" size={40} onPress={goBack} />}
                Right= {() => <Icon name="cart-heart" size={40} onPress={goShoppingCart} />} />

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
        marginBottom:50,
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