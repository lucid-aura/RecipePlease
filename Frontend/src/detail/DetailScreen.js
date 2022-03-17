import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DetailScreen(){

    return(
        <View style={styles.container}>
            <Text>Detail Screen</Text>
        </View>
    )
} //디테일 화면단(*검색결과)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}) //css