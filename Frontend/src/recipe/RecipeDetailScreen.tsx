/*
실행 전 Axios url 반드시 확인해주세요! 현재 각자의 로컬 주소로 되어있습니다.

npm install react-native-tags-input
*/

import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Dimensions, Alert } from "react-native";
import axios from 'axios';
import RecipeDetailOrder from "./RecipeDetailOrder";
import Icon from 'react-native-vector-icons/Ionicons'
import RecipeTags from './RecipeTags'
import RecipeDetailRating from './RecipeDetailRating'
import { Rating } from "react-native-ratings";
//import RecipeDetailYoutube from "./RecipeDetailYoutube";
import YoutubePlayer, {YoutubeIframeRef} from "react-native-youtube-iframe";



const Stack = createNativeStackNavigator()
const context = createContext({})

export default function RecipeDetailScreen({ route, navigation }:any){

    const [thumbnail, setThumbnail] = useState({}) // 썸네일 이미지 링크
    const [recipe, setRecipe]= useState({}); // 레시피 데이터
    const [tag, setTag] = useState([]) // 태그 데이터
    const [avarage, setAvarage]  = useState(0.0) // 각 레시피 평균 점수
    const [url, setUrl] = useState() // 유튜브 url
    const playerRef = useRef<YoutubeIframeRef>(null) // ???

    const { seq } = route.params; // 받아온 레시피 seq
    const { category } = route.params; // 받아온 카테고리
    const { star } = route.params; // 별점 반영 용 홈 setter 함수
    

    useEffect( () => {
        let completed = false;  // 한번 실행을 위한 변수
        
        const fetchRecipe = async() =>{ // 디테일로 들어온 하나의 레시피 정보를 받아옴
            const recipeRes =await axios.get("http://192.168.0.4:3000/getOneRecipe?recipeSeq=" + seq )
            if (!completed) {
                if (recipeRes.data.recipePrice > 0){
                    // 사용자 
                }

                // 레시피와 태그, 평균을 갱신
                setRecipe(recipeRes.data);
                setTag(recipeRes.data.recipeGoodsTag.split(","))
                setAvarage(recipeRes.data.recipeRating)

                if (recipeRes.data.recipeVideoUrl != ""){
                    setUrl(recipeRes.data.recipeVideoUrl.split("=")[1])

                } 
                console.log(recipeRes.data) // 확인용 (log)
                
            }

            const thumbnailRes = await axios.get("http://192.168.0.4:3000/getThumbnailPhoto?docsSeq=" + seq +"&photoCategory=" + category) // 해당 레시피의 썸네일 사진을 받아옴
            if (!completed) setThumbnail(thumbnailRes.data);
        }

        fetchRecipe()
        return () => {
            completed = true;

          };
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.contentContainer}>
                {/* 타이틀과 사진이 들어가는 View */}
                <View>
                    <Text style={styles.title}>{recipe.recipeTitle}</Text>
                    <Text>조회수 : {recipe.recipeReadcount}</Text>
                    <Image source={{ uri:thumbnail.photoUrl, width:600, height:300 }} />
                </View>
                <View>

                {/* 별점에 관련된 View */}
                <Text style={styles.ratingText}>{avarage}/5</Text>
                <Rating
                    type='star'
                    ratingCount={5}
                    imageSize={30}
                    tintColor="#EEEEEE"
                    startingValue={avarage}
                    minValue={1}
                    fractions={20}
                    readonly={true}
                    style={{marginRight:10}}
                />
                </View>

                {/* 조리법에 관련된 View (조리법 순서 component 로 연결) */}
                <View>
                    <Text style={styles.subTitle}>조리법</Text>
                    
                    <RecipeDetailOrder seq={seq} category={category} />
                </View>

                {/* 요리 설명에 관련된 View */}
                <View>
                    <Text style={styles.subTitle}>요리설명</Text>
                    <Text style={styles.content}>{recipe.recipeContent}</Text>
                </View>

                {/* 유튜브 링크 View */}
                <View>
                    <YoutubePlayer
                        ref={playerRef}
                        height={600}
                        width={600}
                        videoId={url}
                    />
                </View>

                {/* 태그 RecipeTags 컴포넌트 View */}
                <View>
                    <Text style={styles.subTitle}>태그</Text>
                    <RecipeTags tag={tag} />
                </View>

                {/* 평가 ReipeDetailRating View */}
                <View>
                    {/* 평점 리스트 및 입력 부분 자식 컴포넌트 */}
                    <Text style={styles.subTitle}>평가</Text>
                    <RecipeDetailRating  seq={seq} setAvarage={setAvarage} avarage={avarage}  star={star} />
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
        width:'100%',
        flex: 1,
        alignItems: 'center',
        marginBottom:10
    },
    titleImage:{
        width:"600",
        height:"300"
    },
    title:{
        fontSize:48,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    subTitle:{
        fontSize:36,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    content: {
        width:600,
        fontSize:18,
        color:'grey'
    },
    textInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
      },
    tag: {
        backgroundColor: '#fff'
    },
    tagText: {
        color: '#3ca897'
    },
    ratingText: {
        color:'#f1c40f',
        fontSize:32,
        textAlign:'center'
    }

}) //css