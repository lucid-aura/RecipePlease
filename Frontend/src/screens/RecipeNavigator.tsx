import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RecipeHomeScreen from '../recipe/RecipeHomeScreen';
import RecipeDetailScreen from '../recipe/RecipeDetailScreen';
import RecipeSearchResult from '../recipe/RecipeSearchResult';
import RecipeUpdate from '../recipe/RecipeUpdate';

/*
npm install react-native-gesture-handler
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-safe-area-context
npm install react-native-screens
npm install watcher
*/

const Stack = createNativeStackNavigator() //스택 네비게이터 생성후 스택함수 정의

export default function RecipeNavigator() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RecipeHome" component={RecipeHomeScreen}></Stack.Screen>

      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen}></Stack.Screen>
      <Stack.Screen name="RecipeSearchResult" component={RecipeSearchResult}></Stack.Screen>
      <Stack.Screen name="RecipeUpdate" component={RecipeUpdate}></Stack.Screen>
    </Stack.Navigator>
  )
}
//레시피 이동 처리