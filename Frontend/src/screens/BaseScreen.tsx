import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../base/HomeScreen';
import RecipeScreen from '../base/RecipeScreen';

/*
npm install react-native-gesture-handler
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-safe-area-context
npm install react-native-screens
npm install watcher
*/

const Stack = createNativeStackNavigator() //스택 네비게이터 생성후 스택함수 정의

export default function BaseScreen(){

    return(
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>

        <Stack.Screen name="Recipe" component={RecipeScreen}></Stack.Screen>
      </Stack.Navigator>
    )
  }
//레시피 이동 처리