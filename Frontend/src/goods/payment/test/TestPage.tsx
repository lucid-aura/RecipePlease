import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function TestPage({ navigation }:any) {

    return (
        <View style={{padding: 20}}>

            <Pressable 
                style={{margin: 10, 
                    padding: 10, 
                    backgroundColor: '#05f', 
                    alignItems: 'center', 
                    borderRadius: 10
                }}
                onPress={() => navigation.navigate('purchaseList')}
            >
                <Text style={{color: '#fff', fontWeight: '700'}}>구매이력 조회</Text>
            </Pressable>

            <Pressable 
                style={{margin: 10, 
                    padding: 10, 
                    backgroundColor: '#4f2599', 
                    alignItems: 'center', 
                    borderRadius: 10
                }}
                onPress={() => navigation.navigate('purchaseRecipe')}
            >
                <Text style={{color: '#fff', fontWeight: '700'}}>레시피 구매</Text>
            </Pressable>

            {/* <Pressable 
                style={{margin: 10, padding: 10, backgroundColor: '#f27533', alignItems: 'center', borderRadius: 10}}
            >
                <Text style={{color: '#fff', fontWeight: '700'}}>기타</Text>
            </Pressable> */}

        </View>
    )
}