import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import COLORS from '../consts/colors';


const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
export default function Goodslisthome({foods}:any){
    
    const navigation = useNavigation()
    const Card = ({food}:any) => {
        return (
          <TouchableHighlight//사진 및 디테일 설정
            underlayColor={COLORS.white}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('RecipeNavigator', { 
              screen: 'RecipeDetail',
              params:{
                seq:0, 
                updateRecipeDataAfterComment: console.log("여기에 평가 작성 시 데이터 리로드 하는 함수가 들어가야 합니다."),
                category: 'recipe'
              }
            })}>
            <View style={styles.card}>
            <View>
                
            </View>
              <View style={{alignItems: 'center', top: -40}}>
                <Image source={food.image} style={{height: 120, width: 120}} />
              </View>
              <View style={{marginHorizontal: 20}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{food.name}</Text>
                <Text style={{fontSize: 14, color: COLORS.grey, marginTop: 2}}>
                  {food.ingredients}
                </Text>
              </View>
              <View //+ 기호 삭제
                style={{
                  marginTop: 10,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                {food.prompt}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        );
      };
  return(
    <View>
        <View style={{flexDirection:"row"}}>
            <Card food={foods[1]}/>
            <Card food={foods[0]}/>
        </View>
        <View style={{flexDirection:"row"}}>
            <Card food={foods[3]}/>
            <Card food={foods[2]}/>
        </View>
        
    </View>
    
  
  )
}



const styles = StyleSheet.create({
card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
}
})
//마이 컴포넌트 이동