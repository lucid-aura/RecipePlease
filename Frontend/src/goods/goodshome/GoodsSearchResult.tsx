import { DrawerActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationHeader } from "../../theme";
import config from "../../project.config"
import { Button, Card, Paragraph, Title } from 'react-native-paper';

export default function DoodSearchResult({ route }:any) { // 레시피 검색 결과
    const navigation = useNavigation()
    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])
    const { search } = route.params

    const [result, setResult] = useState([])
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])

    useEffect( () => {
        const fetchSearch = async() =>{
            const searchRes =await axios.post(config.address + "searchGoods", null,  {
                params: {
                    search:search
                } ,
            })
            setResult(searchRes.data)
        }
        fetchSearch()
    }, [])

  return (
    <SafeAreaView style={styles.container}>
            <NavigationHeader title="레시피를 부탁해" viewStyle={{}}
                target="goods"
                Left= {() => <Icon name="text-account" size={30} onPress={drawerOpen} />}
                Right= {() => <Icon name="cart-heart" size={30} />}/>

        <Text style={{fontSize:36}}>"{search}" 검색 결과</Text>

        <ScrollView style={{width:600}}>

        {result.length  ?
            result.map((item, index) => (
                
                <View key={index} style={styles.card}>
                    <Card 
                        onPress = {() => {
                            navigation.navigate('RecipeDetail' as never,{
                                seq: item.goodsSeq, 
                            } as never)
                        }}>
                        <Card.Cover source={config.titleImageUri[item.goodsSeq]} />
                        <Card.Title title={item.goodsName} subtitle={"평점 : " + item.goodsRating} />
                        <Card.Content>
                            <Title>
                                {item.goodsCategory +" / "+ item.goodsPrice + "원"}
                            </Title>
                        </Card.Content>
                    </Card>
                </View>
            ))
        :
        <Text style={{fontSize:36}}>검색 결과가 없습니다.</Text>

        }

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

