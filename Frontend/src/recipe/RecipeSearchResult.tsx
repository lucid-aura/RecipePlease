import { DrawerActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationHeader } from "../theme";
import config from "../project.config"
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { useDispatch } from "react-redux";
import * as D from "../store/drawer"

export default function RecipeSearchResult({ route }:any) { // 레시피 검색 결과
    const navigation = useNavigation()
    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])
    const dispatch = useDispatch()
    const goShoppingCart = () => {
        dispatch(D.drawerChangeFalseAction())
        navigation.dispatch(DrawerActions.openDrawer())
    }

    const { search } = route.params
    const { bigOptions } = route.params
    const { smallOptions } = route.params
    const { sortOrder } = route.params
    const [result, setResult] = useState(
        [{
            "memberId": "", 
            "recipeBigCategory": "", 
            "recipeContent": "", 
            "recipeGoodsTag": "", 
            "recipePrice": 0, 
            "recipeRating": 0.0, 
            "recipeReadcount": 0, 
            "recipeSeq": 0, 
            "recipeSmallCategory": "", 
            "recipeThumbnail":"",
            "recipeTitle": "", 
            "recipeVideoUrl": "/"
        }]
    )

    const changeReadcount = (index:number, newReadcount:any) => {
        let  newData = result;
        (newData[index].recipeReadcount as any) = newReadcount;
        setResult(newData)
    }
    
    const changeAvarage = (index:number, newAvarage:any) =>{
       let  newData = result;
       (newData[index].recipeRating as any) = newAvarage;
       setResult(newData)
    }

    useEffect( () => {
        const fetchSearch = async() =>{
            const searchRes =await axios.post(config.address + "searchRecipe", null,  {
                params: {
                    search:search,
                    bigOptions: encodeURI(bigOptions),
                    smallOptions: encodeURI(smallOptions),
                    sortOrder: encodeURI(sortOrder)
                } ,
            })
            setResult(searchRes.data)
        }
        fetchSearch()
    }, [])

  return (
    <SafeAreaView style={styles.container}>
         <NavigationHeader title="홈" 
            target="recipe"
            Left= {() => <Icon name="arrow-left-bold" size={40} onPress={goBack} />}
            Right= {() => <Icon name="cart-heart" size={40} onPress={goShoppingCart} />} />

        <Text>{search}</Text>
        <Text style={{fontSize:36}}>"{search}" 검색 결과</Text>

        <ScrollView style={{width:600}}>
            {result.map((item, index) => (
                
                <View key={index} style={styles.card}>
                    <Card 
                        onPress = {() => {
                            navigation.navigate('RecipeDetail' as never,{
                                seq: item.recipeSeq, 
                                category: 'recipe',
                                index:index,
                                changeAvarage : changeAvarage,
                                changeReadcount : changeReadcount
                            } as never)
                        }}>
                        <Card.Cover source={{ uri: config.photo +  item.recipeThumbnail}} />
                        <Card.Title title={item.recipeTitle} subtitle={"평점 : " + item.recipeRating} />
                        <Card.Content>
                            <Title>
                                {item.recipeBigCategory + " / " + item.recipeSmallCategory}
                            </Title>
                        </Card.Content>
                    </Card>
                </View>
            ))}
        {/* <View style={{width:480, height:360}}>
        <Card
            onPress = {() => {Alert.alert("asdf")}}>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Title title="Card Title" subtitle="Card Subtitle" />
            <Card.Content>
                <Title>Card title</Title>
                <Paragraph>Card content</Paragraph>
            </Card.Content>

        </Card>
        </View> */}
        </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    card: {
        marginBottom:50
    }


}) //css

