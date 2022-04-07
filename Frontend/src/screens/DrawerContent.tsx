import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { FC, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationHeader } from "../theme";


const DrawerContent: FC<DrawerContentComponentProps> = (props) => {
    const {navigation} = props
    const Drawerclose = useCallback(() => navigation.dispatch(DrawerActions.closeDrawer()), [])
    return (

        <DrawerContentScrollView {...props} contentContainerStyle={[styles.view]}>
            <NavigationHeader viewStyle={{backgroundColor:'white'}} 
                    Left= {() => (<Icon name="arrow-left" size={50} onPress={Drawerclose}/>)}
                    Right={() => (<Icon name="close" size={24} onPress={Drawerclose} />)} />
            <Text>DrawerContent</Text>
        </DrawerContentScrollView>

    )
}

export default DrawerContent
const styles = StyleSheet.create({
    view: {flex:1},
    text: {fontSize:20},
    content: {flex:1, alignItems:'center', justifyContent:'center'}
})
