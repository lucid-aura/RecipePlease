import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text,StyleSheet,  TouchableOpacity, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationHeader } from "../theme";
import { signOutWithKakao } from '../mypage/utils';
import { useDispatch, useSelector } from "react-redux";
import * as L from '../store/login'
import { AppState } from "../store";

/* 
npm i react-native-paper
npm i color
npm i @types/color
npm i axios

*/

export default function MyPageHome(){
    console.log("MyPageHome")
    const navigation = useNavigation()
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    
    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log
    console.log("MyPageHome loggedIn: " + loggedIn + "MyPageHome loggedUser: " + JSON.stringify(loggedUser))
    const dispatch = useDispatch()

    return(
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.topBar]}> 
                <NavigationHeader title="홈" 
                Left= {() => <Icon name="text-account" size={30} onPress={drawerOpen} />}
                Right= {() => <Icon name="cart-heart" size={30} />} />
            </View>
            <View style={[styles.contentView]}>
                <Text>마이페이지</Text>
                <View style={[styles.contentBox]}>
                    <View >
                        <TouchableOpacity style={[styles.content]} onPress={() => {
                            signOutWithKakao()
                            dispatch(L.logoutAction())
                            console.log(loggedIn)
                            navigation.navigate("Login")
                        }}>
                            <Text>로그아웃</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={[styles.content]} onPress={() => navigation.navigate('MyFavoriteRecipe')}>
                                <Text>즐겨찾기</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={[styles.content]} onPress={() => navigation.navigate('MyInfo')}>
                                <Text>내 정보</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={[styles.content]} onPress={() => navigation.navigate('MyUploadedRecipe')}>
                                <Text>내가 쓴 레시피</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity style={[styles.content]} onPress={() => navigation.navigate('RecipeUpload')}>
                                <Text>레시피 업로드</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
    
   /* 
        <View>
            <Text>로그인 되었을 때</Text>
        </View>
     */
}  // 네비 함수 생성후 버튼 클릭시 이동처리

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topBar: {
        borderWidth: 0.5,
        borderRadius:1
    },
    contentView: {
        flex:17,
        justifyContent:'center',
        alignItems:'center'
    },
    contentBox: {
        justifyContent:'center',
        alignItems:'center'
    },
    content: {
        borderWidth:1,
        borderRadius:10,
        width:200,
        marginTop: 10,
        justifyContent:'center',
        alignItems:'center'
    }
}) //css

