import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, Text,StyleSheet, Button, SafeAreaView, Alert, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { Rating } from "react-native-ratings";

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


    const [livestockIndex, setLivestockIndex] = useState(0) // 축산물 추천 레시피 인덱스
    const [seafoodIndex, setSeafoodIndex] = useState(0) // 수산물 추천 레시피 인덱스
    
    const [livestockAvarage, setLivestockAvarage] = useState(0.0)
    const [seafoodAvarage, setSeafoodAvarage] = useState(0.0)

    const [data, setData] = useState({ // Axios를 통해 받아온 데이터 변수 선언 및 구조
        "livestock":{
            "recipePrice":[],
            "recipeSeq": [],
            "recipeRating":[],
            "thumbnailPhoto":[],
            "title":[],
            "videoUrl":[]
        },
        "seafood":{
            "recipePrice":[],
            "recipeSeq": [],
            "recipeRating":[],
            "thumbnailPhoto":[],
            "title":[],
            "videoUrl":[]
        }
    })

    const star = function() { // 댓글 평가 작성 시 추천 레시피 재조회
        console.log("this is test function")
        axios.get("http://192.168.0.4:3000/getRecommendRecipe")
            .then(function(res){
                setData(res.data)
                console.log(res.data)
            })
            .catch(function(err) {
                console.log(err)
            })
    }

    function checkRecipe(category:String, index:number){ // 특정 레시피 선택 시
        if (category == "livestock"){ // 축산물
            if (data.livestock.recipePrice[index] > 0){ // 유료 레시피일 경우
                const purchaseCheckRes = axios.get("http://192.168.0.4:3000/purchaseRecipeCheck?memberId=" + "test"/* 이후 사용자 id로 변경 필요 */ + "&seq=" + data.livestock.recipeSeq[index] )
                .then(function(res){
                    if (res.data > 0){ // 데이터 전송 후 OK사인(구매확인)을 받으면 페이지 변경
                        /*
                        navigation.navigate('RecipeDetail',{
                            url: testImage[index],
                            seq: index, 
                            category: 'recipe'
                        })
                        */
                    console.log(res.data)
                    }
                    else{
                        Alert.alert("", "구매가 필요합니다.")
                    }
                })
                .catch(function(err) {
                    console.log(err)
                })     

            }
            else{  // 무료 레시피일 경우
                setLivestockAvarage(data.livestock.recipeRating[index])
                navigation.navigate('RecipeDetail',{
                    avarage: livestockAvarage,
                    seq: data.livestock.recipeSeq[index], 
                    star: star,
                    category: 'recipe'
                })
            }
        }
        else{ // 수산물
            if (data.livestock.recipePrice[index] > 0){ // 유료 레시피일 경우
                const purchaseCheckRes = axios.get("http://192.168.0.4:3000/purchaseRecipeCheck?memberId=" + "test"/* 이후 사용자 id로 변경 필요 */ + "&seq=" + data.seafood.recipeSeq[index] )
                .then(function(res){
                    if (res.data > 0){ // 데이터 전송 후 OK사인(구매확인)을 받으면 페이지 변경
                        /*
                        navigation.navigate('RecipeDetail',{
                            url: testImage[index],
                            seq: index, 
                            category: 'recipe'
                        })
                        */
                    console.log(res.data)
                    }
                    else{
                        Alert.alert("", "구매가 필요합니다.")
                    }
                })
                .catch(function(err) {
                    console.log(err)
                })     

            }
            else{ // 무료 레시피일 경우
                setSeafoodAvarage(data.seafood.recipeRating[index])
                navigation.navigate('RecipeDetail',{
                    avarage: seafoodAvarage,
                    seq: data.seafood.recipeSeq[index], 
                    star: star,
                    category: 'recipe'
                })
            }
        }
    }



    useEffect(() => {
        const closeDetail = navigation.addListener('transitionStart', (e) => { // 데이터 반영 시 최신화를 위한 작업
            const recipeRes = axios.get("http://192.168.0.4:3000/getRecommendRecipe")
            .then(function(res){
                console.log("closeDetail")
                setData(res.data)
                
            })
            .catch(function(err) {
                console.log(err)
            })

        });

        return closeDetail;
      }, [navigation]);

    useLayoutEffect( () => { // 첫 진입 시 레시피 데이터 받아옴
        const fetchRecipe = async() =>{
            const recipeRes =await axios.get("http://192.168.0.4:3000/getRecommendRecipe")
            
            setData(recipeRes.data)
            console.log(recipeRes.data)
        }

        fetchRecipe()

    }, [])

    return(
        
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.contentContainer} showsHorizontalScrollIndicator={false}>

                {/* 추천 레시피 View */}
                <View>
                    <Text style={styles.recipeTitle}>축산물 추천 레시피</Text>
                    <SliderBox
                        images={data.livestock.thumbnailPhoto}
                        sliderBoxHeight={300}
                        parentWidth={500}
                        onCurrentImagePressed={(index:number) => 
                            checkRecipe("livestock", index) // 이후에 해당 recipe의 seq로 변경해야함.
                        }
                        currentImageEmitter={  (index:number) => {
                            setLivestockIndex(index)
                            setLivestockAvarage(data.livestock.recipeRating[index])
                        }}
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
                    
                    <Text>{data.livestock.title[livestockIndex]}</Text>
                    <Text style={styles.ratingText}>{livestockAvarage}</Text>
                    <Rating
                        type='star'
                        ratingCount={5}
                        imageSize={50}
                        tintColor="#EEEEEE"
                        readonly={true}
                        fractions={20}
                        startingValue={data.livestock.recipeRating[livestockIndex]}
                        // minValue={1}
                    />

                    <Text style={styles.recipeTitle}>해산물 추천 레시피</Text>
                    <SliderBox
                        images={data.seafood.thumbnailPhoto}
                        sliderBoxHeight={300}
                        parentWidth={500}
                        onCurrentImagePressed={(index:number) => 
                            checkRecipe("seafood", index) // 이후에 해당 recipe의 seq로 변경해야함.
                        }
                        currentImageEmitter={  (index:number) => {
                            setSeafoodIndex(index)
                            setSeafoodAvarage(data.seafood.recipeRating[index])
                        }}
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
                    
                    <Text>{data.seafood.title[seafoodIndex]}</Text>
                    <Text style={styles.ratingText}>{seafoodAvarage}</Text>
                    <Rating
                        type='star'
                        ratingCount={5}
                        imageSize={50}
                        tintColor="#EEEEEE"
                        readonly={true}
                        fractions={20}
                        startingValue={data.seafood.recipeRating[seafoodIndex]}
                        // minValue={1}
                    />
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