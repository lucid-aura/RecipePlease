import React, { useState } from "react";
import type { FC } from 'react' 
import { getMyFavoriteRecipeDatas, MyFavoriteRecipeProps } from "../data";
import { Image, StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { Colors } from "react-native-paper";
import { Rating } from "react-native-ratings";
import Color from "color";

export type MyFavoriteRecipeDatas = {
    datas:MyFavoriteRecipeProps
}

const MyFavoriteFlatlist:FC<MyFavoriteRecipeDatas> = ({datas}) => {
    const [myRecipe, setMyRecipe] = useState<MyFavoriteRecipeProps>()
    
    const getData = async() => {
        getMyFavoriteRecipeDatas("fff")
        .then(result => setMyRecipe(result))
    }
    useEffect(() => { getData() },[])
 
    return (
        <View style={[styles.container]}>
            <View style={[styles.leftView]}>
                <Image style={{width:190, height:160}} source={require("./foodPicture.jpg")} />
            </View>
            <View style={[styles.rightView]}>
                <Text 
                    style={[styles.title]}
                    numberOfLines={2}
                    ellipsizeMode="tail"    
                >제목이다ㄴㄷㄹㄴㄷㅁㄹㄷㄴㅁㄹㄴㄷㅁㄹㄴㅁㄷㄻㄴㅁㄴㄷㄻㄴㄷㄻㄴㄷㄻㄴㄷ</Text>
                <View style={{marginTop:5}}>
                    <Text style={[styles.id]}>by 아이디</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Rating
                        type='star'
                        ratingCount={5}
                        imageSize={20}
                        startingValue={3}
                        minValue={1}
                        fractions={20}
                        readonly={true}
                        style={{alignItems:"baseline", marginTop:10}}
                        
                    />
                    <View style={[styles.ratingCount]}>
                        <Text style={{fontSize:18, color:Colors.grey500}}>(2)</Text>
                    </View>
                    <View style={[styles.readCount]}>
                        <Text style={{fontSize:18, color:Colors.grey500}}>조회수 15만</Text>
                    </View>
                    
                </View>
            </View>
            
        </View>
    ) 
}

export default MyFavoriteFlatlist

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.lime100, 
        padding:5
    },
    leftView: {
        padding:5,
        backgroundColor: Colors.amber100
    },
    rightView: {
        flex:1,
        padding:10,
        marginRight:10,
        backgroundColor: Colors.red200
    },
    title: {
        fontSize:25,
        fontWeight:'500'
    },
    id: {
        fontSize:18,
        fontWeight:'400',
        marginTop: 10
    },
    ratingCount: {
        marginTop: 5,
        marginLeft:5
    },
    readCount: {
        marginTop: 5,
        marginLeft:5
    }
    
})