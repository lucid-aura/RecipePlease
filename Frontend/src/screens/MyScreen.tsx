import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../mypage/HomeScreen';
import LoginScreen from '../mypage/LoginScreen';
import UploadScreen from '../mypage/UploadScreen';

/*
npm install react-native-gesture-handler
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-safe-area-context
npm install react-native-screens
npm install watcher
*/

const Stack = createNativeStackNavigator() //스택 네비게이터 생성후 스택함수 정의


export default function MyScreen(){

    return(
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>

        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>

        <Stack.Screen name="Upload" component={UploadScreen}></Stack.Screen>

      </Stack.Navigator>
      
    )
  }

  //마이 컴포넌트 이동