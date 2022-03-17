import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LoginScreen(){

    return(
        <View style={styles.container}>
            <Text>Login Screen</Text>
        </View>
    )
} //로그인 컴포넌트

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}) //css