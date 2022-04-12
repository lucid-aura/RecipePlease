import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, InteractionManager, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { AppState } from "../../store";

import * as L from '../../store/login'
import { NavigationHeader } from "../../theme";
import MyUploadedRecipeFlatList from "../component/MyUploadedRecipeFlatList";
import { getMyUploadedRecipeDatas } from "../data/getMyUploadedRecipeDatas";
import { MyUploadedRecipeProps } from "../data/MyUploadedRecipeProps";

export default function MyUploadedRecipe() {

    const navigation = useNavigation()
    const log = useSelector<AppState, L.State>((state) => state.login)
    const [myData, setMyData] = useState<MyUploadedRecipeProps[]>([]) 
    
    const {loggedUser} = log
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    const datas = async() => {
        await getMyUploadedRecipeDatas(loggedUser.memberId)
                .then(value => {
                    setMyData(value)
                    console.log("내가 업로드한 레시피: " + JSON.stringify(value))
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
                        <MyUploadedRecipeFlatList datas={item} />
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

const styles = StyleSheet.create ({
    container: {
        flex:1
    },
    itemSeparator: {
        borderWidth:1,
        borderColor: Colors.grey500
    }
})