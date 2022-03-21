import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoodsHomeScreen from '../goods/GoodsHomeScreen';
import Payment from '../goods/payment/Payment';
import PaymentAddr from '../goods/payment/PaymentAddr';
import PaymentFailed from '../goods/payment/PaymentFailed';
import PaymentInfo from '../goods/payment/PaymentInfo';
import PaymentResult from '../goods/payment/PaymentResult';

/*
npm install react-native-gesture-handler
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-safe-area-context
npm install react-native-screens
npm install watcher
*/

const Stack = createNativeStackNavigator() //스택 네비게이터 생성후 스택함수 정의

export default function GoodsScreen(){

    return(
      <Stack.Navigator>
        <Stack.Screen name="Home" component={GoodsHomeScreen}></Stack.Screen>

        <Stack.Screen name="paymentInfo" component={PaymentInfo} options={{title: "결제정보"}} />
        <Stack.Screen name="payment" component={Payment} options={{title: "결제"}} />
        <Stack.Screen name="paymentResult" component={PaymentResult} options={{title: "결제완료"}} />
        <Stack.Screen name="paymentFailed" component={PaymentFailed} options={{title: "결제실패"}} />
        <Stack.Screen name="paymentAddr" component={PaymentAddr} options={{title: "주소변환"}} />

      </Stack.Navigator>
    )
  }
  //굿즈 컴포넌트 이동
