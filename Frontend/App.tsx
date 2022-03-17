import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

/*
npm install @react-navigation/native
npm install @react-navigation/bottom-tabs
npm install react-native-safe-area-context
npm install react-native-screens
npm install react-native-vector-icons

*/

import Icon from 'react-native-vector-icons/Ionicons' //버전별 확인후 아이콘 패키지 설치 재 요망
import RecipeHomeScreen from './src/screens/RecipeScreen'; //src->screens 하위 4개 네비게이션 바 생성 시작
import HomeScreen from './src/screens/HomeScreen';
import MyScreen from './src/screens/MyScreen';
import GoodsScreen from './src/screens/GoodsScreen'; //src->screens 하위 4개 네비게이션 바 생성 종료
import RecipeScreen from './src/screens/RecipeScreen';

const Tab = createBottomTabNavigator() // 탭 시 네비게이션 하단바 응답처리


export default function App(){

  return(
    
      <NavigationContainer> 
        <Tab.Navigator screenOptions={({route})=> ({tabBarIcon:({focused, color,size})=> {

          let iconName

          if(route.name === '홈'){
            iconName = focused ? 'home': 'home-outline'
          } else if(route.name === '분류'){
            iconName = focused ? 'podium': 'podium-outline'
          } else if(route.name === '굿즈'){
            iconName = focused ? 'basket': 'basket-outline'
          } else if(route.name === '마이'){
            iconName = focused ? 'settings': 'settings-outline'
          }

          return <Icon name={iconName} size={size} color={color}></Icon>

        },
        })}>

          <Tab.Screen name='홈' component={HomeScreen}></Tab.Screen>
          <Tab.Screen name='분류' component={RecipeScreen}></Tab.Screen>
          <Tab.Screen name='굿즈' component={GoodsScreen}></Tab.Screen>
          <Tab.Screen name='마이' component={MyScreen}></Tab.Screen>

        </Tab.Navigator>

      </NavigationContainer>
    // 네비 바 완성 이제 스크린 폴더 내 4개 이동탭 파일로 이동
  )
}