import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import axios from 'axios';

const Stack = createNativeStackNavigator()
const context = createContext({})

export default function RecipeDetailScreen({ route, navigation }:any){

    const [recipe,setRecipe]= useState({
        recipeSeq:0,
        recipeTitle:"",
        memberId:0,
        content:"",
        recipeBigCategory:"",
        recipeSmallCategory:"",
        recipeGoodsTag:"",
        recipePrice:0,
        recipeRating:0
    });
    const [photo, setPhoto] = useState([]);
    const { url } = route.params;
    const { seq } = route.params;
    const { category } = route.params;
    

    useEffect( () => {
        const fetchData = async() =>{
            console.log(seq  + " " + category)

            const recipeRes = axios.get("http://192.168.0.4:3000/getOneRecipe?recipeSeq=" + seq ).then(function(res){
                setRecipe(res.data)
                console.log(res.data)
            })
            .catch(function(err){
                console.log(err)
            })

            const photoRes = axios.get("http://192.168.0.4:3000/getPhoto?docsSeq=" + seq +"&photo_category=" + category).then(function(res){
                setPhoto(res.data)
                console.log(res.data)
            })
            .catch(function(err){
                console.log(err)
            })
        }
        fetchData()
    }, [])

    return(
        
        <View style={styles.container}>
            <Image source={{ uri:photo[0].photoUrl, width:300, height:300 }} />
            <Text style={styles.title}>{recipe.recipeTitle}</Text>
            <Text style={styles.content}>{recipe.recipeContent}</Text>
            <Text>Recipe Detail Screen</Text>
            <Text>{JSON.stringify(recipe)}</Text>
            <Text>{JSON.stringify(photo)}</Text>

        </View>
    )
} //레시피 페이지에서 검색결과(Detail) 화면단 이동 실패..... 화면단 표출은 이상없음

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleImage:{
        width:"300",
        height:"300",
    },
    title:{
        fontSize:24,
    },
    content: {
        fontSize:18,
        color:'grey'
    }
}) //css