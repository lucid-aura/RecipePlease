import React, { ReactNode, useMemo, useState } from "react";
import type { FC } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native-paper";
import { Rating } from "react-native-ratings";
import { MyUploadedRecipeProps } from "../data/MyUploadedRecipeProps";
import { useNavigation } from "@react-navigation/native";

export type MyUploadedRecipeDatas = {
    datas:MyUploadedRecipeProps
}

const MyUploadedRecipeFlatList:FC<MyUploadedRecipeDatas> = ({datas: initialDatas}:any) => {
    const [myRecipe, setMyRecipe] = useState<MyUploadedRecipeProps>(initialDatas)
    
    const ratingCount = useMemo(() => {
        Object.keys(myRecipe.recipeRating).length
    },
    [Object.keys(myRecipe.recipeRating).length] 
    )

    const navigation = useNavigation()
    const goRecipeDetail = () => {
        navigation.navigate('RecipeNavigator', {
            screen: 'RecipeDetail', 
            params:{
                seq: myRecipe.recipeSeq,
                category: 'recipe'
            }})
    }

    return (
        
        <Pressable style={[styles.container]} onPress={goRecipeDetail} >
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
                        startingValue={myRecipe.recipeRating}
                        minValue={1}
                        fractions={20}
                        readonly={true}
                        style={{alignItems:"baseline", marginTop:10}}
                    />
                    <View style={[styles.ratingCount]}>
                        <Text style={{fontSize:18, color:Colors.grey500}}>({ratingCount})</Text>
                    </View>
                    <View style={[styles.readCount]}>
                        <Text style={{fontSize:18, color:Colors.grey500}}>조회수 {myRecipe.recipeReadcount}회</Text>
                    </View>
                    
                </View>
            </View>
            
        </Pressable>
    ) 
}

export default MyUploadedRecipeFlatList

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