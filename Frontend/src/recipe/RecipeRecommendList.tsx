/*
npm i react-native-swiper
*/

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert,  Image,  StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";
import { SliderBox }  from "react-native-image-slider-box";
import config from "../project.config"
import { useSelector } from "react-redux";
import { AppState } from "../store";
import * as L from '../store/login'

import { LogBox } from 'react-native'; // Non-serializable warning 숨기기
import Swiper from "react-native-swiper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function RecipeRecommendList( { category } :any) { // 굿즈 태그 연결 부분
    
    const navigation = useNavigation()
    const [load, setLoad] = useState(false)
    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log

    const [recipeData, setRecipeData] = useState({
        "recipePrice":[],
        "recipeSeq": [],
        "recipeRating":[],
        "thumbnailPhoto":[],
        "title":[],
        "readcount":[],
        "capacity":[]
    })

    useFocusEffect(
        useCallback(() => {
            console.log("screen mounted");
                axios.get(config.address + "getRecommendRecipe?category=" + category)
                .then((recipeRes) =>{
                    setRecipeData(recipeRes.data)          
                    console.log(recipeRes.data)        
                    setLoad(true)
                })
                .catch((err) => {
                    console.log(err)
                })
          return () => {
            console.log("screen unmounted");
            return (<View></View>)
            // 포커스가 벗어날 때 처리 추가
          };
        }, []));

    useEffect( () => {
        const fetchRecipe = async() =>{
            const recipeRes =await axios.get(config.address + "getRecommendRecipe?category=" + category)
            setRecipeData(recipeRes.data)          
            console.log(recipeRes.data)
            setLoad(true)
        }
        fetchRecipe()
    }, [])

    function checkRecipe(index:number){ // 특정 레시피 선택 시
        console.log(recipeData.recipePrice[index])
        
        navigation.navigate('RecipeDetail' as never,{
            seq: recipeData.recipeSeq[index], 
            category: 'recipe',
        } as never)
    }

  return (

    <View style={styles.container}>
        {load &&
      <Swiper 
        autoplay 
        showsPagination={true} 
        width={500}
        height={400} 
        autoplayTimeout={3.0}
        loop={true}
      >
        {recipeData.thumbnailPhoto.map((item, index) => {
          return (
              <View style={{alignItems:'center'}} key={index}>
                  <TouchableOpacity onPress={ () => checkRecipe(index)}>
                    <Image source={
                        {uri: config.photo + item} }
                        style={{ alignSelf:'center', width:240, height:160}}
                    />
                    <Text style={styles.recipeTitle}>{recipeData.title[index]}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.recipeReadcount}>조회수 : {recipeData.readcount[index]}</Text>
                        <Text style={styles.recipeCapacity}>기준 : {recipeData.capacity[index]}인분</Text>
                    </View>
                    
                    <Text style={styles.ratingText}>{recipeData.recipeRating[index]}</Text>
                    <Rating
                        type='star'
                        ratingCount={5}
                        imageSize={30}
                        tintColor="#EEEEEE"
                        readonly={true}
                        fractions={20}
                        startingValue={recipeData.recipeRating[index]}
                    />
                </TouchableOpacity>
             </View>
          )}
        )}
      </Swiper>
    }
    </View>
  );
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 0
      },
      
    container: {
        marginBottom:50,
        alignItems:'center'
    },
    recipeTitle:{
        fontSize:24,
        width:500,
    },
    recipeReadcount:{
        fontSize:16,
        width:250,
        textAlign:"left"
    },
    recipeCapacity:{
        fontSize:16,
        width:250,
        textAlign:"right"
    },
    recipeSlide:{
        width:320,
        height:160,
        alignItems:'center', 
    },
    ratingText: {
        color:'#f1c40f',
        fontSize:24,
        textAlign:'center'
    }
})// css

