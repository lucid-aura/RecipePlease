/* 작업중 */
import React, { useCallback, useEffect, useState } from "react";
import { View, Text,StyleSheet, SafeAreaView, ScrollView, Alert, Image, Platform } from "react-native";
import { NavigationHeader } from "../theme";
import RecipeRecommendList from "./RecipeRecommendList";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import RecipeSearch from "./RecipeSearch";
import RNFS from "react-native-fs"
import {
    PermissionsAndroid
} from 'react-native';
import * as D from "../store/drawer"

/*
npm i react-native-image-slider-box -HSH 추가
npm install --save react-native-ratings - HSH 추가
npm install react-native-fs
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

    const dispatch = useDispatch()
    const goShoppingCart = () => {
        dispatch(D.drawerChangeFalseAction())
        navigation.dispatch(DrawerActions.openDrawer())
    }
    
    const permission = async() => {
        if (Platform.OS === "android") {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            ]).then((result)=>{
                if (result['android.permission.CAMERA']
                && result['android.permission.WRITE_EXTERNAL_STORAGE']
                && result['android.permission.READ_EXTERNAL_STORAGE']
                === 'granted') {
                    console.log("모든 권한 획득");
                } else{
                    console.log("권한거절");
                }
            })
        }else{
        }
    }

    useEffect( () => {
        permission()
    }, [])
    return(
        <SafeAreaView style={styles.container}>
            <NavigationHeader
                Left= {() => <Icon name="arrow-left-bold" size={40} onPress={goBack} />}
                Right= {() => <Icon name="cart-heart" size={40} onPress={goShoppingCart} />} />


            {/* <Image source={
               {uri: 'file://' + RNFS.ExternalStorageDirectoryPath + '/A.jpg'} }
               'file:///storage/emulated/0/DCIM/image-s2.jpg'
            /> */}

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