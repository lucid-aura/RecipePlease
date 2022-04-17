import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Rating } from "react-native-ratings";
import { Button, DataTable, TextInput } from 'react-native-paper';
import config from "../project.config"
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import * as L from '../store/login'
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NavigationHeader } from "../theme";
import GoodsSearch from "./goodshome/GoodsSearch";
import * as D from "../store/drawer"

/*
npm install react-native-table-component
*/
export default function GoodsDetailRating( { route } :any) { // 평가 및 별점 부여 컴포넌트

    const [point, setPoint] = useState(3) // 댓글 입력시 기본 3점 default 값
    const [rating, setRating] = useState([]) // 해당 레시피의 평가글들을 모아놓은 배열
    const [text, setText] = useState("") // 입력한 평가 글

    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log
    
    const navigation = useNavigation()
    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])

    const { seq } = route.params
    const { setAvarage } = route.params

    const dispatch = useDispatch()
    const goShoppingCart = () => {
        dispatch(D.drawerChangeFalseAction())
        navigation.dispatch(DrawerActions.openDrawer())
    }

    function writeCommentReq(){ // 평가글 및 점수 입력 등록 했을 시
        const response = axios.post(config.address + "writeGoodsComment", null , {
            params: {
                memberId:loggedUser.memberId,
                docsSeq:seq,
                ratingCategory:'goods',
                ratingScore:point,
                ratingComment:text,
            } 
        }).then(function(res) {
            setRating(res.data)

            // 평점 구하는 부분
            let sum = 0;
            res.data.map((item:any, index:number) => {
                sum += item.ratingScore
            })
            let avg = (sum/res.data.length).toFixed(2)
            setAvarage(parseFloat(avg))
        }).catch(function(err){
            console.log(err)
        })
    }

    if (text.length > 500) { // 댓글 제한 500자
        Alert.alert("","길이는 최대 500자 제한입니다.");
        setText(text.substring(0, 500));
    }

    useEffect( () => { }, [rating, point])// 새로운 글이 작성되었을 시 다시 랜더링
    
    useEffect( () => { // 첫 진입 시 랜더링
        console.log("rating effect rerendering")
        console.log("seq: " + seq)
        let completed = false;
        const fetchRating = async() =>{
            console.log("Rating 컴포넌트 " + seq)
            const ratingRes =await axios.get(config.address + "getGoodsRatingsBySeq?docsSeq=" + seq )
            setRating(ratingRes.data)
        }

        fetchRating()

        return () => {
            completed = true;
          };
    }, [])


  return (
    // 평가 보여주는 View
    <SafeAreaView style={styles.container}>
    {/* 상단 네비게이터 */}
    <NavigationHeader title="레시피를 부탁해" viewStyle={{}}
                target="goods"
                Left= {() => <Icon name="arrow-left-bold" size={40} onPress={goBack} />}
                Right= {() => <Icon name="cart-heart" size={40} onPress={goShoppingCart} />}/>

        {/* 상품/리뷰 탭 */}
        <View style={styles.tap}>
             <TouchableHighlight activeOpacity={0.9} style={styles.subtap}
                onPress={() => navigation.navigate('goodsDetail', {"seq": 8})}>
                <View>
                    <Text>삼품페이지 </Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight activeOpacity={0.9} style={styles.subtap}
                onPress={() => navigation.navigate('goodsDetailRating', {"seq": 8})}>
                <View>
                    <Text>상품리뷰 </Text>
                </View>
            </TouchableHighlight>
        </View>
        
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>id</DataTable.Title>
                <DataTable.Title>내용</DataTable.Title>
                <DataTable.Title numeric>평가점수</DataTable.Title>
            </DataTable.Header>
            {rating.map((item:any, index:number)=> (
                <DataTable.Row key={index}>
                    <DataTable.Cell>{item.memberId}</DataTable.Cell>
                    <DataTable.Cell>{item.ratingComment}</DataTable.Cell>
                    <DataTable.Cell style={{justifyContent:"flex-end"}}>{item.ratingScore}</DataTable.Cell>
                </DataTable.Row>
            ))}

        </DataTable>

        {/* 평가 작성하는 부분 */}
        <View style={styles.inputRating}>
            <TextInput style={{width:360, marginRight:10}}
                label="평가작성하기"
                value={text}
                onChangeText={(text) => setText(text)}
                right={<TextInput.Affix text={text.length + "/500"} />}
            />

            <Rating
                    type='star'
                    ratingCount={5}
                    imageSize={20}
                    tintColor="#EEEEEE"
                    onFinishRating={(p:any) => setPoint(p)}
                    startingValue={3}
                    minValue={1}
                    fractions={0}
                    style={{marginRight:10}}
            />


            <Button mode="contained" onPress={writeCommentReq}>
                등록
            </Button>
        </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',


    },
    subtap:{
        alignContent:'stretch',
        width:"50%",
        textAlign:"center",
        justifyContent: "space-around",
        alignItems:"center"
    },
    inputRating: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    aligns: {
        alignItems:'center'
    },
    tap:{
        marginTop:3,
        marginBottom:3,
        backgroundColor:"white",
        width:"100%",
        height: 40,
        flexDirection: 'row',
    },

}) //css

