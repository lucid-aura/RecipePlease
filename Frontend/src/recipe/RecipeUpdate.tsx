import axios from "axios";
import Color from "color";
import React, { Component, useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView, Alert, Dimensions, Image, TouchableOpacity, ToastAndroid, Platform } from "react-native";
import { Button } from "react-native-paper";
import RNPickerSelect from 'react-native-picker-select'
import Icon from 'react-native-vector-icons/Ionicons'
import TagInput from 'react-native-tags-input';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as L from '../store/login'
import { AppState } from "../store";
import { black, white } from "react-native-paper/lib/typescript/styles/colors";
import DetailList from "../mypage/mypageScreens/DetailList";
import { useSelector } from "react-redux";
import config from "../project.config"
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// yarn add react-native-image-picker

export default function RecipeUpdate({route}:any) {
    const { recipeSeq } = route.params
    const [photoSeq, setPhotoSeq] = useState([])
    const [thumbnailSeq, setThumbnailSeq] = useState([])
    
    const [thumbnailAssets, setThumnailAssets] = useState(
        {
            // "assets": 
            // [
            //     {"fileName": "", 
            //     "fileSize": 0, 
            //     "height": 0, 
            //     "type": "", 
            //     "uri": "", 
            //     "width": 0}
            // ]
        }
    )

    const navigation = useNavigation()
    // 멤버아이디
    const log = useSelector<AppState, L.State>((state) => state.login)
    const { loggedIn, loggedUser } = log

    // 카테고리
    const [recipeBigCategory, setPickerSelect] = useState('')
    const [recipeSmallCategory, setPickerSelect2] = useState('')
    const [recipeInformation, setPickerSelect3] = useState('')

    const [seq, setSeq] = useState({})

    // 사진 url
    const [titleimgurl, setTitleimgurl] = useState("/")

    // 유튜브 주소
    const [youtubeurl, setYoutubeurl] = useState('/')

    // 제목, 내용, 가격
    const [recipeTitle, setTitle] = useState('')
    const [recipeContent, setContent] = useState('')
    const [recipePrice, setPrice] = useState('')

    // 태그
    const [tags, setTags] = useState({
        tag: '',
        tagsArray: []
    });
    const [tagsColor, setTagsColor] = useState("")
    const [tagsText, setTagsText] = useState("")

    // 레시피 내용 순서 추가
    const [tests, setTests] = useState([
        {
            imgAssets: {},
            imglist: "",
            imgText: ""
        }
    ])

    const [countList, setCountList] = useState([0])
    const [imglist, setImglist] = useState("")
    const [imgText, setImgText] = useState("")

    const [list, setList] = useState([<DetailList setData={setImglist} setData2={setTests} setData3={tests} setData4={0} setData5={setImgText} />])

    const onAddDetailDiv = () => {
        let countArr = [...countList]
        let counter = countArr.slice(-1)[0]
        counter += 1
        countArr.push(counter)
        setCountList(countArr)
        let num = list
        console.log("tests: " + JSON.stringify(tests[counter - 1]))
        tests.push({ imgAssets: "", imglist: "/", imgText: "" })
        num.push(<DetailList setData={setImglist} setData2={setTests} setData3={tests} setData4={counter} setData5={setImgText} />)
        setList(num)

    }

    
    useEffect(() => {
        const init = () => {
            console.log("getPostedRecipeData")
            axios.get(config.address + "getPostedRecipeData?recipeSeq=" + recipeSeq)
            .then((recipeRes) =>{
                console.log(recipeRes.data)
                setTitle(recipeRes.data.recipeData.recipeTitle)
                setTitleimgurl(config.photo + recipeRes.data.recipeData.recipeThumbnail)

                setContent(recipeRes.data.recipeData.recipeContent)
                setPickerSelect(recipeRes.data.recipeData.recipeBigCategory)
                setPickerSelect2(recipeRes.data.recipeData.recipeSmallCategory)
                setPickerSelect3(recipeRes.data.recipeData.recipeCapacity)
                setYoutubeurl(recipeRes.data.recipeData.recipeVideoUrl)
                setTags({tag:"", tagsArray:recipeRes.data.recipeData.recipeGoodsTag.split(",")})
                setPrice(String(recipeRes.data.recipeData.recipePrice))
                setTests([])
                setList([])

                let recipeOrderPhotos:any = []
                let oneOrderPhoto:any = []
                recipeRes.data.photoData.forEach((element:any) => {

                    if (element.photoTitle == "cookOrder"){
                        photoSeq.push(element.photoSeq as never)
                        oneOrderPhoto.push({ imgAssets: {}, imglist: element.photoUrl, imgText: element.photoContent })
                        console.log("결과는")
                        console.log(oneOrderPhoto)
                    }
                    else {
                        setThumbnailSeq(element.photoSeq)
                    }
                });
                setTests(oneOrderPhoto)
                oneOrderPhoto.forEach(async (element:any, index:number) => {
                    await recipeOrderPhotos.push(<DetailList setData={setImglist} setData2={setTests} setData3={oneOrderPhoto} setData4={index} setData5={setImgText} />)
                })
                setList(recipeOrderPhotos)
            })
            .catch((err) => {
                console.log(err)
            })
        return () => {

            return (<View></View>)
            // 포커스가 벗어날 때 처리 추가
        };
    }
    init()
    }, []);

    // 썸네일 이미지 등록
    const titleimgshow = () => {
        launchImageLibrary({} as never, response => {
            setTitleimgurl(response.assets[0].uri)
            setThumnailAssets(response)
            console.log(response)
        })
    }

    // 이미지 서버 저장
    const updateImageToServer = (assets: any, category:string, idx:number) => {
        console.log("assets!!: " + assets)
        const createFormData = (body: any = {}) => {
            const data = new FormData();

            // 사진 추가
            data.append('photo',
                assets
            );

            // 파일 이름 추가
            Object.keys(body).forEach((key) => {
                data.append(key, body[key]);
            });

            return data;
        };

        const handleUploadPhoto = async () => {
            console.log("handleUploadPhoto")
            await fetch(config.address + 'imageUpdateToServer', {
                method: 'POST',
                body: createFormData({ fileName: assets.fileName }),
            })
            .then((response) => {
                if (category == 'thumbnail'){
                    axios.post(config.address + "updateRecipeThumbnailImage", null,
                    {
                        params: {
                            photoSeq: thumbnailSeq,
                            docsSeq: recipeSeq,
                            photoTitle: "thumbnail",
                            photoContent: recipeTitle,
                            photoUrl: thumbnailAssets.assets[0].fileName
                        }
                    }).then(function (res) {
                        axios.post(config.address + "updateRecipeThumbnailUrl", null, {
                            params: {
                                recipeSeq:recipeSeq,
                                recipeThumbnail: thumbnailAssets.assets[0].fileName,
                            }
                        })
                    }).catch(function (err) {
                        console.log(err)
                    })
                }
                else {
                    axios.post(config.address + "updateRecipeOrderImage", null,
                    {
                        params: {
                            photoSeq:photoSeq[idx],
                            docsSeq: recipeSeq,
                            photoTitle: "cookOrder",
                            photoContent: tests[idx].imgText,
                            photoUrl: tests[idx].imgAssets.fileName,
    
                        }
    
                    }).then(function (res) {
    
                    }).catch(function (err) {
                        console.log(err)
                    })
                }

            })
            .catch((error) => {
                console.log('error', error);
            });
        }
        handleUploadPhoto()
    }


    // 업로드 버튼
    const RecipeUpdateBtn = async () => {
        console.log("RecipeUpdateBtn")
        console.log(thumbnailAssets)
        
        // 썸네일 사진이 우선 변경되야 함 -> 썸네일 갱신 시도 시 레시피 썸네일 열 비교 후 업로드 하기 때문에
        console.log("길이는 : " + Object.keys(thumbnailAssets).length)
        if (Object.keys(thumbnailAssets).length){ // 썸네일 사진이 변경되었을 경우
            await updateImageToServer(thumbnailAssets.assets[0], "thumbnail", -1)
        }
        else { // 제목만 수정되었을 경우
            axios.post(config.address + "updatePhotoThumbnailContent", null,
            {
                params: {
                    docsSeq: recipeSeq,
                    photoTitle: "thumbnail",
                    photoContent: recipeTitle
                }
            }).then(function (res) {
                
            }).catch(function (err) {
                console.log(err)
            })
        }

        // 레시피 업데이트
        console.log("updateRecipe")
        await axios.post(config.address + "updateRecipe", null, {
            params: {
                recipeSeq:recipeSeq,
                memberId: loggedUser.memberId,
                recipeTitle: recipeTitle,
                recipeContent: recipeContent,
                recipeBigCategory: recipeBigCategory,
                recipeSmallCategory: recipeSmallCategory,
                recipeVideoUrl: youtubeurl,
                recipeGoodsTag: String(tags.tagsArray),
                recipePrice: recipePrice,
                recipeCapacity: recipeInformation,
            }
        })

        for (let i = 0; i < tests.length; i++) {
            if (Object.keys(tests[i].imgAssets).length){ // 조리법 이미지가 수정되었을 경우
                await updateImageToServer(tests[i].imgAssets, "cookOrder", i)
                console.log("updateRecipeOrderImage")
               
            }
            else { // 조리법 내용만 수정되었을 경우
                console.log("updateRecipeOrderContent")
                axios.post(config.address + "updateRecipeOrderContent", null,
                {
                    params: {
                        photoSeq:photoSeq[i],
                        photoContent: tests[i].imgText,
                    }

                }).then(function (res) {

                }).catch(function (err) {
                    console.log(err)
                })
            }
        }
        navigation.navigate('RecipeDetail' as never,{
            seq: recipeSeq,
            category: 'recipe',
        } as never)

    }

    const values = [
        { label: '축산물', value: 'livestock' },
        { label: '해산물', value: 'seafood' },
    ]
    const values2 = [
        { label: '1인용', value: 'personal' },
        { label: '접대용', value: 'entertain' },
        { label: '야식용', value: 'nightmeal' }
    ]
    const values3 = [
        { label: "1인분", value: 1 },
        { label: "2인분", value: 2 },
        { label: "3인분", value: 3 },
        { label: "4인분", value: 4 },
        { label: "5인분", value: 5 },
        { label: "6인분", value: 6 },
        { label: "7인분", value: 7 },
        { label: "8인분", value: 8 },
        { label: "9인분", value: 9 }
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
                    <TouchableOpacity onPress={titleimgshow} style={styles.camera1}>
                        <Icon name='camera-outline' style={styles.camerabutton} size={100}></Icon>
                        <TextInput style={styles.cameraText1}>요리 대표 사진을 등록해 주세요.</TextInput>
                        <TextInput>음식사진 외 사람/동물 등의 사진은 삼가해 주세요.</TextInput>
                        <Image
                            source={{ uri: titleimgurl }}
                            style={styles.camera2}
                        ></Image>
                    </TouchableOpacity>

                </View>

                <View style={styles.recipeframe}>
                    <Text style={styles.recipytext}>레시피 소개 및 순서</Text>
                    <TouchableOpacity onPress={onAddDetailDiv}>
                        <Icon name='add-circle' color="black" style={styles.addbutton} size={35}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentframe}>
                    <TextInput style={styles.textinput} value={recipeContent} onChangeText={(recipeContent) => setContent(recipeContent)} placeholder="&#10;이 레시피를 소개하는 내용을 적어주세요.&#10;예) 남편의 생일을 맞아 소고기 미역국을 끓여봤어요.&#10;어머니로부터 배운 미역국 레시피를 남편의 입맛에 맞게 고안했습니다." multiline={true}></TextInput>
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
                            value={recipeBigCategory}
                            items={values}
                            placeholder={{
                                label: '대분류'
                            }}
                        >
                        </RNPickerSelect>
                    </View>
                    <View style={styles.picker}>
                        <RNPickerSelect onValueChange={(value) => setPickerSelect2(value)}
                            value={recipeSmallCategory}
                            items={values2}
                            placeholder={{
                                label: '소분류'
                            }}
                        >
                        </RNPickerSelect>
                    </View>
                </View>

                <View style={styles.frame}>
                    <Text style={styles.text}>요리정보(몇 인분)</Text>
                </View>
                <View style={styles.categoryframe}>
                    <View style={styles.picker}>
                        <RNPickerSelect onValueChange={(value) => setPickerSelect3(value)}
                            value={recipeInformation}
                            items={values3}
                            placeholder={{
                                label: '선택'
                            }}
                        >
                        </RNPickerSelect>
                    </View>
                </View>

                <View style={styles.frame}>
                    <Text style={styles.text}>유튜브 영상 주소</Text>
                </View>
                <View style={styles.youtubeFrame}>
                    <Text style={styles.tagText2}>작성하신 레시피의 조리 영상이 있다면 유튜브 주소를 남겨주세요.</Text>
                </View>
                <View style={styles.priceframe}>
                    <TextInput style={styles.textinput} value={(youtubeurl)} onChangeText={(youtubeurl) => setYoutubeurl(youtubeurl)} placeholder="https://www.youtube.com/"></TextInput>
                </View>

                <View style={styles.frame}>
                    <Text style={styles.text}>굿즈태그</Text>
                </View>
                <View style={styles.tagFrame}>
                    <Text style={styles.tagText2}>재료, 목적, 효능, 대상 등을 입력 후 완료키를 눌러서 태그로 남겨주세요.{"\n"}예) 돼지고기, 다이어트, 비만, 칼슘, 감기예방, 이유식, 초간단</Text>
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
                        inputStyle={{ color: 'black' }}
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
                    <Text style={styles.text}>레시피가격(₩)</Text>
                </View>
                <View style={styles.priceframe}>
                    <TextInput style={styles.textinput} value={(recipePrice)} onChangeText={(recipePrice) => setPrice(recipePrice)} keyboardType="number-pad" placeholder="예) 1000, 5000 숫자를 입력 원단위" ></TextInput>
                </View>
                <Button style={styles.btn} onPress={RecipeUpdateBtn}>레시피변경</Button>
            </ScrollView>

        </View>
    )
}

//css
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    recipeframe: {
        width: '100%',
        height: 55,
        backgroundColor: "#ced4da",

        flex: 1,
        flexDirection: 'row',

    },
    frame: {
        width: '100%',
        height: 55,
        backgroundColor: "#ced4da",
        justifyContent: 'center',
    },
    titleframe: {
        width: '100%',
        height: 70,
        justifyContent: 'center',
        backgroundColor: "white"
    },
    contentframe: {
        width: '100%',
        height: 140,
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
    priceframe: {
        width: '100%',
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
        marginLeft: 15,
        fontSize: 18,
        color: "black",

    },
    recipytext: {
        fontWeight: "bold",
        marginLeft: 15,
        fontSize: 18,
        color: "black",
        flex: 1,
        marginTop: 15
    },


    textinput: {
        marginLeft: 10,
        fontSize: 15
    },

    picker: {
        flex: 1,
        width: '50%',
    },
    btn: {
        marginTop: 20,
        marginVertical: 8,
        height: 60,


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
        backgroundColor: '#fff',
        height: 35
    },
    tagText: {
        color: '#3ca897'
    },

    camera1: {
        width: '100%',
        height: '100%',
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center'
    },
    camera2: {
        width: '100%',
        height: '100%',
        position: "absolute"
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
        flex: 1,
        marginRight: 20,
        marginTop: 8
    },
    camerabutton: {
        color: '#adb5bd'
    },

    cameraText1: {
        fontSize: 19,
        marginTop: -15,
        marginBottom: -15
    },

    tagText2: {
        marginLeft: 10,
        fontSize: 13,
        color: "black"

    },
    tagFrame: {
        width: '100%',
        height: 60,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "#adb5bd",
        justifyContent: "center"
    },

    youtubeFrame: {
        width: '100%',
        height: 40,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "#adb5bd",
        justifyContent: "center"
    },

})