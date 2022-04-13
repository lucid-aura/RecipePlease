import React, { useState } from "react";
import type { FC } from 'react' 
import { MyFavoriteRecipeProps } from "../data";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native-paper";
import { Rating } from "react-native-ratings";

export type MyFavoriteRecipeDatas = {
    datas:MyFavoriteRecipeProps
}

const MyFavoriteFlatlist:FC<MyFavoriteRecipeDatas> = ({datas: initialDatas}) => {
    const [myRecipe, setMyRecipe] = useState<MyFavoriteRecipeProps>(initialDatas)
    
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
                >{myRecipe.recipeTitle}</Text>
                <View style={{marginTop:5}}>
                    <Text style={[styles.id]}>{myRecipe.memberId}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Rating
                        type='star'
                        ratingCount={5}
                        imageSize={20}
                        startingValue={myRecipe.recipeRatingList}
                        minValue={1}
                        fractions={20}
                        readonly={true}
                        style={{alignItems:"baseline", marginTop:10}}
                        
                    />
                    <View style={[styles.ratingCount]}>
                        <Text style={{fontSize:18, color:Colors.grey500}}>({myRecipe.recipeRatingCountList})</Text>
                    </View>
                    <View style={[styles.readCount]}>
                        <Text style={{fontSize:18, color:Colors.grey500}}>조회수 {myRecipe.recipeRatingList}회</Text>
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
        padding:5
    },
    leftView: {
        padding:5,
    },
    rightView: {
        flex:1,
        padding:10,
        marginRight:10,
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