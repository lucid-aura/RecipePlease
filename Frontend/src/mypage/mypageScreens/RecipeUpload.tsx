import axios from "axios";
import Color from "color";
import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView, Alert, Dimensions, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import RNPickerSelect from 'react-native-picker-select'
import Icon from 'react-native-vector-icons/Ionicons'
import TagInput from 'react-native-tags-input';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from "@react-native-community/async-storage";
import { white } from "react-native-paper/lib/typescript/styles/colors";

/* npm install @react-native-picker/picker */

export default function UploadScreen() {

    // 카테고리
    const [recipeBigCategory, setPickerSelect] = useState('')
    const [recipeSmallCategory, setPickerSelect2] = useState('')

    const [seq, setSeq] = useState()
    const [recipeTitle, setTitle] = useState('')
    const [titleimg, setTitleimg] = useState("")
    const [contentimg1, setContentimg1] = useState("")
    const [contentimg2, setContentimg2] = useState("")
    const [contentimg3, setContentimg3] = useState("")
    const [contentimg4, setContentimg4] = useState("")

    const [recipeContent, setContent] = useState('')
    const [recipePrice, setPrice] = useState('')
    const [RECIPERATING, setRating] = useState('')

    const [tags, setTags] = useState({
        tag: '',
        tagsArray: []
    });


    const [tagsColor, setTagsColor] = useState("")
    const [tagsText, setTagsText] = useState("")

    // const addImage = () => {
    //     launchCamera({ saveToPhotos: true }, response => {
    //         setData(response.assets[0].uri)
    //     })
    // }

    const titleimgshow = () => {
        launchImageLibrary({}, response => {
            setTitleimg(response.assets[0].uri)
        })
    }

    const contentimgshow1 = () => {
        launchImageLibrary({}, response => {
            setContentimg1(response.assets[0].uri)
        })
    }

    const contentimgshow2 = () => {
        launchImageLibrary({}, response => {
            setContentimg2(response.assets[0].uri)
        })
    }


    const contentimgshow3 = () => {
        launchImageLibrary({}, response => {
            setContentimg3(response.assets[0].uri)
        })
    }

    const contentimgshow4 = () => {
        launchImageLibrary({}, response => {
            setContentimg4(response.assets[0].uri)
        })
    }

    const RecipeUploadBtn = () => {

        console.log("제목 : " + recipeTitle)
        console.log("내용 : " + recipeContent)
        console.log("대분류 : " + recipeBigCategory)
        console.log("소분류 : " + recipeSmallCategory)
        console.log("굿즈태그 : " + tags.tagsArray)
        console.log("레시피가격 : " + recipePrice)
        console.log("이미지 경로 : " + titleimg)


        const uploadRecipe = () => {

            axios.get("http://192.168.0.14:3000/uploadRecipe",
                {
                    params: {
                        recipeTitle: recipeTitle,
                        recipeContent: recipeContent,
                        recipeBigCategory: recipeBigCategory,
                        recipeSmallCategory: recipeSmallCategory,
                        recipeGoodsTag: String(tags.tagsArray),
                        recipePrice: recipePrice
                    }
                }).then(function (response) {
                    console.log("seq값 : " + response.data)

                    if (response.data != null && response.data != "") {
                        Alert.alert("레시피 추가되었습니다..")
                        setSeq(response.data)
                        uploadRecipeImg(response.data)
                    }

                }).catch(function () {
                    Alert.alert("레시피 추가되지 않았습니다.")
                })
        }

        const uploadRecipeImg = (temp: any) => {
            axios.get("http://192.168.0.14:3000/uploadRecipeImg",
                {
                    params: {
                        photoSeq: temp,
                        photoUrl: titleimg
                    }
                }).then(function (response) {
                    console.log(response.data)

                    if (response.data == "YES") {
                        Alert.alert("이미지 추가되었습니다..")
                    }
                }).catch(function () {
                    Alert.alert("이미지 추가되지 않았습니다.")
                })
        }

        uploadRecipe()

    }

    const values = [
        { label: '축산물', value: '축산물' },
        { label: '해산물', value: '해산물' },
    ]
    const values2 = [
        { label: '1인용', value: '1인용' },
        { label: '접대용', value: '접대용' },
        { label: '야식용', value: '야식용' }
    ]

    return (
        <View>
            <ScrollView style={styles.container}>
                <View style={styles.frame}>
                    <Text style={styles.text} >레시피제목</Text>
                </View>
                <View style={styles.titleframe}>
                    <TextInput style={styles.textinput} placeholder="예) 소고기 미역국 끓이기" value={recipeTitle} onChangeText={(recipeTitle) => setTitle(recipeTitle)}></TextInput>
                </View>

                <View style={styles.picture}>
                    <TouchableOpacity onPress={titleimgshow} style={styles.camera}>
                        <Image
                            source={{ uri: titleimg }}
                            style={styles.camera}
                        ></Image>
                    </TouchableOpacity>
                </View>

                <View style={styles.frame}>
                    <Text style={styles.text}>레시피내용</Text>
                </View>
                <View style={styles.contentframe}>
                    <TextInput style={styles.textinput} value={recipeContent} onChangeText={(recipeContent) => setContent(recipeContent)} placeholder="1) 소고기는 기름기를 떼어내고 적당한 크기로 잘라주세요.&#10;2) 준비된 양념으로 먼저 고기를 조물조물 재워 둡니다.&#10;3) 그 사이 양파와 버섯, 대파도 썰어서 준비하세요.&#10;4) 고기가 반쯤 익어갈 때 양파를 함께 볶아요." multiline={true}></TextInput>
                </View>
                <View style={styles.contentpictureframe}>
                    <TouchableOpacity onPress={contentimgshow1} style={styles.contentcameraframe} >
                        <Image
                            source={{ uri: contentimg1 }}
                            style={styles.contentcamera}
                        ></Image>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={contentimgshow2} style={styles.contentcameraframe} >
                        <Image
                            source={{ uri: contentimg2 }}
                            style={styles.contentcamera}
                        ></Image>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={contentimgshow3} style={styles.contentcameraframe}>
                        <Image
                            source={{ uri: contentimg3 }}
                            style={styles.contentcamera}
                        ></Image>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={contentimgshow4} style={styles.contentcameraframe}>
                        <Image
                            source={{ uri: contentimg4 }}
                            style={styles.contentcamera}
                        ></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.frame}>
                    <Text style={styles.text}>카테고리</Text>
                </View>
                <View style={styles.categoryframe}>
                    <View style={styles.picker}>
                        <RNPickerSelect onValueChange={(value) => setPickerSelect(value)}
                            items={values}
                            placeholder={{
                                label: '대분류'
                            }}
                        >
                        </RNPickerSelect>
                    </View>
                    <View style={styles.picker}>
                        <RNPickerSelect onValueChange={(value) => setPickerSelect2(value)}
                            items={values2}
                            placeholder={{
                                label: '소분류'
                            }}
                        >
                        </RNPickerSelect>
                    </View>
                </View>
                <View style={styles.frame}>
                    <Text style={styles.text}>굿즈태그</Text>
                </View>
                <View style={styles.goodsframe}>
                    <TagInput updateState={(tags: any) => { setTags(tags) }}
                        tags={tags}
                        placeholder="Tags..."
                        label='Press comma & space to add a tag'
                        labelStyle={{ color: '#fff' }}
                        leftElement={<Icon name='pricetag' color='blue' />}
                        leftElementContainerStyle={{ marginLeft: 3 }}
                        containerStyle={{ width: (Dimensions.get('window').width - 40) }}
                        inputContainerStyle={[styles.textInput, { backgroundColor: '#fff' }]}
                        inputStyle={{ color: '#fff' }}
                        onFocus={() => {
                            setTagsColor('#fff')
                            setTagsText('#3ca897')
                        }}
                        onBlur={() => {
                            setTagsColor('#fff')
                            setTagsText('#3ca897')
                        }}
                        autoCorrect={false}
                        tagStyle={styles.tag}
                        tagTextStyle={styles.tagText}
                        keysForTag={', '}

                    />
                </View>
                <View style={styles.frame}>
                    <Text style={styles.text}>레시피가격</Text>
                </View>
                <View style={styles.goodsframe}>
                    <TextInput style={styles.textinput} value={(recipePrice)} onChangeText={(recipePrice) => setPrice(recipePrice)} ></TextInput>
                </View>
                <View style={styles.frame}>
                    <Text style={styles.text}>별점?</Text>
                </View>
                <View style={styles.goodsframe}>
                    <TextInput style={styles.textinput} value={RECIPERATING} onChangeText={(RECIPERATING) => setRating(RECIPERATING)}></TextInput>
                </View>


                <Button style={styles.btn} onPress={RecipeUploadBtn}>레시피작성</Button>
            </ScrollView>

        </View>
    )
}

//css
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 752,
    },
    frame: {
        width: '100%',
        height: 55,
        backgroundColor: "#ced4da",
        justifyContent: 'center'
    },
    titleframe: {
        width: '100%',
        height: 70,
        justifyContent: 'center',
        backgroundColor: "white"
    },
    contentframe: {
        width: '100%',
        height: 250,
        backgroundColor: "white"
    },
    contentpictureframe: {
        width: '100%',
        height: 160,
        flex: 1,
        flexDirection: 'row'

    },
    categoryframe: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        backgroundColor: "white",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    goodsframe: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        backgroundColor: "white",
    },

    picture: {
        width: '100%',
        height: 350,
        backgroundColor: "#f8f9fa",
        alignItems: 'center',
        justifyContent: 'center'

    },
    text: {
        fontWeight: "bold",
        marginLeft: 10,
        fontSize: 18,
        color: "black",
    },
    textinput: {
        marginLeft: 10,
        fontSize: 15,

    },
    picker: {
        flex: 1,
        width: '50%',
    },
    btn: {
        marginTop: 20,
        marginVertical: 8
    },
    textInput: {
        height: 30,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: -35,
        borderRadius: 5,
        padding: 3,
    },
    tag: {
        backgroundColor: '#fff'
    },
    tagText: {
        color: '#3ca897'
    },

    camera: {
        width: '100%',
        height: '100%'
    },
    contentcameraframe: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        flex: 1
    },
    contentcamera: {
        width: 120,
        height: 120,
        backgroundColor: 'white',

    },

    picturtext: {
        fontWeight: "bold",
        marginLeft: 10,
        fontSize: 18,
        color: "black",
        textAlign: 'center'
    }
})