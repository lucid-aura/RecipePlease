import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import HomeScreen from "./HomeScreen";

const Stack = createNativeStackNavigator()

export default function HomeNavigator() {

    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{headerShown:false}}>
            
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            
        </Stack.Navigator>
    )
}