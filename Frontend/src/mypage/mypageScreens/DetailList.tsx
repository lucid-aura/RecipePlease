import React, { useState } from "react"
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { Text, TextInput } from "react-native-paper"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { white } from "react-native-paper/lib/typescript/styles/colors";



const DetailList = (props: any) => {
    const [contentImglist, setContentimglist] = useState()

    const contentimgshow1 = () => {
        launchImageLibrary({}, response => {
            console.log(response)
            setContentimglist(response.assets[0].uri)
        })
    }
    return (
        <View style={styles.contentpictureframe}>
            <TouchableOpacity onPress={contentimgshow1} style={styles.contentcameraframe}>
                <Image
                    style={styles.contentcamera}
                    source={{ uri: contentImglist }}
                >
                </Image>
            </TouchableOpacity>
            <TextInput style={styles.photoContentText}></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    contentpictureframe: {
        width: '100%',
        height: 160,
        flexDirection: 'row'
    },
    contentcameraframe: {
        width: 120,
        height: 120,
        backgroundColor: 'white',
        marginTop: 20,
        marginLeft: 20,
        flex: 1

    },
    contentcamera: {
        width: 120,
        height: 120,
        backgroundColor: 'white'
    },

    photoContentText: {
        flex: 4,
        width: 100,
        height: 120
    }
})

export default DetailList