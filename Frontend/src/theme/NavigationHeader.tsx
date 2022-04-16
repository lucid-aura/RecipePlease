import React, { FC, ReactNode } from "react";
import { Text, View, StyleProp, ViewStyle, TextStyle, StyleSheet } from "react-native";
import RecipeSearch from "../recipe/RecipeSearch";
import GoodsSearch from "../goods/goodshome/GoodsSearch";

export type NavigationHeaderProps = {
    title?: string
    Left?: () => ReactNode
    Right?: () => ReactNode
    viewStyle?: StyleProp<ViewStyle>
    titleStyle?: StyleProp<TextStyle>
    target?:string
}

export const NavigationHeader: FC<NavigationHeaderProps> = ({
    title, Left, Right, viewStyle, titleStyle, target}) => {
        return(
            <View style={[styles.view, viewStyle]}>
                {Left && Left()}
                <View style={styles.flex}>
                    {target == 'recipe' &&
                    <RecipeSearch /> 
                    }
                    {target == 'goods' &&
                    <GoodsSearch /> 
                    }
                </View>
                {Right && Right()}
            </View>
        )
    }

const styles = StyleSheet.create({
    view: {width: '100%', padding:5, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'},
    title: {fontSize:20, fontWeight: '500', textAlign:'center'},
    flex: {flex:1, backgroundColor: 'transparent'}
})