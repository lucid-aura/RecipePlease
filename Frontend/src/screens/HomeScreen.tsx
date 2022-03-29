import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationHeader } from '../theme';


export default function HomeScreen(){
    const navigation = useNavigation()
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    return(
      <View style={styles.container}>
        {/* 아이콘은 import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 이걸로!  */}
        <NavigationHeader title="홈" 
                Left= {() => <Icon name="text-account" size={30} onPress={drawerOpen} />}
                Right= {() => <Icon name="cart-heart" size={30} />}
                />
        <Text>Home</Text>
      </View>
    )
  } //홈 메인 화면단

  const styles = StyleSheet.create({

    container:{
        
        flex:1
    }
  }) //css
  