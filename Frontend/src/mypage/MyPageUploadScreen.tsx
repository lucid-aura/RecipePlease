import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MyPageUploadScreen(){

    return(
        <View style={styles.container}>
            <Text>Upload Screen</Text>
        </View>
    )
} //업로드 컴포넌트 이동

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}) //css