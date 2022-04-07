import { DrawerActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback } from "react";
import { Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { address } from "../../project.config";
import { AppState } from "../../store";
import { NavigationHeader } from "../../theme";
import * as L from '../../store/login'

export default function MyFavoriteRecipe() {

    const navigation = useNavigation()
    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    const test = useCallback(() => {
        axios.get(address+"myFavoriteRecipe", { params: { memberId: loggedUser.memberId } })
            .then((response) => {
                console.log(JSON.stringify(response.data))
            })
            .catch((err:Error) => {
                console.log(err)
            })
    },[])

    return (
        <SafeAreaView style={[styles.container]}>
            <NavigationHeader title="내가 즐겨보는 레시피" viewStyle={{}}
                Left= {() => <Icon name="text-account" size={40} onPress={drawerOpen} />}
                Right= {() => <Icon name="cart-heart" size={40} />}
                />
            <Button
                title="test"
                onPress={() => test()}

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