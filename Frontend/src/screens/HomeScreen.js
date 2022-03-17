import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen(){

    return(
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    )
  } //홈 메인 화면단

  const styles = StyleSheet.create({

    container:{
        backgroundColor:'#ff00ff'
    }
  }) //css
  