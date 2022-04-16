import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import React, { FC, useCallback } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import * as L from '../store/login'
import {  signOutWithKakao } from "../mypage/utils";
import * as D from "../store/drawer"
import DrawerSettingLogout from "../mypage/component/DrawerSettingLogout";
import DrawerSettingLogin from "../mypage/component/DrawerSettingLogIn";
import DrawerCart from "../mypage/component/DrawerCart";
import AsyncStorage from "@react-native-async-storage/async-storage";


const DrawerContent: FC<DrawerContentComponentProps> = (props) => {
    
    const log = useSelector<AppState, L.State>((state) => state.login)
    const change = useSelector<AppState, D.State>((state) => state.drawer)
    const {loggedIn, loggedUser} = log
    const {drawerChange} = change   // true면 setting, false면 shopping cart
    console.log("DrawerContent: " + drawerChange + " loggedIn: " + loggedIn)
    
    const getCartData = async() => {
        let cartData = await AsyncStorage.getItem('cartData');
        let cart=""
        if (cartData !== null) {
            console.log("1 " + JSON.parse(cartData as never))
            console.log("2 " + cartData as never)
            cart = JSON.stringify(JSON.parse(cartData as never))
        }
        return cart
    }

    if(!drawerChange) {
        let cart = getCartData()
        
        
        return(
            <SafeAreaView style={{ flex:1, alignItems: 'center',  justifyContent:'center'}}>
                <DrawerCart cartData={cart}/>
            </SafeAreaView>
        )
    } else {
        if(!loggedIn){
            return (
                <DrawerSettingLogout {...props} />
            )
        } else {
            return (
                <DrawerSettingLogin {...props} />
            )
        }
    }
}

export default DrawerContent
