import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer"
import { DrawerActions } from "@react-navigation/native"
import React, { FC, useCallback } from "react"
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from "react-redux"
import { signOutWithKakao } from "../utils"
import * as L from '../../store/login'
import { AppState } from "../../store"

const DrawerSettingLogin: FC<DrawerContentComponentProps> = (props) => {
    
    const {navigation} = props
    const Drawerclose = useCallback(() => navigation.dispatch(DrawerActions.closeDrawer()), [])
    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log
    const dispatch = useDispatch()
    const goMyFavoriteRecipe = () => {
        props.navigation.navigate("MyFavoriteRecipe")
    }
    
    const goMyInfo = () => {
        props.navigation.navigate("MyInfo")
    }
    const goMyUploadedRecipe =() => {
        props.navigation.navigate("MyUploadedRecipe")
    }
    const goHome = () => {
        props.navigation.navigate("HomeScreen")
    }
    const goRecipe = () => {
        props.navigation.navigate("RecipeHome")
    }
    const goGoods = () => {
        props.navigation.navigate("Home")
    }
    const goMyPage= () => {
        props.navigation.navigate("MyPage")
    }
    const goLogin = () => {
        props.navigation.navigate("Login")
        Drawerclose()
    }

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={[styles.container]}>
            <View style={[styles.myInfo]}>
                <View style={[styles.myInfoLeftView]}>
                    <Image 
                        source={require("./foodPicture.jpg")} 
                        style={[styles.myImage]}
                    />
                </View>
                <View style={{margin:5, marginTop:15}}>
                    <Text style={{marginBottom:3}}>닉네임</Text>
                    <Text>이메일 주소</Text>
                </View>
            </View>

        
            <TouchableOpacity style={[styles.myFavoriteBtn]} onPress={() => goMyFavoriteRecipe()}>
                <Icon name="hand-heart-outline" size={40} style={{color:Colors.grey500}} />
                <Text style={{fontSize:20, marginTop:5,marginLeft:10}}>내가 좋아하는 레시피</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.myInfoBtn]} onPress={() => goMyInfo()}>
                <Icon name="hand-heart-outline" size={40} style={{color:Colors.grey500}} />
                <Text style={{fontSize:20, marginTop:5,marginLeft:10}}>내 정보</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.myInfoBtn]} onPress={() => goMyUploadedRecipe()} >
                <Icon name="hand-heart-outline" size={40} style={{color:Colors.grey500}} />
                <Text style={{fontSize:20, marginTop:5,marginLeft:10}}>내가 쓴 레시피</Text>
            </TouchableOpacity>

            <View style={{borderWidth:1, marginTop:5, borderColor:Colors.grey500}}></View>

            <TouchableOpacity style={[styles.myInfoBtn]} onPress={() => goHome()}>
                <Icon name="home-circle-outline" size={40} style={{color:Colors.grey500}} />
                <Text style={{fontSize:20, marginTop:5,marginLeft:10}}>홈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.myInfoBtn]} onPress={() => goRecipe() }>
                <Icon name="stove" size={40} style={{color:Colors.grey500}} />
                <Text style={{fontSize:20, marginTop:5,marginLeft:10}}>레시피</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.myInfoBtn]} onPress={() => goGoods()}>
                <Icon name="chef-hat" size={40} style={{color:Colors.grey500}} />
                <Text style={{fontSize:20, marginTop:5,marginLeft:10}}>굿즈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.myInfoBtn]} onPress={() => goMyPage()}>
                <Icon name="account-circle" size={40} style={{color:Colors.grey500}} />
                <Text style={{fontSize:20, marginTop:5,marginLeft:10}}>MY</Text>
            </TouchableOpacity>

            <View style={{borderWidth:1, marginTop:5, borderColor:Colors.grey500,}}></View>
            <TouchableOpacity style={{ alignItems:'flex-end'}} onPress={() =>{
                signOutWithKakao()
                dispatch(L.logoutAction())
                Drawerclose()
                console.log(loggedIn)
            }} >
                <Icon name="logout" size={30} style={{color:Colors.grey500}}/>
            </TouchableOpacity>
                    
        </DrawerContentScrollView>
    )
}

export default DrawerSettingLogin

const styles = StyleSheet.create({
    container: {
        
    },
    myInfo: {
        flexDirection:'row',
        flex:1,
    },
    myInfoLeftView: {
        padding:10
    },
    myInfoRightView: {

    },
    myImage: {
        height:60, 
        width:60, 
        borderRadius:25,
        borderWidth:1
    },
    myFavoriteBtn: {
        flexDirection:'row', 
        marginTop:20, 
        borderBottomWidth:1,
        borderTopWidth:1,
        padding: 10
    },
    myInfoBtn: {
        flexDirection:'row', 
        borderBottomWidth:1,
        borderTopWidth:1,
        padding: 10
    }
    
    
})
