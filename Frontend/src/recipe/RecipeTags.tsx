/* 공사중 */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'

export default function RecipeDetailOrder( {tag} :any) { // 굿즈 태그 연결 부분
    useEffect( () => {
        let completed = false;
        const fetchTags = async() =>{
        }
        fetchTags()

        return () => {
            completed = true;
          };
    }, [])

  return (
    <SafeAreaView style={styles.container}>
        
        {tag.map((tag:any, index:number)=> (
            <View key={index}>
                <TouchableOpacity activeOpacity={0.8} style={styles.tag} onPress={() => { 
                    Alert.alert("태그 alert 타이틀", tag) /* test - 함수로 링크 연결 가능 */
                    }}>
                    <Icon name='pricetag-outline' size={20} />
                    <Text >{tag}</Text>
                </TouchableOpacity>
            </View>
        ))}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection:"row",
        justifyContent:'center'
    },
    tag:{
        marginLeft:5,
        marginRight:5,
        fontSize:20,
        flexDirection:"row",
        backgroundColor:'#9ADCFF',
        borderRadius:5,
        paddingLeft:5,
        paddingRight:5
    },
    tagOne:{
        flexDirection:"row",
        alignItems:"flex-start",
        marginTop:10,
        marginBottom:10
    }
}) //css

