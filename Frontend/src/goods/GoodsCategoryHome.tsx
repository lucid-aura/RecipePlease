import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import COLORS from '../consts/colors';


const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
export default function GoodsCategoryHome({categorys}:any){
    
    const navigation = useNavigation()
    const Card = ({category}:any) => {
        return (
          <TouchableHighlight//사진 및 디테일 설정
            underlayColor={COLORS.white}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('goodsSpoonList', {"seq": 8}

              
            )}>
            <View style={styles.card}>
            
            </View>
          </TouchableHighlight>
        );
      };
  return(
    <View>
        <View style={{flexDirection:"row"}}>
            <Card category={categorys}/>
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