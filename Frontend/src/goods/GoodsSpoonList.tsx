import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import {  StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from "../consts/colors";
import { NavigationHeader } from "../theme/NavigationHeader";




export default function GoodsSpoonList({route}:any){
    
 
    const navigation = useNavigation()
    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])
    const { seq } = route.params;
    
    
    return(
        <ScrollView>
            <NavigationHeader title="홈"
            Left={() => <Icon name="arrow-left-bold" size={30} onPress={goBack} />}
            Right={() => <Icon name="cart-heart" size={30} />} /><View>
                <View style={styles.inputContainer}>
                 <TextInput //검색바
                 style={{flex: 1, fontSize: 18}}
                 placeholder="검색"/>
                 
             </View>
                
                
                <Text >tmvms 입니다요
                
            
                </Text>
                <Text>{seq}</Text>
            </View>
            
            </ScrollView>
    )

}
const styles = StyleSheet.create({
    inputContainer: {
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: COLORS.light,
        alignItems: 'center',
        paddingHorizontal: 20,
    }

})