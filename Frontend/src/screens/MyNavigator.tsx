import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MyPageHomeScreen from '../mypage/MyPageHomeScreen';
import RecipeUpload from '../mypage/mypageScreens/RecipeUpload';
import MyAccount from '../mypage/mypageScreens/MyAccount';
import MyUploadedRecipe from '../mypage/mypageScreens/MyUploadedRecipe';
import MyFavoriteRecipe from '../mypage/mypageScreens/MyFavoriteRecipe';
import MyInfo from '../mypage/mypageScreens/MyInfo';

/*
npm install react-native-gesture-handler
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-safe-area-context
npm install react-native-screens
npm install watcher
npm i color
npm i @types/color
npm i axios
*/

const Stack = createNativeStackNavigator() //스택 네비게이터 생성후 스택함수 정의


export default function MyNavigator(){


  return(

    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="MyPage" component={MyPageHomeScreen}></Stack.Screen>

      <Stack.Screen name="MyAccount" component={MyAccount}></Stack.Screen>

      <Stack.Screen name="RecipeUpload" component={RecipeUpload}></Stack.Screen>

      <Stack.Screen name="MyUploadedRecipe" component={MyUploadedRecipe}></Stack.Screen>

      <Stack.Screen name="MyFavoriteRecipe" component={MyFavoriteRecipe}></Stack.Screen>

      <Stack.Screen name="MyInfo" component={MyInfo}></Stack.Screen>

    </Stack.Navigator>
    
  )
  
}

//마이 컴포넌트 이동