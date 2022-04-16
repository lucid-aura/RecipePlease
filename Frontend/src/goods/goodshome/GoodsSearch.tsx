import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationHeader } from "../../theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Checkbox, Searchbar } from "react-native-paper";
import { TextInput } from "react-native-gesture-handler";
import COLORS from '../../consts/colors';

export default function GoodsSearch() { // 굿즈 검색 컴포넌트
    const navigation = useNavigation()
    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])

    const bigCategoryArray =  ["livestock", "seafood"]
    const smallCategoryArray =  ["personal", "entertain", "nightmeal"]

    const expandIcon = ["expand-more", "expand-less"]
    const [search, setSearch] = useState("");
    const [expandBtn, setExpandBtn] = useState(0)

    const [advanced, setAdvanced] = useState(false)

    const [livestock, setLivestock] = useState(true)
    const [seafood, setSeafood] = useState(true)

    const [personal, setPersonal] = useState(true)
    const [entertain, setEntertain] = useState(true)
    const [nightMeal, setNightMeal] = useState(true)


    useEffect( () => {

        const fetchSearch = async() =>{
            //const searchRes =await axios.get(config.address + "getRecipeSearch?search=" + search )
            //rsetResult(searchRes.data)
        }
        fetchSearch()
    }, [])

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.inputback}>
            <View style={styles.inputContainer}>
                <TextInput //검색바 + 우측 검색 구간 아이콘 삭제(현재 슬라이더로 메뉴 구성단 완성으로 삭제)
                    style={{flex: 1, fontSize: 18}}
                    placeholder="원하시는 상품을 검색하세요"
                    onChangeText={text => setSearch(text)}
                />
                    <Icons 
                    name="search" size={28} 
                    onPress ={ () =>{
                        let optionsArr = [livestock, seafood]
                        let bigOptions:any = []

                        optionsArr.forEach((element, index) => {
                            if (element) bigOptions.push(bigCategoryArray[index])
                        });

                        let smallOptions:any = []
                        optionsArr = [personal, entertain, nightMeal]
                        optionsArr.forEach((element, index) => {
                            if (element) smallOptions.push(smallCategoryArray[index])
                        });

                        navigation.navigate(" " as never ,{ search:search, bigOptions:bigOptions, smallOptions:smallOptions } as never)
                    }}
                />
                <Icons 
                    name={expandIcon[expandBtn]} size={28} 
                    onPress ={ () =>{
                        setExpandBtn((expandBtn+1)%2)
                        setAdvanced(!advanced)
                    }}
                />
            </View>
        </View>



        {/* <View style={{width:560}}>
        <Searchbar
            placeholder="레시피를 입력하세요"
            onChangeText={text => setSearch(text)}
            value={search}
            onIconPress ={ () =>{
                let options = [livestock, seafood, personal, entertain, nightMeal]
                navigation.navigate("RecipeSearchResult" as never ,{ search:search, options:livestock } as never)
            }}
            />
        </View> */}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
        
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:"#eeeeee"
    },
    inputback:{
        backgroundColor:"#eeeeee"
    },
    inputContainer: {
        height: 45,
        borderColor: "#00ced1",
        borderTopWidth: 1,
        borderRightWidth:2,
        borderLeftWidth:2,
        borderBottomWidth:1,
        width:"95%",
        borderRadius: 10,
        flexDirection: 'row',
        marginTop:15,
        backgroundColor:"white",
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom:10,
    },
    categoryCheck:{
        flexDirection:'row',

    },
    categoryText: {
        fontSize:16,
        textAlignVertical:'center'
    }
}) //css

