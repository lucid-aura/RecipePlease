import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { FC, useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationHeader } from "../theme";


const DrawerContent: FC<DrawerContentComponentProps> = (props) => {
    const {navigation} = props
    const Drawerclose = useCallback(() => navigation.dispatch(DrawerActions.closeDrawer()), [])
    const st = "sefklsf"
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={[styles.container]}>
            <View style={[styles.myInfo]}>
                <View style={[styles.myInfoLeftView]}>
                    <Image 
                        source={require("../mypage/component/foodPicture.jpg")} 
                        style={{height:60, width:60, borderRadius:25}}
                    />



                </View>
            </View>
        </DrawerContentScrollView>
    )
}

export default DrawerContent
const styles = StyleSheet.create({
    container: {
        flexDirection:'row'
    },
    myInfo: {
        borderBottomWidth:1
    },
    myInfoLeftView: {
        padding:5
    }
    
    
})
