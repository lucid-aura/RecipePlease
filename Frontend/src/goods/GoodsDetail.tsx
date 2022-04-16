import {  useFocusEffect, useNavigation, } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback,useEffect,useState } from "react";
import {  Alert, BackHandler, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { white } from "react-native-paper/lib/typescript/styles/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from "../consts/colors";
import { NavigationHeader } from "../theme/NavigationHeader";
import GoodsSearch from "./goodshome/GoodsSearch";
import config from "../project.config";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function GoodsDetail({route}:any){
    
 
    const navigation = useNavigation()
    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])
    const { seq } = route.params;
    const [count, setCount] = useState(1);
    const [price,setprice] = useState(0);

    const [goodsName,setgoodsName] = useState("");
    const [goodsCategory, setgoodsCategory] = useState("");
    const [goodsContent, setgoodsContent] =useState("");
    const [goodsCount, setgoodsCount] = useState(1);
    const [goodsPrice, setgoodsPrice] = useState(0);
    const [goodsRating, setgoodRating] = useState(0.0);
    const [goodsReadcount, setgoodsReadcount] = useState(0);
    const [goodsSeq, setgoodSeq] = useState(0);
    const [goodsView, setgoodsView] = useState(0);
    const [goodsData, setgoodsData] = useState({});

    function goPayment() {
        AsyncStorage.setItem('goodsData', JSON.stringify([{
            /*썸네일사진*/
            
            goodsSeq:goodsSeq,
            goodsName:goodsName,
            count:count,
            goodsPrice:goodsPrice
        }]));
        navigation.navigate('paymentInfo' as never) 
    }

    useFocusEffect(
        useCallback( () => {
            const fetchGoods = async() =>{
                const goodsData =await axios.post(config.address + "goodsData")
                setgoodsData(goodsData)
                console.log(goodsData.data)
                setgoodsName(goodsData.data.goodsName)
                setgoodsCategory(goodsData.data.goodsCategory)
                setgoodsContent(goodsData.data.goodsContent)
                setgoodsCount(goodsData.data.goodsCount)
                setgoodsPrice(goodsData.data.goodsPrice)
                setgoodRating(goodsData.data.goodsRating)
                setgoodsReadcount(goodsData.data.goodsReadcount)
                setgoodSeq(goodsData.data.goodsSeq)
                setgoodsView(goodsData.data.goodsView)
                setprice(goodsData.data.goodsPrice)

            }
         fetchGoods()
    }, []));


    const onIncrease = () => {setCount(count + 1); setprice(goodsPrice*(count + 1))};
    const onDecrease = () => {setCount(count - 1); setprice(goodsPrice*(count - 1))};
    const addCart = async () => {
        console.log("click")
        let cartData = await AsyncStorage.getItem('cartData'); 
        try {
            let cart = []
            if (cartData !== null) {
                cart = JSON.parse(cartData);
            }
            let item = {
                /*이미지*/
                goodsName:goodsName,
                count:count,
                goodsPrice:goodsPrice
            }
            cart.push(item)
            console.log("a " + JSON.stringify(cart))
            await AsyncStorage.setItem('cartData', JSON.stringify(cart));
            Alert.alert("장바구니에 추가되었습니다.")

        } catch(err) {
            console.log(err);
        }
    }
    return(
        <ScrollView>
            {/* 상단 네비게이터 */}
            <NavigationHeader title="만개의 레시피"
            Left={() => <Icon name="arrow-left-bold" size={30} onPress={goBack} />}
            Right={() => <Icon name="cart-heart" size={30} />} />

            {/* 검색참 */}
            <GoodsSearch />

            {/* 상품/리뷰 탭 */}
            <View style={styles.tap}>
                 <TouchableHighlight activeOpacity={0.9} style={styles.subtap}
                    onPress={() => navigation.navigate('goodsDetail', {"seq": 8})}>
                    <View>
                        <Text>삼품페이지 </Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={0.9} style={styles.subtap}
                    onPress={() => navigation.navigate('goodsDetailRating', {"seq": 8})}>
                    <View>
                        <Text>상품리뷰 </Text>
                    </View>
                </TouchableHighlight>
            </View>




            {/* 상품이미지 */}

    
            <View style={styles.viewStyle1}>
                <Image source={require('../assets/goodsdetail/goods1.jpg')}
                        style={styles.img1}></Image>
            </View>
            <View style={{paddingLeft:15,paddingRight:15,backgroundColor:"white"}}>
                <View style={{flexDirection: 'row',}}>
                    <View style={styles.price}>
                        <View style={styles.pricetext1}>
                            <Text style={styles.pricetext}>{goodsName}</Text>
                        </View>
                        <View style={styles.pricetext1}>
                            <Text style={styles.pricetext2}>{goodsPrice}원</Text>
                        </View>
                    </View>
                    
                    
            </View>  
                    <View>
                        <View style={styles.order}>
                            <Text style={{fontSize:16,marginTop:11,}}>택배배송 | 3,000원(주문시 결제)</Text>
                            <Text style={{fontSize:16,marginTop:5,}}>50,000원 이상 구매 시 무료 / 제주,도서지역 추가 5,000원 / 제주 및 도서산간 지역 추가배송비 발생합니다.</Text>
                        </View>
                        <View style={{height:60,width:"100%",borderWidth:1,borderColor:"#A6A6A6",backgroundColor:"#F0F0F0"}}>
                            <Text>상품 수량</Text>
                            <View style={{flexDirection: 'row', position:"absolute",bottom:0}}>
                                <View style={{width:35}}>
                                    <Button color={"#9999FF"} title="-" onPress={onDecrease}></Button>
                                </View>
                                <View style={{backgroundColor:"white",width:40,height:35,alignItems:"center",}}>
                                  <Text style={{fontSize:18, paddingTop:5}}>{count}</Text>
                                </View> 
                                <View style={{width:35}}>
                                    <Button color={"#9999FF"} title="+" onPress={onIncrease}></Button>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', position:"absolute",bottom:0,right:3,}}>
                                <Text style={{fontSize:20}}>{price}원</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row',justifyContent:"space-between",marginTop:15}}>
                            <View style={{width:"48.5%"}}>
                                <Button color={"pink"} title="장바구니" onPress={addCart}></Button>
                            </View>
                            <View style={{width:"48.5%",}}>
                                <Button title="구매하기" onPress={goPayment}></Button>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop:19}}>
                         <Image source={require('../assets/goodsdetail/good1.jpg')}
                         style={{width:"auto",height:600}}></Image>
                    </View>
            </View>

                <View style={styles.pricedetail}>
                    
                </View>
            
           
           
            {/* <Text >디테일 입니다요</Text>
                <Text>{seq}</Text> */}
        </ScrollView>
    )

}
const styles = StyleSheet.create({
    order:{
        
        height:100,
        borderTopWidth:1,
        borderColor:"#A6A6A6",
        backgroundColor:"white"
    },
    likebox:{
        width:"10%",
        backgroundColor:"white"
    },
    price:{
        backgroundColor: "white",
        height:150,
        width:"90%",
        
    },
    pricetext:{
        color:"black",
        fontSize:25,
        fontWeight: "bold",
        marginLeft:5,
    },
    pricetext1:{
        fontSize:24,
        fontWeight: "bold",
        marginTop:10,
    },
    pricetext2:{
        color:"#00ced1",
        fontSize:24,
        fontWeight: "bold",
        marginLeft:5,
    },
    pricedetail:{
        
    },
    img1:{
        width:600,
        height:600
    },
    inputback: {
        backgroundColor: "white",
        marginBottom:5,
    },
    tap:{
        marginTop:3,
        marginBottom:3,
        backgroundColor:"white",
        width:"100%",
        height: 40,
        flex:1,
        flexDirection: 'row',
    },
    subtap:{
        alignContent:'stretch',
        width:"50%",
        textAlign:"center",
        justifyContent: "space-around",
        alignItems:"center"
    },
    inputContainer: {
        borderRadius: 7,
        margin: 10,
        marginBottom:10,
        height: 40,
        borderColor: "#00ced1",
        borderTopWidth: 1,
        borderRightWidth:2,
        borderLeftWidth:2,
        borderBottomWidth:1.5
    },
    viewStyle:{
        width:"100%"
    },
    viewStyle1: {
        backgroundColor : "white",
        width : 600,
        height : 600,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewStyle2: {
        backgroundColor : "white",
        width : 600,
        height : 600,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize : 20,
        padding : 15,
        color : 'white',
        textAlign: 'center'
    }

})
