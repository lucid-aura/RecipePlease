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
            onPress={() => navigation.navigate('goodsDetail', {"seq": 8}

              
            )}>

            
            <View style={styles.card}>
                    <View style={styles.img}/>
                        <View style={styles.mainstory}>
                           <View style={styles.story}>
                                <Text style={{fontSize:20, fontWeight:"bold"}}>99,990원</Text>
                            </View>
                            <View style={styles.story1}>
                                <Text style={{fontSize:15,}}>
                                    놋담(식기) 백화점 선물포장 방짜유기 1인 식기세트(공기+대접+수저)
                                </Text>
                                    </View>
                                <View style={styles.story2}>
                                    <Text>별점</Text>
                                 </View>
                            </View>
                </View>
               



          </TouchableHighlight>
        );
      };
  return(

        <View>
            <Card food={foods[1]}/>
        </View>


    
  
  )
}







const styles = StyleSheet.create({
  card: {
    position:"absolute",
    backgroundColor:'white',
    width:'50%',  
    paddingBottom:"130%"
},
  card1: {
    position:"absolute",
    backgroundColor:'white',
    width:'50%',  
    paddingBottom:"130%",
    right:0,
  },
  card2: {
    position:"absolute",
    backgroundColor:'white',
    width:'50%',  
    paddingBottom:"10%",
    bottom:0,
  },
  card3: {
    position:"absolute",
    backgroundColor:'white',
    width:'50%',  
    paddingBottom:"10%",
    right:0,
    bottom:0,
  },
img:{
  elevation: 16,
  width:"92%",
  paddingBottom:"92%",
  backgroundColor:'dodgerblue',
  left:"4%",
  top:"4%",
  borderRadius:10,
},
mainstory:{
  left:"4%",
  top:"5%"
},
story:{
  left:"4%",
  top:"5%",
},
story1:{
  left:"4%",
  top:"6%",
},
story2:{
  left:"4%",
  top:"8%",
}


})
//마이 컴포넌트 이동

