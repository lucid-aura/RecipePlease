import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import address from "../project.config"

export default function RecipeDetailOrder({seq, category}:any) {

    const [cookorder, setCookorder ]= useState([]) //  조리법 데이터 저장하는 변수

    useEffect( () => { // 첫 진입 시 랜더링

        let completed = false;


        const fetchPhoto = async() =>{
            const photoRes = await axios.get(address + "getPhoto?docsSeq=" + seq +"&photoCategory=" + category)
            if (!completed) {

                //console.log(photoRes.data)

                setCookorder(photoRes.data.filter(element => {
                    return element.photoTitle == 'cookOrder'
                }))
            }
        }
        fetchPhoto()
    }, [])

  return (
    <SafeAreaView style={styles.container}>
            {cookorder.map((order, index) :any=> (
                <View key={index} style={styles.orderOne}>
                    <Image source={{ uri:order.photoUrl, width:100, height:100 }} />
                    <Text style={styles.orderTitle}>{order.photoContent}</Text>
                </View>
            ))}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection:"column",
        justifyContent:'center'
    },
    orderOne:{
        flexDirection:"row",
        alignItems:"flex-start",
        marginTop:10,
        marginBottom:10
    },
    orderTitle:{
        marginLeft:50,
        alignItems:"center",
        justifyContent:'center',
        width:200,
        height:100
    },
    title:{
        fontSize:24
    },
    content: {
        fontSize:18,
        color:'grey'
    }
}) //css

