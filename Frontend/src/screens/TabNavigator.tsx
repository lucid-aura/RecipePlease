import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DrawerActions, NavigationContainer, ParamListBase, RouteProp, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons' 
import { useDispatch } from "react-redux";
import GoodsNavigator from "./GoodsNavigator";
import HomeNavigator from "./HomeNavigator";
import MyNavigator from "./MyNavigator";
import RecipeNavigator from "./RecipeNavigator";

type TabBarIconProps = {focused: boolean; color:string; size: number}

const icons: Record<string, string[]> = {
    HomeNavigator: ['home-circle', 'home-circle-outline'],
    RecipeNavigator: ['stove', 'stove' ],
    GoodsNavigator: ['chef-hat', 'chef-hat'],
    MyNavigator: ['account-circle', 'account-circle']
}

const screenOption = ({route}: {route: RouteProp<ParamListBase, string>}) => {
    return {
        headerShown: false,
        tabBarIcon: ({focused, color, size}: TabBarIconProps) => {
            const {name} = route
            const focusedSize = focused ? size +6 : size
            const focusedColor = focused ? Colors.lightBlue500: color
            const [icon, iconOutline] = icons[name]
            const iconName = focused ? icon : iconOutline
            return <Icon name={iconName} size={focusedSize} color={focusedColor} />
        }
    }
}

const Tab = createBottomTabNavigator()


export default function TabNavigator() {
 /*    const dispatch = useDispatch()
    const navigation = useNavigation()
    const DrawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, []) */

    return (
        <Tab.Navigator screenOptions={screenOption}>
            <Tab.Screen name="HomeNavigator" component={HomeNavigator} options={{tabBarLabel: '홈'}} />
            <Tab.Screen name="RecipeNavigator" component={RecipeNavigator} options={{tabBarLabel: '레시피'}} />
            <Tab.Screen name="GoodsNavigator" component={GoodsNavigator} options={{tabBarLabel: '굿즈'}} />
            <Tab.Screen name="MyNavigator" component={MyNavigator} options={{tabBarLabel: 'MY'}} />
            
        </Tab.Navigator>
    )
}