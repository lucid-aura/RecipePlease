/*
실행 전 Axios url 반드시 확인해주세요! 현재 각자의 로컬 주소로 되어있습니다.

npm install react-native-tags-input
npm install @react-native-community/blur

*/

import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Dimensions, Alert } from "react-native";
import axios from 'axios';
import RecipeDetailOrder from "./RecipeDetailOrder";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RecipeTags from './RecipeTags'
import RecipeDetailRating from './RecipeDetailRating'
import { Rating } from "react-native-ratings";
import YoutubePlayer, {YoutubeIframeRef} from "react-native-youtube-iframe";
import { NavigationHeader } from "../theme";
import config from "../project.config"
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import * as L from '../store/login'
import { BlurView } from "@react-native-community/blur";
import * as D from "../store/drawer"

export default function RecipeDetailScreen({ route }:any){

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const goShoppingCart = () => {
        dispatch(D.drawerChangeFalseAction())
        navigation.dispatch(DrawerActions.openDrawer())
    }

    const [thumbnail, setThumbnail] = useState({
        docsSeq:-1,
        photoCategory:"",
        photoContent:"",
        photoSeq:-1,
        photoTitle:"",
        photoUrl:"-"
    }) // 썸네일 이미지 링크

    const [recipe, setRecipe]= useState({
        memberId:"",
        recipeBigCategory:"",
        recipeContent:"",
        recipeGoodsTag:"",
        recipePrice:0,
        recipeRating:0.0,
        recipeReadcount:0,
        recipeSeq:-1,
        recipeSmallCategory:"",
        recipeTitle:"",
        recipeVideoUrl:"-"
    }); // 레시피 데이터

    const [tag, setTag] = useState([]) // 태그 데이터
    const [avarage, setAvarage]  = useState(0.0) // 각 레시피 평균 점수
    const [likeIconName, setLikeIconName] = useState("heart-plus-outline") // 좋아요 아이콘 
    const [url, setUrl] = useState() // 유튜브 url
    const [blur, setBlur] = useState(<Text> </Text>) 
    const [load, setLoad] = useState(false)

    const playerRef = useRef<YoutubeIframeRef>(null) // ???

    const { seq } = route.params; // 받아온 레시피 seq
    const { category } = route.params; // 받아온 카테고리
    const { index } = route.params;
    const { changeAvarage } = route.params;
    const { changeReadcount } = route.params;
    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log
    
    
    useEffect( () => {
        const fetchRecipe = async() =>{ // 디테일로 들어온 하나의 레시피 정보를 받아옴
            const recipeRes =await axios.get(config.address + "getOneRecipe?recipeSeq=" + seq )
            let check = true;
            if (recipeRes.data.recipePrice > 0){ // 유료 레시피인 경우
                if (!loggedIn) { // 로그인 여부 확인
                    Alert.alert("유료 레시피입니다.", "로그인이 필요합니다." ,
                        [
                          {
                            text: "로그인",
                            onPress: () => {
                                setBlur(<></>)
                                navigation.navigate('RecipeHome' as never)
                                navigation.navigate('MyNavigator' as never)
                            }},
                          {
                            text: "뒤로가기",
                            onPress: () => {
                                setBlur(<></>)
                                navigation.navigate('RecipeHome' as never)
                            }},
                        ],
                        { cancelable: false}
                      );
                    check = false;
                }
                else {
                    // memberId를 통해 레시피 구매여부 확인
                    const purchaseRes = await axios.get( config.address + "coin/checkPurchaseRecipe?memberId=" + loggedUser.memberId + "&docsSeq=" + seq)
                    if (purchaseRes.data > 0){ // 구매 확인
                        // 레시피와 태그, 평균, 조회수를 갱신
                    }
                    else {
                        // 구매 페이지로 단순 alert? 이동?
                        check = false;
                        Alert.alert("", "구매가 필요합니다.")
                        
                    }
                }   
            }

            /* 로그인, 구매 조건 만족 못했을 경우 블러 처리 */
            if (!check){
                setBlur(                
                    <BlurView
                        style={styles.absolute}
                        blurType="light"
                        blurAmount={10}
                        reducedTransparencyFallbackColor="white"
                    />
                )
            }

            /* 데이터 로딩 */
            setRecipe(recipeRes.data);
            console.log(recipeRes.data);
            setTag(recipeRes.data.recipeGoodsTag.split(","))
            setAvarage(recipeRes.data.recipeRating)
            if (recipeRes.data.recipeVideoUrl != ""){
                setUrl(recipeRes.data.recipeVideoUrl.split("=")[1])
            } 
            changeReadcount(index, recipeRes.data.recipeReadcount)
            const thumbnailRes = await axios.get( config.address + "getThumbnailPhoto?docsSeq=" + seq +"&photoCategory=" + category) // 해당 레시피의 썸네일 사진을 받아옴
            setThumbnail(thumbnailRes.data);

            // Loading 완료
            setLoad(true)
        }

        fetchRecipe()
    }, [])

    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])

    const likeRecipe = () => {
        if (likeIconName == "heart-plus-outline") {
            setLikeIconName("heart-plus")
            const response = axios.get(config.address + "likeRecipe", {
            params: {
                memberId:loggedUser.memberId,
                recipeSeq:seq,
            } 
            }).then(function(res) {
                console.log(res.data)
            }).catch(function(err){
                console.log(err)
            })
        }
        else {
            setLikeIconName("heart-plus-outline")
            const response = axios.get(config.address + "unlikeRecipe", {
            params: {
                memberId:loggedUser.memberId,
                recipeSeq:seq,
            } 
            }).then(function(res) {
                console.log(res.data)
            }).catch(function(err){
                console.log(err)
            })
        }   
    }
    return(
        
        <SafeAreaView style={styles.container}>

            <View>
            <NavigationHeader title="홈" 
                Left= {() => <Icon name="arrow-left-bold" size={40} onPress={goBack} />}
                Right= {() => <Icon name="cart-heart" size={40} onPress={goShoppingCart} />} />

            <ScrollView overScrollMode="never" style={styles.contentContainer}>
                {/*조회수, 좋아요, 타이틀과 사진이 들어가는 View */}
                { load &&
                <View style={{paddingBottom:20}}>
                    <Text style={styles.title}>{recipe.recipeTitle}</Text>
                    <View style={styles.alienRow}>
                        <Text style={styles.readcount}>조회수 : {recipe.recipeReadcount}</Text>
                        <Icon name={likeIconName} size={40} onPress={likeRecipe} />

                    </View>
                    <View style={{alignItems:"center"}}>
                        <Image style={{borderRadius:15}} source={{ uri:thumbnail.photoUrl, width:520, height:340 }} />
                    </View>
                </View>
                }

                {/* 별점에 관련된 View */}
                { load &&
                <View>
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
                }

                {/* 조리법에 관련된 View (조리법 순서 component 로 연결) */}
                { load &&
                <View>
                    <Text style={styles.subTitle}>조리법</Text>
                    
                    <RecipeDetailOrder seq={seq} category={category} />
                </View>
                }

                {/* 요리 설명에 관련된 View */}
                { load &&
                <View>
                    <Text style={styles.subTitle}>요리설명</Text>
                    <Text style={styles.content}>{recipe.recipeContent}</Text>
                </View>
                }

                {/* 유튜브 링크 View */}
                { load &&
                <View style={{marginTop:20}}>
                    <Text style={styles.subTitle}>영상설명</Text>
                    <YoutubePlayer
                        webViewStyle={{opacity: 0.99}}
                        useLocalHTML={true}
                        ref={playerRef}
                        height={400}
                        width={600}
                        videoId={url}
                        onError={(err) => console.log(err)}
                        onChangeState={(a) => console.log(a)}
                    />
                </View>
                }

                {/* 태그 RecipeTags 컴포넌트 View */}
                { load &&
                <View>
                    <Text style={styles.subTitle}>태그</Text>
                    <RecipeTags tag={tag} />
                </View>
                }
                {/* 평가 ReipeDetailRating View */}

                { load &&
                <View>
                    {/* 평점 리스트 및 입력 부분 자식 컴포넌트 */}
                    <Text style={styles.subTitle}>평가</Text>
                    <RecipeDetailRating  seq={seq} setAvarage={setAvarage} avarage={avarage} index={index} changeAvarage={changeAvarage} />
                </View>
                }
                {blur}

            </ScrollView>
            </View>
        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 0,
        marginTop:20,
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
        fontSize:36,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    subTitle:{
        fontSize:30,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    content: {
        width:560,
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
    },
    alienRow: {
        flexDirection:'row',
        justifyContent:"flex-end",
        marginRight:10
    },
    readcount: {
        justifyContent:'center', 
        fontSize:30, 
        marginRight:10
    },
    absolute: {
        position: "absolute",
        top: 10,
        left: 0,
        bottom: 0,
        right: 0
    }

}) //css