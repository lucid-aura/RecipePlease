/* 작업중 */
import React, { useCallback, useEffect, useState } from "react";
import { View, Text,StyleSheet, SafeAreaView, ScrollView, Alert, Image, Platform } from "react-native";
import { NavigationHeader } from "../theme";
import RecipeRecommendList from "./RecipeRecommendList";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";
import RecipeSearch from "./RecipeSearch";
import RNFS from "react-native-fs"
import {
    PermissionsAndroid
} from 'react-native';
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
<<<<<<< HEAD
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
=======
        <SafeAreaView style={styles.container}>
            <NavigationHeader title="홈" 
                Left= {() => <Icon name="arrow-left-bold" size={30} onPress={goBack} />}
                Right= {() => <Icon name="cart-heart" size={30} />} />

            <RecipeSearch />

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
        
>>>>>>> main
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