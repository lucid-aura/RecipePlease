import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, FlatList, SafeAreaView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { AppState } from "../../store";

import * as L from '../../store/login'
import { getMyUploadedRecipeDatas } from "../data/getMyUploadedRecipeDatas";
import { myUploadedRecipeProps } from "../data/myUploadedRecipeProps";

export default function MyUploadedRecipe() {

    const navigation = useNavigation()
    const log = useSelector<AppState, L.State>((state) => state.login)
    const [myData, setMyData] = useState<myUploadedRecipeProps[]>([]) 
    
    const {loggedUser} = log
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    const datas = async() => {
        await getMyUploadedRecipeDatas(loggedUser.memberId)
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
        <SafeAreaView>
            <Text>레시피 업로드하기</Text>
            
        </SafeAreaView>
    )
}