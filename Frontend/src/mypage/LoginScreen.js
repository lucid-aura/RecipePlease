import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LoginScreen(){

    return(
        <View style={styles.container}>
            <Text>Login Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})