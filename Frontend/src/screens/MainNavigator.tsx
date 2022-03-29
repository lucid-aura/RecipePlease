import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import DrawerContent from "./DrawerContent";
import MyNavigator from "./MyNavigator";
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator()

export default function MainNavigator() {
    
    return(
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props}/>} initialRouteName={'HomeScreen'} screenOptions={{headerShown:false}}>
            <Drawer.Screen name="TabNavigator" component={TabNavigator}/>
            
        </Drawer.Navigator>
    )
}