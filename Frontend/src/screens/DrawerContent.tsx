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


const DrawerContent: FC<DrawerContentComponentProps> = (props) => {
    
    const log = useSelector<AppState, L.State>((state) => state.login)
    const change = useSelector<AppState, D.State>((state) => state.drawer)
    const {loggedIn, loggedUser} = log
    const {drawerChange} = change   // true면 setting, false면 shopping cart
    console.log("DrawerContent: " + drawerChange + " loggedIn: " + loggedIn)
    
    if(!drawerChange) {
        return(
            <SafeAreaView>
                <View>
                    <Text>장바구니</Text>
                </View>
                
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