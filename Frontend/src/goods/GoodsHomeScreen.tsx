import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text,StyleSheet, Button, TextInput, Image, TouchableHighlight, Dimensions, FlatList, ScrollView } from "react-native";
import COLORS from "../consts/colors";
import {default as Icons } from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import foods from "../consts/foods";
import { FlipInEasyX } from "react-native-reanimated";
import Goodslisthome from "./Goodslisthome";
import { NavigationHeader } from "../theme";
import { black, white } from "react-native-paper/lib/typescript/styles/colors";
import GoodsCategoryHome from "./GoodsCategoryHome";
import GoodsSearch from "./goodshome/GoodsSearch";


export default function GoodsHomeScreen(){
    
 
    const navigation = useNavigation()
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    return(

        <ScrollView style={styles.viewcoler}> 
            {/* 상단 네비게이터 */}
            <NavigationHeader title="레시피를 부탁해" viewStyle={{}}
                target="goods"
                Left= {() => <Icon name="text-account" size={30} onPress={drawerOpen} />}
                Right= {() => <Icon name="cart-heart" size={30} />}/>


             <View style={styles.categoryname}>
                <Text style={{fontSize:17, fontWeight: "bold"}}>BEST 카테고리</Text>
            </View>

             {/* 카테고리 */}
             <View>
             <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator = {true}
                //onMomentumScrollEnd ={() => {console.log('Scrolling is End')}}
            >
                
                
                <View style={styles.viewStyle1}>
                    
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsBestAll', {"seq": 8})}>
                        <View style={styles.category}>
                            <Image source={require('../assets/goodscategory/bestall.jpg')}
                            style={styles.icon}></Image>
                            <Text style={styles.name}>베스트 전체</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsTableware', {"seq": 8})}>
                        <View style={styles.category}>
                            <Image source={require('../assets/goodscategory/Tableware.jpg')}
                            style={styles.icon}></Image>
                            <Text style={styles.name}>식기세트</Text>
                        </View>
                    </TouchableHighlight>
                     <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsCookingTool', {"seq": 8})}>
                        <View style={styles.category}>
                            <Image source={require('../assets/goodscategory/CookingTool.jpg')}
                            style={styles.icon}></Image>
                            <Text style={styles.name}>조리도구세트</Text>
                        </View>
                    </TouchableHighlight>
                   <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsInduction', {"seq": 8})}>
                        <View style={styles.category}>
                            <Image source={require('../assets/goodscategory/Induction.jpg')}
                            style={styles.icon}></Image>
                            <Text style={styles.name}>인덕션전용</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsKitchenTools', {"seq": 8})}>
                        <View style={styles.category}>
                            <Image source={require('../assets/goodscategory/KitchenTools.jpg')}
                            style={styles.icon}></Image>
                            <Text style={styles.name}>주방정리소품</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsOtherTools', {"seq": 8})}>
                        <View style={styles.category}>
                            <Image source={require('../assets/goodscategory/OtherTools.jpg')}
                            style={styles.icon}></Image>
                            <Text style={styles.name}>기타주방잡화</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('GoodsCookingTongs', {"seq": 8})}>
                        <View style={styles.category}>
                            <Image source={require('../assets/goodscategory/CookingTongs.jpg')}
                            style={styles.icon}></Image>
                            <Text style={styles.name}>주방집게</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsDisposable', {"seq": 8})}>
                        <View style={styles.category}>
                            <Image source={require('../assets/goodscategory/Disposable.jpg')}
                            style={styles.icon}></Image>
                            <Text style={styles.name}>일회용품</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsSpoonList', {"seq": 8})}>
                        <View style={styles.category}>
                            <Image source={require('../assets/goodscategory/Item.jpg')}
                            style={styles.icon}></Image>
                            <Text style={styles.name}>주방아이템</Text>
                        </View>
                    </TouchableHighlight> 
                        

                    {/* <GoodsCategoryHome
                    categorys ={categorys}
                    />  */}
                    </View>
            </ScrollView>
            </View>
        
                

             
            <View style={styles.categoryname}>
                <Text style={{fontSize:15, fontWeight: "bold"}}> 만개의 추천 상품</Text>
            </View>
            <View style={styles.item}>
            <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsDetail', {"seq": 8})}>
                <View style={styles.card}>
                    <View style={styles.img}>
                        
                        <Image 
                        style={styles.stretch}
                        source={require('../assets/goodsdetail/goods1.jpg')}
                        ></Image>
                        
                    </View>
                        <View style={styles.mainstory}>
                           <View style={styles.story}>
                                <Text style={{fontSize:20, fontWeight:"bold"}}>99,990원</Text>
                            </View>
                            <View style={styles.story1}>
                                <Text style={{fontSize:15,}}>
                                    놋담(식기) 백화점 선물포장 방짜유기 1인 식기세트(공기+대접+수저)
                                </Text>
                                    </View>
                                <View style={styles.story2}>
                                    <Text>별점</Text>
                                 </View>
                            </View>
                </View>
                </TouchableHighlight>
                <View style={styles.card1}>
                    <View style={styles.img}/>
                        <View style={styles.mainstory}>
                           <View style={styles.story}>
                                <Text style={{fontSize:20, fontWeight:"bold"}}>99,990원</Text>
                            </View>
                            <View style={styles.story1}>
                                <Text style={{fontSize:15,}}>
                                    놋담(식기) 백화점 선물포장 방짜유기 1인 식기세트(공기+대접+수저)
                                </Text>
                                    </View>
                                <View style={styles.story2}>
                                    <Text>별점</Text>
                                 </View>
                            </View>
                </View>
                <View style={styles.card2}>
                    <View style={styles.img}/>
                        <View style={styles.mainstory}>
                           <View style={styles.story}>
                                <Text style={{fontSize:20, fontWeight:"bold"}}>99,990원</Text>
                            </View>
                            <View style={styles.story1}>
                                <Text style={{fontSize:15,}}>
                                    놋담(식기) 백화점 선물포장 방짜유기 1인 식기세트(공기+대접+수저)
                                </Text>
                                    </View>
                                <View style={styles.story2}>
                                    <Text>별점</Text>
                                 </View>
                            </View>
                </View>
                <View style={styles.card3}>
                    <View style={styles.img}/>
                        <View style={styles.mainstory}>
                           <View style={styles.story}>
                                <Text style={{fontSize:20, fontWeight:"bold"}}>99,990원</Text>
                            </View>
                            <View style={styles.story1}>
                                <Text style={{fontSize:15,}}>
                                    놋담(식기) 백화점 선물포장 방짜유기 1인 식기세트(공기+대접+수저)
                                </Text>
                                    </View>
                                <View style={styles.story2}>
                                    <Text>별점</Text>
                                 </View>
                            </View>
                </View>

            </View>

            <View style={styles.categoryname}>
                <Text style={{fontSize:15, fontWeight: "bold"}}> 베스트 상품</Text>
            </View>
            <View style={styles.item}>
            <TouchableHighlight activeOpacity={0.9}
                    onPress={() => navigation.navigate('goodsDetail', {"seq": 8})}>
                <View style={styles.card}>
                    <View style={styles.img}/>
                        <View style={styles.mainstory}>
                           <View style={styles.story}>
                                <Text style={{fontSize:20, fontWeight:"bold"}}>99,990원</Text>
                            </View>
                            <View style={styles.story1}>
                                <Text style={{fontSize:15,}}>
                                    놋담(식기) 백화점 선물포장 방짜유기 1인 식기세트(공기+대접+수저)
                                </Text>
                                    </View>
                                <View style={styles.story2}>
                                    <Text>별점</Text>
                                 </View>
                            </View>
                </View>
                </TouchableHighlight>
                <View style={styles.card1}>
                    <View style={styles.img}/>
                        <View style={styles.mainstory}>
                           <View style={styles.story}>
                                <Text style={{fontSize:20, fontWeight:"bold"}}>99,990원</Text>
                            </View>
                            <View style={styles.story1}>
                                <Text style={{fontSize:15,}}>
                                    놋담(식기) 백화점 선물포장 방짜유기 1인 식기세트(공기+대접+수저)
                                </Text>
                                    </View>
                                <View style={styles.story2}>
                                    <Text>별점</Text>
                                 </View>
                            </View>
                </View>
                <View style={styles.card2}>
                    <View style={styles.img}/>
                        <View style={styles.mainstory}>
                           <View style={styles.story}>
                                <Text style={{fontSize:20, fontWeight:"bold"}}>99,990원</Text>
                            </View>
                            <View style={styles.story1}>
                                <Text style={{fontSize:15,}}>
                                    놋담(식기) 백화점 선물포장 방짜유기 1인 식기세트(공기+대접+수저)
                                </Text>
                                    </View>
                                <View style={styles.story2}>
                                    <Text>별점</Text>
                                 </View>
                            </View>
                </View>
                <View style={styles.card3}>
                    <View style={styles.img}/>
                        <View style={styles.mainstory}>
                           <View style={styles.story}>
                                <Text style={{fontSize:20, fontWeight:"bold"}}>99,990원</Text>
                            </View>
                            <View style={styles.story1}>
                                <Text style={{fontSize:15,}}>
                                    놋담(식기) 백화점 선물포장 방짜유기 1인 식기세트(공기+대접+수저)
                                </Text>
                                    </View>
                                <View style={styles.story2}>
                                    <Text>별점</Text>
                                 </View>
                            </View>
                </View>

            </View>
           

           
           
            {/* <View style={styles.container1}>
                 <View style={styles.item1}>
                     <Text style={styles.text}>조회순위</Text>
                     <Goodslisthome foods={foods}/>
                 </View>
                 <View style={styles.item2}>
                     <Text style={styles.text}>추천순위</Text>
                     <Goodslisthome foods={foods}/>
                 </View>
                 <View style={styles.item3}>
                     <Text style={styles.text}>오늘의 상품</Text>
                     <Goodslisthome foods={foods}/>
                 </View> 
             </View>
              */}
             
             
             
             
             
             {/* <View style={{justifyContent:"center" }}>
             <Goodslisthome
                 foods={foods}
              />
             </View>  */}

             <Text>개인정보 처리방침</Text>
             <Button title="Pay로 이동" onPress={()=>navigation.navigate('paymentInfo')}></Button>

        </ScrollView>

    )
}// 네비 함수 생성후 버튼 클릭시 이동처리

const styles = StyleSheet.create({
    viewcoler: {
        flex:1,
    },
    category:{
        alignItems:"center",
        paddingRight:10,
        
    },
    name:{
        marginTop:8,
        fontSize:11,
        marginLeft:11
    },
    inputback: {
        backgroundColor: "white",
    },
    categoryname:{
        backgroundColor: "white",
        marginTop:5,
        paddingLeft:10,
        paddingTop:5,
    },
    container1: {
        flex: 1,
        flexDirection: 'column', // 혹은 'column'
      },
      icon0:{
        flex:1,
        borderColor: "#00ced1",
        height: 65, 
        width: 65, 
        borderRadius: 100,
        borderWidth:3,
      },
      icon: {
        marginLeft:10,
        height: 65, 
        width: 65, 
        borderRadius: 100,
        borderWidth:1,
        borderColor:"#C0C0C0",
      },
      text:{
        marginLeft:10,
        marginTop:2,
      },
      item: {
        display:"flex",
        width:"100%",
        backgroundColor: 'white',
        paddingBottom:"140%"
      },


      //목록별 상품 배치
      subitem:{
        position:"absolute",
        backgroundColor:'dodgerblue',
        width:'50%',  
        paddingBottom:"140%"
      },
      subitem1:{
        position:"absolute",
        backgroundColor:'dodgerblue',
        width:'50%',  
        paddingBottom:"140%",
        right:0,
        
      },
      subitem2:{
        position:"absolute",
        backgroundColor:'dodgerblue',
        width:'50%',  
        paddingBottom:"140%",
        bottom:0,
      },
      subitem3:{
        position:"absolute",
        backgroundColor:'dodgerblue',
        width:'50%',  
        paddingBottom:"140%",
        right:0,
        bottom:0,
      },
      //목록 상품 상세배치
      card: {
        position:"absolute",
        backgroundColor:'white',
        width:'50%',  
        paddingBottom:"130%"
    },
    card1: {
  position:"absolute",
  backgroundColor:'white',
  width:'50%',  
  paddingBottom:"130%",
  right:0,
},
card2: {
    position:"absolute",
    backgroundColor:'white',
    width:'50%',  
    paddingBottom:"10%",
    bottom:0,
  },
  card3: {
    position:"absolute",
    backgroundColor:'white',
    width:'50%',  
    paddingBottom:"10%",
    right:0,
    bottom:0,
  },
    img:{
      elevation: 16,
      width:"92%",
      height: 50,
      paddingBottom:"92%",     
      backgroundColor:'#FAFAFA',
      left:"4%",
      top:"4%",
      borderRadius:10,    

    },

    stretch:{
        alignSelf:'center',
        width: "100%",
        height:50,
        paddingBottom:"100%",  
        resizeMode: "stretch"
    },

    mainstory:{
        left:"4%",
        top:"5%"
    },
    story:{
        width:"92%",
        paddingBottom:"3%",
    },
    story1:{
        width:"92%",
        paddingBottom:"3%",
    },
    story2:{
        width:"92%",
        paddingBottom:"3%",
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
        paddingLeft:3,
        flexDirection:"row",
        width : 700,
        paddingTop:10,
        paddingBottom:13,
        justifyContent: "space-around",

    }

    
    
})//css

