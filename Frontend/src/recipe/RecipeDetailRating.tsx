import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { Rating } from "react-native-ratings";
import { Button, DataTable, TextInput } from 'react-native-paper';
import config from "../project.config"

/*
npm install react-native-table-component
*/
export default function RecipeDetailOrder( { seq, setAvarage, index, changeAvarage } :any) { // 평가 및 별점 부여 컴포넌트

    const [point, setPoint] = useState(3) // 댓글 입력시 기본 3점 default 값
    const [rating, setRating] = useState([]) // 해당 레시피의 평가글들을 모아놓은 배열
    const [text, setText] = useState("") // 입력한 평가 글
    
    function writeCommentReq(){ // 평가글 및 점수 입력 등록 했을 시
        console.log("writeCommentReq 함수 실행")
        const response = axios.post(config.address + "writeComment", null , {
            params: {
                memberId:'test', // 이후 memberId 에따라 로그인 확인 및 변경 필요
                docsSeq:seq,
                ratingCategory:'recipe',
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
            setAvarage(parseFloat(avg)) // 여기있는 이  setter함수는 부모 컴포넌트(RecipeDetailScreen)에서 받아온 함수
            changeAvarage(index, parseFloat(avg))
            //updateRecipeDataAfterComment() // 부모의 자매 컴포넌트에서 받아온 레시피 평균 값 변경 시 추천 레시피 리로드 함수
        }).catch(function(err){
            console.log(err)
        })

        
        
    }

    if (text.length > 500) { // 댓글 제한 500자
        Alert.alert("","길이는 최대 500자 제한입니다.");
        setText(text.substring(0, 500));
    }

    useEffect( () => { // 새로운 글이 작성되었을 시 다시 랜더링
        console.log("테이블 업데이트")
    }, [rating, point])

    useEffect( () => { // 첫 진입 시 랜더링
        console.log("rating effect rerendering")
        let completed = false;
        const fetchRating = async() =>{
            console.log("Rating 컴포넌트 " + seq)
            const ratingRes =await axios.get(config.address + "getAllRatingsBySeq?docsSeq=" + seq )
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
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>id</DataTable.Title>
                <DataTable.Title>content</DataTable.Title>
                <DataTable.Title numeric>score</DataTable.Title>
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
            <TextInput style={{width:400, marginRight:10}}
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
        justifyContent:'center',
        width:600,
    },
    inputRating: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    }

}) //css

