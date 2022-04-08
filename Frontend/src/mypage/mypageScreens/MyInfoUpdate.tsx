import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "react-native-paper";
import { color } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { NavigationHeader } from "../../theme";
import * as D from "../../store/drawer"
import { AppState } from "../../store";

export default function MyInfoUpdate() {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])
   
    const goCheck = useCallback(() => {
        dispatch(D.drawerChangeTrueAction)
    }, [])
    return (
        <SafeAreaView style={{flex:1}}>
             <View style={[styles.topBar]}> 
                <NavigationHeader title="내 정보" 
                Left= {() => <Icon name="arrow-left" size={30} onPress={goBack} />}
                Right= {() => <Icon name="cart-heart" size={30} />} />
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>아이디: </Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>닉네임: </Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>이름: </Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>성별: </Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>회원등급: </Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>이메일: </Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>전화번호: </Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>코인: </Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>이름: </Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>주소: </Text>
            </View>
            <View style={{flex:1,alignItems:'center', justifyContent:"center"}}>
                <TouchableOpacity style={{backgroundColor:Colors.amber600}} onPress={() => goCheck()} >
                    <Text style={{color:'white'}}>수정하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topBar: {
        borderWidth: 0.5,
    },
    contentView: {
        padding:20,
        borderBottomWidth:0.5,
        borderBottomColor:Colors.grey500
    }
})