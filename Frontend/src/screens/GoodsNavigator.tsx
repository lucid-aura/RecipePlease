import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoodsHomeScreen from '../goods/GoodsHomeScreen';
<<<<<<< HEAD:Frontend/src/screens/GoodsScreen.tsx
import GoodsPayScreen from '../goods/GoodsPayScreen';
=======
import Payment from '../goods/payment/Payment';
import PaymentAddr from '../goods/payment/PaymentAddr';
import PaymentFailed from '../goods/payment/PaymentFailed';
import PaymentInfo from '../goods/payment/PaymentInfo';
import PaymentResult from '../goods/payment/PaymentResult';
import CoinUseList from '../goods/payment/test/CoinUseList';
import PurchaseList from '../goods/payment/test/PurchaseList';
import PurchaseRecipe from '../goods/payment/test/PurchaseRecipe';
import TestPage from '../goods/payment/test/TestPage';
import UserPurchaseList from '../goods/payment/test/UserPurchaseList';
>>>>>>> main:Frontend/src/screens/GoodsNavigator.tsx

/*
npm install react-native-gesture-handler
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-safe-area-context
npm install react-native-screens
npm install watcher
*/

const Stack = createNativeStackNavigator() //스택 네비게이터 생성후 스택함수 정의

export default function GoodsNavigator(){

    return(
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={GoodsHomeScreen}></Stack.Screen>

<<<<<<< HEAD:Frontend/src/screens/GoodsScreen.tsx
        <Stack.Screen name="Pay" component={GoodsPayScreen}></Stack.Screen>
=======
        <Stack.Screen name="paymentInfo" component={PaymentInfo} options={{title: "결제정보"}} />
        <Stack.Screen name="payment" component={Payment} options={{title: "결제"}} />
        <Stack.Screen name="paymentResult" component={PaymentResult} options={{title: "결제완료"}} />
        <Stack.Screen name="paymentFailed" component={PaymentFailed} options={{title: "결제실패"}} />
        <Stack.Screen name="paymentAddr" component={PaymentAddr} options={{title: "주소찾기"}} />

        {/* test 디렉터리 내부 컴포넌트 이동 */}
        <Stack.Screen name="testPage" component={TestPage} options={{title: "테스트 페이지"}} />
        <Stack.Screen name="userPurchaseList" component={UserPurchaseList} options={{title: "구매이력"}} />
        <Stack.Screen name="purchaseList" component={PurchaseList} options={{title: "상품 구매 이력"}} />
        <Stack.Screen name="coinUseList" component={CoinUseList} options={{title: "코인 충전/사용 이력"}} />
        <Stack.Screen name="purchaseRecipe" component={PurchaseRecipe} options={{title: "레시피 구매"}} />
>>>>>>> main:Frontend/src/screens/GoodsNavigator.tsx

      </Stack.Navigator>
    )
}
  //굿즈 컴포넌트 이동
