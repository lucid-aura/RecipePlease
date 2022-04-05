import { DrawerActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { address } from "../../project.config";
import { AppState } from "../../store";
import { NavigationHeader } from "../../theme";
import * as L from '../../store/login'
import { getMyFavoriteRecipeDatas, MyFavoriteRecipeProps } from "../data";
import { useEffect } from "react";

export default function MyFavoriteRecipe() {

    const navigation = useNavigation()
    const log = useSelector<AppState, L.State>((state) => state.login)
    const [myData, setMyData] = useState({
        "recipeRatingCount": [],
        "recipeTitle": [],
        "recipeReadcount": [],
        "recipeRating": [] ,
        "recipeThumbnails": [],
        "recipeSeq": [],
        "memberNickname": [],
    })
    const {loggedIn, loggedUser} = log
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    const datas = useCallback( async() => {
        await getMyFavoriteRecipeDatas(loggedUser.memberId)
        .then(value => {
            setMyData(value)
            console.log(JSON.stringify(myData))
        })
    },[])
    useEffect(() => {
        datas()
    }, [myData])

    return (
        <SafeAreaView style={[styles.container]}>
            <NavigationHeader title="내가 즐겨보는 레시피" viewStyle={{}}
                Left= {() => <Icon name="text-account" size={30} onPress={drawerOpen} />}
                Right= {() => <Icon name="cart-heart" size={30} />}
                />
            <Button
                title="test"
                

            />
            <ScrollView>
                
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex:1
    }
})