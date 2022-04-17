import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import {  Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { black } from "react-native-paper/lib/typescript/styles/colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from "../../../consts/colors";
import { NavigationHeader } from "../../../theme";
import GoodsSearch from "../GoodsSearch";



export default function GoodsDisposable({route}:any){
    
 
    const navigation = useNavigation()
    const goBack = useCallback(() => navigation.canGoBack() && navigation.goBack(), [])
    const { seq } = route.params;
    const deliveryCharge = "3000원"
    
    return(
        <ScrollView style={styles.viewcoler}>
            {/* 상단 네비게이터 */}
            <NavigationHeader title="만개의 레시피" viewStyle={{}}
                Left= {() => <Icon name="arrow-left-bold" size={30} onPress={goBack} />}
                Right= {() => <Icon name="cart-heart" size={30} />}/>
             
            {/* 검색창 */}
            <GoodsSearch />


             <View style={styles.categoryname}>
            </View>

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator = {true}
                //onMomentumScrollEnd ={() => {console.log('Scrolling is End')}}
            >
            <View style={styles.viewStyle1}>    
            <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsBestAll', {"seq": 8})}>
                        <View style={styles.category}>

                            <Text style={{marginTop:8,fontSize:11,}}>베스트 전체</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsTableware', {"seq": 8})}>
                        <View style={styles.category}>
                            <Text style={{marginTop:8,fontSize:11}}>식기세트</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsCookingTool', {"seq": 8})}>
                        <View style={styles.category}>
                            <Text style={{marginTop:8,fontSize:11}}>조리도구세트</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsInduction', {"seq": 8})}>
                        <View style={styles.category}>
                            <Text style={{marginTop:8,fontSize:11}}>인덕션전용</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsKitchenTools', {"seq": 8})}>
                        <View style={styles.category}>
                            <Text style={{marginTop:8,fontSize:11}}>주방정리소품</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsOtherTools', {"seq": 8})}>
                        <View style={styles.category}>
                            <Text style={{marginTop:8,fontSize:11}}>기타주방잡화</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsCookingTongs', {"seq": 8})}>
                        <View style={styles.category}>
                            <Text style={{marginTop:8,fontSize:11}}>주방집게</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsDisposable', {"seq": 8})}>
                        <View style={styles.category}>
                            <Text style={{marginTop:8,fontSize:11, color:"#00ced1",fontWeight: "bold"}}>일회용품</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsItem', {"seq": 8})}>
                        <View style={styles.category}>
                            <Text style={{marginTop:8,fontSize:11}}>주방아이템</Text>
                        </View>
                    </TouchableHighlight>
            </View>
            </ScrollView>
            <View style={styles.count}>
                <Text style={{fontSize:10}}>4개의 검색결과</Text>
            </View>
            <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsDetail', {"seq": 25})}>
            <View style={styles.icon}>
                <View style={{flexDirection:"column",justifyContent:'space-around'}}>
                        <Image source={require('../../../assets/goodsdetail/main/ly1.jpg')}
                            style={styles.imgicon}></Image>
                    </View>
                    <View style={{marginLeft:10,}}>
                        <Text>상품명다용도 일회용 포장용기(믿음인터내셔널)</Text>
                        <Text style={{}}>25000원</Text>
                        <Text style={{}}>{deliveryCharge}</Text>
                        <View></View>
                    </View>
                </View>
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsDetail', {"seq": 26})}>
                <View style={styles.icon}>
                    <View style={{flexDirection:"column",justifyContent:'space-around'}}>
                        <Image source={require('../../../assets/goodsdetail/main/ly2.jpg')}
                            style={styles.imgicon}></Image>
                    </View>
                    <View style={{marginLeft:10,}}>
                        <Text>크린랲상품명 크린랩 지퍼백 고무장갑 크린백 위생장갑 호일 롤백</Text>
                        <Text style={{}}>4000원</Text>
                        <Text style={{}}>{deliveryCharge}</Text>
                        <View></View>
                    </View>
                </View>
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsDetail', {"seq": 27})}>
                <View style={styles.icon}>
                    <View style={{flexDirection:"column",justifyContent:'space-around'}}>
                        <Image source={require('../../../assets/goodsdetail/main/ly3.jpg')}
                            style={styles.imgicon}></Image>
                    </View>
                    <View style={{marginLeft:10,}}>
                        <Text>에콜그린상품명 못난이 개별포장 요쿠르트빨대 35개입 특가판매 국산</Text>
                        <Text style={{}}>1000원</Text>
                        <Text style={{}}>{deliveryCharge}</Text>
                        <View></View>
                    </View>
                </View>
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsDetail', {"seq": 28})}>
                <View style={styles.icon}>
                    <View style={{flexDirection:"column",justifyContent:'space-around'}}>
                        <Image source={require('../../../assets/goodsdetail/main/ly4.jpg')} 
                            style={styles.imgicon}></Image>
                    </View>

                    <View style={{marginLeft:10,}}>
                        <Text>상품명750cc 기본종이용기 1박스 1000개</Text>
                        <Text style={{}}>73000원</Text>
                        <Text style={{}}>{deliveryCharge}</Text>
                        <View></View>
                    </View>
                </View>
                </TouchableHighlight>
        </ScrollView>
        )

}
const styles = StyleSheet.create({
    viewcoler: {
        flex:1,
    },
    count:{
        paddingTop:6,
        paddingLeft:6,
        paddingBottom:6,
    },
    category:{
        marginLeft:10,
        alignItems:"center"
    },
    inputback: {
        backgroundColor: "white",
    },
    categoryname:{
        backgroundColor: "white",
        marginTop:5,
    },
    container1: {
        flex: 1,
        flexDirection: 'column', // 혹은 'column'
      },
      imgicon:{
        width:130,
        height:130,
        borderRadius:10,
      },
      icon: {
        flexDirection:"row",
        paddingTop:18,
        paddingLeft:18,
        paddingBottom:-10,
        marginBottom:2,
        backgroundColor: "white",
      },
      text:{
        marginLeft:10,
        marginTop:2,
      },
      item1: {
        justifyContent:"space-around",
        marginTop:8,
        height:150,
        flex: 1,
        backgroundColor: 'white',
      },
      item2: {
        justifyContent:"space-around",
        marginTop:8,
        height:150,
        flex: 1,
        backgroundColor: 'white',
      },
      item3: {
        justifyContent:"space-around",
        marginTop:8,
        height:150,
        flex: 1,
        backgroundColor: 'white',
      },
    container: {
        flex: 1,
        
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    inputContainer: {
        borderRadius: 7,
        margin: 15,
        marginBottom:30,
        height: 40,
        borderColor: "#00ced1",
        borderTopWidth: 1,
        borderRightWidth:2,
        borderLeftWidth:2,
        borderBottomWidth:1.5
        
    },
    viewStyle1: {
        backgroundColor : "white",
        flex: 1,
        flexDirection:"row",
        width : 800,
        paddingBottom:13,
        justifyContent: "space-around"
    }

    
    
})//css

