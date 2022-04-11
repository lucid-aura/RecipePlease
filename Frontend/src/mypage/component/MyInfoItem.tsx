import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { NavigationHeader } from "../../theme";
import * as L from "../../store/login"
import * as D from "../../store/drawer"

const MyInfoItem = ({loggedUser}:any) => {

    //console.log(`MyInfoItem ${loggedUser}`)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const goShoppingCart = () => {
        dispatch(D.drawerChangeFalseAction())
        navigation.dispatch(DrawerActions.openDrawer())
    }
    const goSetting = () => {
        dispatch(D.drawerChangeTrueAction())
        navigation.dispatch(DrawerActions.openDrawer())
    }
    const goMyInfoUpdate = () => {
        navigation.navigate("MyInfoUpdate")
    }
    

    return (
        <SafeAreaView style={{flex:1}}>
             <View style={[styles.topBar]}> 
                <NavigationHeader title="내 정보" 
                    Left= {() => <Icon name="text-account" size={30} onPress={goSetting} />}
                    Right= {() => <Icon name="cart-heart" size={30} onPress={goShoppingCart} />} 
                />
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>아이디: {loggedUser.memberId}</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>닉네임: {loggedUser.memberNickname}</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>이름: {loggedUser.memberName}</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>성별: {loggedUser.memberGender}</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>회원등급: {loggedUser.memberGrade}</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>이메일: {loggedUser.memberEmail}</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>전화번호: {loggedUser.memberPhone}</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>코인: {loggedUser.memberCoin}</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>주소: {loggedUser.memberMainAddr}</Text>
            </View>
            <View style={{flex:1,alignItems:'center', justifyContent:"center"}}>
                <TouchableOpacity style={{backgroundColor:Colors.amber600}} onPress={() => goMyInfoUpdate()}>
                    <Text style={{color:'white'}}>수정하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default MyInfoItem

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