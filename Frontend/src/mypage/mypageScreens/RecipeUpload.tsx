import axios from "axios";
import Color from "color";
import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView, Alert, Dimensions, Image, TouchableOpacity, ToastAndroid } from "react-native";
import { Button } from "react-native-paper";
import RNPickerSelect from 'react-native-picker-select'
import Icon from 'react-native-vector-icons/Ionicons'
import TagInput from 'react-native-tags-input';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from "@react-native-community/async-storage";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import DetailList from "./DetailList";

/* npm install @react-native-picker/picker */

export default function UploadScreen() {

    // 카테고리
    const [recipeBigCategory, setPickerSelect] = useState('')
    const [recipeSmallCategory, setPickerSelect2] = useState('')

    const [seq, setSeq] = useState()

    // 사진 url
    const [titleimgurl, setTitleimgurl] = useState("")

    // 사진 분류
    const [titleimg, setTitleimg] = useState("")
    const [contentimg1, setContentimg1] = useState("")
    const [contentimg2, setContentimg2] = useState("")
    const [contentimg3, setContentimg3] = useState("")
    const [contentimg4, setContentimg4] = useState("")

    // 제목, 내용, 가격
    const [recipeTitle, setTitle] = useState('')
    const [recipeContent, setContent] = useState('')
    const [recipePrice, setPrice] = useState('')
    const [RECIPERATING, setRating] = useState('')


    // 태그
    const [tags, setTags] = useState({
        tag: '',
        tagsArray: []
    });
    const [tagsColor, setTagsColor] = useState("")
    const [tagsText, setTagsText] = useState("")


    // 레시피 순서 추가

    const [countList, setCountList] = useState([0])
    const [list, setList] = useState([<DetailList />])

    const onAddDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)	// index 사용 X
        // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용	
        setCountList(countArr)
        list.push(<DetailList />)
        console.log("list : " + list[0])
    }

    // const addImage = () => {
    //     launchCamera({ saveToPhotos: true }, response => {
    //         setData(response.assets[0].uri)
    //     })
    // }

    const titleimgshow = () => {
        launchImageLibrary({}, response => {
            setTitleimgurl(response.assets[0].uri)
            setTitleimg("Thumbnail")
        })
    }



    const RecipeUploadBtn = () => {

        console.log("제목 : " + recipeTitle)
        console.log("내용 : " + recipeContent)
        console.log("대분류 : " + recipeBigCategory)
        console.log("소분류 : " + recipeSmallCategory)
        console.log("굿즈태그 : " + tags.tagsArray)
        console.log("레시피가격 : " + recipePrice)
        console.log("이미지 경로 : " + titleimgurl)


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
            console.log(titleimg);
            console.log(contentimg1);
            console.log(contentimg2);
            console.log(contentimg3);
            console.log(contentimg4);

            axios.get("http://192.168.0.14:3000/uploadRecipeImg",
                {
                    params: {
                        photoSeq: temp,
                        photoTitle: titleimg,
                        photoContent: contentimg1 + "/" + contentimg2 + "/" + contentimg3 + "/" + contentimg4,
                        photoUrl: titleimgurl
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
                            source={{ uri: titleimgurl }}
                            style={styles.camera}
                        ></Image>
                    </TouchableOpacity>
                </View>

                <View style={styles.recipeframe}>
                    <Text style={styles.recipytext}>레시피내용</Text>
                    <Button style={styles.addbutton} onPress={onAddDetailDiv}> 추가</Button>
                </View>
                <View style={styles.contentframe}>
                    <TextInput style={styles.textinput} value={recipeContent} onChangeText={(recipeContent) => setContent(recipeContent)} placeholder="1) 소고기는 기름기를 떼어내고 적당한 크기로 잘라주세요.&#10;2) 준비된 양념으로 먼저 고기를 조물조물 재워 둡니다.&#10;3) 그 사이 양파와 버섯, 대파도 썰어서 준비하세요.&#10;4) 고기가 반쯤 익어갈 때 양파를 함께 볶아요." multiline={true}></TextInput>
                </View>
                <View>
                    {list.map((item: any, i: any) => (
                        item

                    ))}
                </View>


                {/* <DetailList countList={countList} /> */}

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
    recipeframe: {
        width: '100%',
        height: 55,
        backgroundColor: "#ced4da",
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',

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
    recipytext: {
        fontWeight: "bold",
        marginLeft: 10,
        fontSize: 18,
        color: "black",
        flex: 1,
        marginTop: 15
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
    },

    addbutton: {
        flex: 1
    }
})