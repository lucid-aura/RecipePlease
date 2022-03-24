import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { Rating } from "react-native-ratings";
import { Button, DataTable, TextInput } from 'react-native-paper';

/*
npm install react-native-table-component
*/
export default function RecipeDetailOrder( {seq, setAvarage} :any) {

    const [point, setPoint] = useState(3)
    const [rating, setRating] = useState([])
    const [inputRating, setInputRating] = useState({memberId:"", ratingComment:"", score:0})
    const [text, setText] = useState("")
    
    function writeCommentReq(){
        console.log("writeCommentReq 함수 실행")
        const response = axios.post("http://192.168.0.4:3000/writeComment", null , {
            params: {
                memberId:'test',
                docsSeq:seq,
                ratingCategory:'recipe',
                ratingScore:point,
                ratingComment:text,
            } 
        }).then(function(res) {
            setRating(res.data)
            let sum = 0;
            res.data.map((item:any, index:number) => {
                sum += item.ratingScore
            })
            let avg = (sum/res.data.length).toFixed(2)
            console.log(avg)
            setAvarage(parseFloat(avg))
        }).catch(function(err){
            console.log(err)
        })

        
        
    }

    if (text.length > 500) {
        Alert.alert("","길이는 최대 500자 제한입니다.");
        setText(text.substring(0, 500));
    }

    useEffect( () => {
        console.log("테이블 업데이트")
    }, [rating, point])

    useEffect( () => {
        console.log("rating effect rerendering")
        let completed = false;
        const fetchRating = async() =>{
            console.log("Rating 컴포넌트 " + seq)
            const ratingRes =await axios.get("http://192.168.0.4:3000/getAllRatingsBySeq?docsSeq=" + seq )
            setRating(ratingRes.data)

            /*
            let sum = 0;
            ratingRes.data.map((item:any, index:number) => {
                sum += item.ratingScore;
                
            })
            let avg = (sum/ratingRes.data.length).toFixed(2)
            setPoint(parseFloat(avg))
            console.log("길이는 : " + ratingRes.data.length + " 합은 : " + sum + " 평균은 : " + sum/ratingRes.data.length)
            console.log(ratingRes.data)


            let tableData:any = []
            ratingRes.data.map((item:any, index:number) => {
                tableData.push( [item.memberId, item.ratingComment, item.ratingScore] )
            })
            

            let ratings = {
                HeadTable: ['id', 'comment', 'score'],
                DataTable: tableData
            }
            //setRatingTable(ratings)
            console.log(ratings)
            */
        }

        const writeComment = async () => {
            writeCommentReq()
        }

        fetchRating()

        return () => {
            completed = true;
          };
    }, [])

    function test() {
        Alert.alert("태그 alert 타이틀", "1")
    }

  return (
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

        {/* <Rating
                    type='star'
                    ratingCount={5}
                    imageSize={30}
                    showRating
                    tintColor="#EEEEEE"
                    onFinishRating={(p:any) => setPoint(p)}
                    readonly={true}
                    startingValue={point}
                    minValue={1}
                    fractions={20}
        /> */}
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

