import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import HomeScreen from "./HomeScreen";
import OnBoardScreen from './OnBoardScreen';

const Stack = createNativeStackNavigator()

export default function HomeNavigator() {

    return (
        <Stack.Navigator
            initialRouteName="BoardScreen"
            screenOptions={{headerShown:false}}>
            
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
        </Stack.Navigator>
    )
}