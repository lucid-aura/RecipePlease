import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationHeader } from "../theme";
import config from "../project.config"
import { Button, Card, Paragraph, Title } from 'react-native-paper';

export default function RecipeSearchResult({ route }:any) { // 레시피 검색 결과
    const navigation = useNavigation()
    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])
    const { search } = route.params
    const { bigOptions } = route.params
    const { smallOptions } = route.params
    const [result, setResult] = useState(
        {
            recipes:[{
                "memberId": "", 
                "recipeBigCategory": "", 
                "recipeContent": "", 
                "recipeGoodsTag": "", 
                "recipePrice": 0, 
                "recipeRating": 0.0, 
                "recipeReadcount": 0, 
                "recipeSeq": 0, 
                "recipeSmallCategory": "", 
                "recipeTitle": "", 
                "recipeVideoUrl": "/"
            }],
            thumbnails:[{
                "docsSeq":0,
                "photoCategory":"",
                "photoContent":"",
                "photoSeq":8,
                "photoTitle":"",
                "photoUrl":"/"
            }]
        }
    )

    const changeReadcount = (index:number, newReadcount:any) => {
        let  newData = result;
        (newData.recipes[index].recipeReadcount as any) = newReadcount;
        setResult(newData)
    }
    
    const changeAvarage = (index:number, newAvarage:any) =>{
       let  newData = result;
       (newData.recipes[index].recipeRating as any) = newAvarage;
       setResult(newData)
    }

    useEffect( () => {
        const fetchSearch = async() =>{
            const searchRes =await axios.post(config.address + "searchRecipe", null,  {
                params: {
                    search:search,
                    bigOptions: encodeURI(bigOptions),
                    smallOptions: encodeURI(smallOptions),
                } ,
            })
            setResult(searchRes.data)

            console.log(searchRes.data)
            console.log(bigOptions)
            console.log(smallOptions)
        }
        fetchSearch()
    }, [])

  return (
    <SafeAreaView style={styles.container}>
         <NavigationHeader title="홈" 
                Left= {() => <Icon name="arrow-left-bold" size={30} onPress={goBack} />}
                Right= {() => <Icon name="cart-heart" size={30} />} />

        <Text>{search}</Text>
        <Text style={{fontSize:36}}>"{search}" 검색 결과</Text>

        <ScrollView style={{width:600}}>
            {result.recipes.map((item, index) => (
                
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
                        <Card.Cover source={{ uri: result.thumbnails[index].photoUrl}} />
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

