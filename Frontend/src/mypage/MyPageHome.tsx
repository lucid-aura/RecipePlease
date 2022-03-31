import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text,StyleSheet, Button, TextInput, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationHeader } from "../theme";
import { getProfile, signOutWithKakao } from '../mypage/utils';
import { useDispatch, useSelector } from "react-redux";
import * as L from '../store/login'
import { AppState } from "../store";
import { KakaoOAuthToken, login } from "@react-native-seoul/kakao-login";

/* 
npm i react-native-paper
npm i color
npm i @types/color
npm i axios

*/

export default function MyPageHome(){
    
    const navigation = useNavigation()
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])

    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log
    console.log(loggedIn)
    const dispatch = useDispatch()
    let userInfo:string[]

    return(
        <View>
            <NavigationHeader title="홈" 
            Left= {() => <Icon name="text-account" size={30} onPress={drawerOpen} />}
            Right= {() => <Icon name="cart-heart" size={30} />} />
            <Text>로그인 되어 있음</Text>
            <View>
                <TouchableOpacity onPress={() => {
                    signOutWithKakao()
                    dispatch(L.logoutAction())
                    console.log(loggedIn)
                    navigation.navigate("Login")
                }}>
                    <Text>로그아웃</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('MyFavoriteRecipe')}>
                    <Text>즐겨찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MyInfo')}>
                    <Text>내 정보</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MyUploadedRecipe')}>
                    <Text>내가 쓴 레시피</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RecipeUpload')}>
                    <Text>레시피 업로드</Text>
            </TouchableOpacity>
        </View>
    )
    
   /* 
        <View>
            <Text>로그인 되었을 때</Text>
        </View>
     */
}  // 네비 함수 생성후 버튼 클릭시 이동처리

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
}) //css

