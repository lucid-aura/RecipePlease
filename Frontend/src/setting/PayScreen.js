import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PayScreen(){

    return(
        <View style={styles.container}>
            <Text>Pay Screen</Text>
        </View>
    )
} //굿즈 페이지

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})//css