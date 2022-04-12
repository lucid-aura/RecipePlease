import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { black, white } from "react-native-paper/lib/typescript/styles/colors";
import Icon from 'react-native-vector-icons/Ionicons';


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

            <View style={styles.contentframe}>
                <TextInput style={styles.photoContentText}
                    value={contentText}
                    onChangeText={(contentText) => setContentText(contentText)}
                    onKeyPress={content}
                    multiline={true}
                    placeholder="레시피 순서를 차례대로 입력해주세요.&#10;+ 버튼을누르시면 순서창이 추가됩니다."
                    underlineColor="white">
                </TextInput>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentpictureframe: {
        // width: '100%',
        // height: 160,
        // flex: 1,
        // flexDirection: 'row'
        width: '100%',
        height: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#eee',
        borderBottomWidth: 0.5,
        padding: 5,


    },
    contentcameraframe: {
        // width: 120,
        // height: 120,
        // backgroundColor: 'white',
        // marginTop: 20,
        // marginLeft: 20,
        flexDirection: 'row',
        marginLeft: 10,

        backgroundColor: 'white'


    },

    contentcamera: {
        // width: 120,
        // height: 120,
        // backgroundColor: 'white',
        width: 120,
        height: 120,
        backgroundColor: 'white',
    },

    contentframe: {
        width: 500,
        height: 120,
        backgroundColor: "white",
        marginLeft: 20,
    },

    photoContentText: {
        // flex: 4,
        fontSize: 15,
        height: '100%',
        backgroundColor: 'white'
    },


})

export default DetailList