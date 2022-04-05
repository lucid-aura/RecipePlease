import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert,  StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";
import { SliderBox }  from "react-native-image-slider-box";
import config from "../project.config"

export default function RecipeRecommendList( { category } :any) { // 굿즈 태그 연결 부분
    
    const navigation = useNavigation()
    const [recipeData, setRecipeData] = useState({
        "recipePrice":[],
        "recipeSeq": [],
        "recipeRating":[],
        "thumbnailPhoto":[],
        "title":[],
        "videoUrl":[],
        "readcount":[]
    })

    const [index, setIndex] = useState(0) // 추천 레시피 인덱스


    const changeReadcount = (index:number, newReadcount:any) => {
        console.log(index + "번에 들어온 새로운 조회수 : " + newReadcount)
        let  newData = recipeData;
        newData.readcount[index] = newReadcount;
        setRecipeData(newData)
    }

    const changeAvarage = (index:number, newAvarage:any) =>{
        console.log(index + "번에 들어온 새로운 평균 : " + newAvarage)
       let  newData = recipeData;
       newData.recipeRating[index] = newAvarage;
       setRecipeData(newData)
    }

    useEffect( () => {
        const fetchRecipe = async() =>{
            const recipeRes =await axios.get(config.address + "getRecommendRecipe?category=" + category)
            setRecipeData(recipeRes.data)          
        }
        fetchRecipe()
    }, [])

    function checkRecipe(index:number){ // 특정 레시피 선택 시
        if (recipeData.recipePrice[index] > 0){ // 유료 레시피일 경우
            const purchaseCheckRes = axios.get(config.address + "purchaseRecipeCheck?memberId=" + "test"/* 이후 사용자 id로 변경 필요 */ + "&seq=" + recipeData.recipeSeq[index] )
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
            navigation.navigate('RecipeDetail',{
                seq: recipeData.recipeSeq[index], 
                category: 'recipe',
                index:index,
                changeAvarage : changeAvarage,
                changeReadcount : changeReadcount
            })
        }
    }

  return (
    <View>
        <SliderBox
            images={recipeData.thumbnailPhoto}
            sliderBoxHeight={300}
            parentWidth={500}
            onCurrentImagePressed={(index:number) => 
                checkRecipe(index) // 이후에 해당 recipe의 seq로 변경해야함.
            }
            currentImageEmitter={  (index:number) => {
                setIndex(index)
                
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
        
        <Text>{recipeData.title[index]}</Text>
        <Text>{recipeData.readcount[index]}</Text>
        <Text style={styles.ratingText}>{recipeData.recipeRating[index]}</Text>
        <Rating
            type='star'
            ratingCount={5}
            imageSize={50}
            tintColor="#EEEEEE"
            readonly={true}
            fractions={20}
            startingValue={recipeData.recipeRating[index]}
            // minValue={1}
        />
    </View>
  );
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

