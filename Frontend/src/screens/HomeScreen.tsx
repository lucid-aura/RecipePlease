import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { default as Icons }from 'react-native-vector-icons/MaterialCommunityIcons';
import { getProfile } from '../mypage/utils';
import { NavigationHeader } from '../theme';
import { DebugInstructions } from 'react-native/Libraries/NewAppScreen';


export default function HomeScreen(){
    const navigation = useNavigation()
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    const move = useCallback(() => {navigation.navigate("RecipeDetail")}, [])
    return(
      <View style={styles.container}>
        {/* 아이콘은 import Icon from 'react-native-vector-icons/MaterialIcons'; 이걸로!  */}
        <NavigationHeader title="홈" 
                Left= {() => <Icons name="text-account" size={30} onPress={drawerOpen} />}
                Right= {() => <Icons name="cart-heart" size={30} />}
                />
        <Text onPress={getProfile}>Home</Text>
        <Text onPress={() => move()}>이동합니다</Text>
      </View>
    )
  } //홈 메인 화면단

  const styles = StyleSheet.create({
    container:{
        flex:1
    }
  }) //css
  