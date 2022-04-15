import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer"
import { DrawerActions } from "@react-navigation/native"
import React, { FC, useCallback, useEffect } from "react"
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const DrawerSettingLogout: FC<DrawerContentComponentProps> = (props) => {
    
    const {navigation} = props
    const Drawerclose = useCallback(() => navigation.dispatch(DrawerActions.closeDrawer()), [])

    useEffect(() => {
        fetch
    }, [])

    const goMyFavoriteRecipe = useCallback(() => {
        props.navigation.navigate("MyFavoriteRecipe")
    },[])
    const goMyInfo = useCallback(() => {
        props.navigation.navigate("MyInfo")
    },[])
    const goMyUploadedRecipe = useCallback(() => {
        props.navigation.navigate("MyUploadedRecipe")
    },[])
    const goHome = useCallback(() => {
        props.navigation.navigate("HomeScreen")
    },[])
    const goRecipe = useCallback(() => {
        props.navigation.navigate("RecipeHome")
    },[])
    const goGoods = useCallback(() => {
        props.navigation.navigate("Home")
    },[])
    const goMyPage= useCallback(() => {
        props.navigation.navigate("MyPage")
    },[])
    const goLogin = useCallback(() => {
        props.navigation.navigate("Login")
        Drawerclose()
    },[])

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={[styles.container]}>
                    <SafeAreaView style={[styles.myInfo]}>
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
                    </SafeAreaView>
                
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

                    <View style={{borderWidth:1, marginTop:5, borderColor:Colors.grey500}}></View>
                    <TouchableOpacity style={{}} onPress={() =>{goLogin()}} >
                        <Icon name="logout" size={30} style={{color:Colors.grey500}}/>
                    </TouchableOpacity>
                </DrawerContentScrollView>
    )
}

export default DrawerSettingLogout

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
