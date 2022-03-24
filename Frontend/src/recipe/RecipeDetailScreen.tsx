/*
npm install react-native-tags-input
*/

import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Dimensions } from "react-native";
import axios from 'axios';
import RecipeDetailOrder from "./RecipeDetailOrder";
// import TagInput from 'react-native-tags-input';
import Icon from 'react-native-vector-icons/Ionicons'
import RecipeTags from './RecipeTags'
import RecipeDetailRating from './RecipeDetailRating'
import { Rating } from "react-native-ratings";

const Stack = createNativeStackNavigator()
const context = createContext({})

export default function RecipeDetailScreen({ route, navigation }:any){

    const [thumbnail, setThumbnail] = useState({})
    const [avarage, setAvarage] = useState(0.0)

    const [recipe, setRecipe]= useState({});
    const [tag, setTag] = useState([])

    /*
    const [tags, setTags] = useState({
          tag: '',
          tagsArray: []
      });
    const [tagsColor, setTagsColor] = useState('')
    const [tagsText, setTagsText] = useState('')
    */

    const { seq } = route.params;
    const { category } = route.params;

    useEffect( () => {
        let completed = false;

        const fetchRecipe = async() =>{
            const recipeRes =await axios.get("http://192.168.0.4:3000/getOneRecipe?recipeSeq=" + seq )
            if (!completed) {
                setRecipe(recipeRes.data);
                setTag(recipeRes.data.recipeGoodsTag.split(","))
                setAvarage(recipeRes.data.recipeRating)
                console.log(recipeRes.data)
            }

            const thumbnailRes = await axios.get("http://192.168.0.4:3000/getThumbnailPhoto?docsSeq=" + seq +"&photoCategory=" + category)
            if (!completed) setThumbnail(thumbnailRes.data);
        }

        fetchRecipe()
        return () => {
            completed = true;

          };
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.contentContainer}>
                <View>
                    <Text style={styles.title}>{recipe.recipeTitle}</Text>
                    <Image source={{ uri:thumbnail.photoUrl, width:600, height:300 }} />
                </View>
                <View>

                <Rating
                    type='star'
                    ratingCount={5}
                    imageSize={30}
                    tintColor="#EEEEEE"
                    showRating={true}
                    startingValue={avarage}
                    minValue={1}
                    fractions={20}
                    readonly={true}
                    style={{marginRight:10}}
                />
                    <Text style={styles.subTitle}>조리법</Text>
                    <RecipeDetailOrder seq={seq} category={category}/>
                </View>
                <View>
                    <Text style={styles.subTitle}>요리설명</Text>
                    <Text style={styles.content}>{recipe.recipeContent}</Text>
                </View>
                {/* <TagInput
                    updateState={(tags:any) =>{setTags(tags)}}
                    tags={tags}
                    placeholder="Tags..."                            
                    label='Press comma & space to add a tag'
                    labelStyle={{color: '#fff'}}
                    leftElement={<Icon name='pricetag' color='blue'/>}
                    leftElementContainerStyle={{marginLeft: 3}}
                    containerStyle={{width: (Dimensions.get('window').width - 40)}}
                    inputContainerStyle={[styles.textInput, {backgroundColor: '#fff'}]}
                    inputStyle={{color:  '#fff'}}
                    onFocus={() => {
                        setTagsColor('#fff')
                        setTagsText('#3ca897')
                    } }
                    onBlur={() => {
                        setTagsColor('#fff')
                        setTagsText('#3ca897')
                    }}
                    autoCorrect={false}
                    tagStyle={styles.tag}
                    tagTextStyle={styles.tagText}
                    keysForTag={', '}
                /> */}
                <View>
                    <Text style={styles.subTitle}>태그</Text>
                    <RecipeTags tag={tag} />
                </View>
                <View>
                    <Text style={styles.subTitle}>평가</Text>
                    <RecipeDetailRating  seq={seq} setAvarage={setAvarage} />
                </View>

            </ScrollView>
            
        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 0
      },
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom:10
    },
    titleImage:{
        width:"600",
        height:"300"
    },
    title:{
        fontSize:48,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    subTitle:{
        fontSize:36,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    content: {
        fontSize:18,
        color:'grey'
    },
    textInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
      },
      tag: {
          backgroundColor: '#fff'
        },
      tagText: {
          color: '#3ca897'
        },
}) //css