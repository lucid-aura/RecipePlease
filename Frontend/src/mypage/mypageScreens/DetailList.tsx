import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { white } from "react-native-paper/lib/typescript/styles/colors";



const DetailList = (props: any) => {
    const [contentImglist, setContentimglist] = useState("")
    const [contentText, setContentText] = useState("")
    const [imgdata, setImgdata] = useState(props.setData3)

    const contentimgshow1 = () => {
        launchImageLibrary({}, response => {
            setContentimglist(response.assets[0].uri)
            let a = props.setData3;
            let b = props.setData4;
            console.log("a : " + JSON.stringify(a))
            console.log("b : " + b)

            // a.push({ imglist: response.assets[0].uri })
            a[b].imglist = response.assets[0].uri
            a[b].imgText = contentText
            console.log("imglist:" + a[b].imglist)
            console.log("imgText:" + a[b].imgText)
            props.setData2(a)

            console.log("bbbb: " + b)
            //props.setData(contentImglist, setContentimglist)
            console.log("DetailList : " + contentImglist)
        })
    }

    const content = () => {
        let a = props.setData3;
        let b = props.setData4;
        console.log("a : " + JSON.stringify(a))
        console.log("b : " + b)

        a[b].imgText = contentText

        console.log("imgText:" + a[b].imgText)
        props.setData2(a)
    }

    useEffect(() => {
        const test = () => {
            JSON.stringify(imgdata)
        }
        test()
    }, [])


    return (
        <View style={styles.contentpictureframe}>
            <TouchableOpacity onPress={contentimgshow1} style={styles.contentcameraframe}>
                <Image
                    style={styles.contentcamera}
                    source={{ uri: contentImglist }}
                >
                </Image>
            </TouchableOpacity>
            <TextInput style={styles.photoContentText}
                value={contentText}
                onChangeText={(contentText) => setContentText(contentText)}
                onKeyPress={content}
            >
            </TextInput>
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