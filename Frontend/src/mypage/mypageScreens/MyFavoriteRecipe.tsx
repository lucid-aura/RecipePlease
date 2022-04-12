import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import { NavigationHeader } from "../../theme";
import * as L from '../../store/login'
import { getMyFavoriteRecipeDatas, MyFavoriteRecipeProps } from "../data";
import { useEffect } from "react";
import MyFavoriteFlatlist from "../component/MyFavoriteFlatlist";
import { Colors } from "react-native-paper";

export const MyFavoriteRecipe = () => {

    const navigation = useNavigation()
    const log = useSelector<AppState, L.State>((state) => state.login)
    const [myData, setMyData] = useState<MyFavoriteRecipeProps[]>([]) 
    
    const {loggedIn, loggedUser} = log
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    const datas = async() => {
        await getMyFavoriteRecipeDatas(loggedUser.memberId)
                .then(value => {
                    setMyData(value)
                    console.log("내가 좋아하는 레시피: " + JSON.stringify(value))
                    console.log("hook 레시피: "+JSON.stringify(myData))
                })
    }

   useEffect(() => {
        datas()
    }, [myData.length]) 
    
    const flatListRef = useRef<FlatList | null>(null)
    const onContentSizeChange = useCallback( 
        () => flatListRef.current?.scrollToEnd()
    , [flatListRef.current])

    return (
        <SafeAreaView style={[styles.container]}>
            <NavigationHeader title="내가 즐겨보는 레시피" viewStyle={{borderBottomWidth:1}}
                Left= {() => <Icon name="text-account" size={30} onPress={drawerOpen} />}
                Right= {() => <Icon name="cart-heart" size={30} />}
                />
            <View>
                <FlatList
                    ref={flatListRef}
                    data={myData}
                    renderItem={({item}) => (
                        <MyFavoriteFlatlist datas={item} />
                    )}
                    keyExtractor={(item, idx) => idx.toString()} 
                    style={{width:"100%"}}
                    onContentSizeChange={onContentSizeChange}
                    ItemSeparatorComponent={() => <View style={styles.itemSeparator}/>}
                    removeClippedSubviews= {true}
                />
            </View>
        </SafeAreaView>
    )
}

export default MyFavoriteRecipe

const styles = StyleSheet.create ({
    container: {
        flex:1
    },
    itemSeparator: {
        borderWidth:1,
        borderColor: Colors.grey500
    }
})