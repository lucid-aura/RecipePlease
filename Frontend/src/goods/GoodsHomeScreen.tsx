import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text,StyleSheet, Button, TextInput, Image, TouchableHighlight, Dimensions, FlatList, ScrollView } from "react-native";
import COLORS from "../consts/colors";
import {default as Icons } from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import foods from "../consts/foods";
import { FlipInEasyX } from "react-native-reanimated";
import Goodslisthome from "./Goodslisthome";



export default function GoodsHomeScreen(){
    
 
    const navigation = useNavigation()
    
    return(
        <ScrollView>
             <View style={styles.inputContainer}>
             <Icon name="search" size={28} />
                 <TextInput //검색바
                 style={{flex: 1, fontSize: 18}}
                 placeholder="검색"/>
             </View>
             <View style={{justifyContent:"center" ,marginTop: 40,flexDirection: 'row',paddingHorizontal: 20, }}>
                 <View style={{marginRight: "10%", alignItems:"center"}}>
                     <Image
                      source={require('../assets/person.png')}
                     style={{height: 90, width: 90, borderRadius: 100, }}
                     />
                     <Text style={{fontSize:20}}>조리용</Text>
                 </View>
                 <View style={{marginRight: "10%",alignItems:"center"}}>
                     <Image
                      source={require('../assets/person.png')}
                     style={{height: 90, width: 90, borderRadius: 100,}}
                     />
                     <Text style={{fontSize:20}}>식기용</Text>
                 </View>
                 <View style={{marginRight: "10%",alignItems:"center"}}>
                     <Image
                      source={require('../assets/person.png')}
                     style={{height: 90, width: 90, borderRadius: 100,}}
                     />
                     <Text style={{fontSize:20}}>세척용</Text>
                 </View>
                 <View style={{alignItems:"center"}}>
                     <Image
                      source={require('../assets/person.png')}
                     style={{height: 90, width: 90, borderRadius: 100,}}
                     />
                     <Text style={{fontSize:20}}>추천상품</Text>
                 </View>
             </View>
             
             <Goodslisthome
                 foods={foods}
              />
             <Button title="Pay로 이동" onPress={()=>navigation.navigate('paymentInfo')}></Button>
            
        </ScrollView>

    )
}// 네비 함수 생성후 버튼 클릭시 이동처리

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    inputContainer: {
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.light,
        alignItems: 'center',
        paddingHorizontal: 20,
    }

    
    
})//css

