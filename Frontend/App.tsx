import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import MainNavigator from './src/screens/MainNavigator';
import { makeStore } from './src/store';

/*
npm install @react-navigation/native
npm install @react-navigation/bottom-tabs
npm install react-native-safe-area-context
npm install react-native-screens
npm install react-native-vector-icons

*/

const store = makeStore()

export default function App() {

  return(
    <ReduxProvider store={store}> 
      <NavigationContainer>
          <MainNavigator />
      </NavigationContainer>
    </ReduxProvider>
  )
}