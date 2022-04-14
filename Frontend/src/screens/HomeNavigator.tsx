import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HomeScreen from "./HomeScreen";
import OnBoardScreen from './OnBoardScreen';

const Stack = createNativeStackNavigator()

export default function HomeNavigator() {


    return (
        <Stack.Navigator
            screenOptions={{headerShown:false}}
            initialRouteName={'BoardScreen'}
        >
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='BoardScreen' component={OnBoardScreen} />
            
        </Stack.Navigator>
    )
}