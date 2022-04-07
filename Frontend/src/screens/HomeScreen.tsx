import React, { useCallback } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {default as Icons } from 'react-native-vector-icons/MaterialCommunityIcons';

import COLORS from '../consts/colors';
import categories from '../consts/categories';
import foods from '../consts/foods';

import { NavigationHeader } from '../theme';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { getProfile } from '../mypage/utils';

const {width} = Dimensions.get('screen'); //스크린 
const cardWidth = width / 2 - 20; //카드값 길이시 2개에서 부터 20개까지 설정

const HomeScreen = () => {
  const navigation = useNavigation()
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])

  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0); //훅 설정

  const ListCategories = () => { //리스트 카테고리 함수
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}>
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : COLORS.secondary,
                ...style.categoryBtn,
              }}>
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{height: 35, width: 35, resizeMode: 'cover'}}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}>
                {category.name}
              </Text>
            </View>
          </TouchableOpacity> //상단 카테고리 4개 설정
        ))}
      </ScrollView> //스크롤 뷰에서 화면 단 처리
    );
  };

  const Card = ({food}:any) => {
    return (
      <TouchableHighlight//사진 및 디테일 설정
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('RecipeNavigator'  as never, { 
          screen: 'RecipeDetail',
          params:{
            seq:0, 
            updateRecipeDataAfterComment: console.log("여기에 평가 작성 시 데이터 리로드 하는 함수가 들어가야 합니다."),
            category: 'recipe'
          }
        }  as never)}>
        <View style={style.card}>
          <View style={{alignItems: 'center', top: -40}}>
            <Image source={food.image} style={{height: 120, width: 120}} />
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{food.name}</Text>
            <Text style={{fontSize: 14, color: COLORS.grey, marginTop: 2}}>
              {food.ingredients}
            </Text>
          </View>
          <View //+ 기호 삭제 + $삭제
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {food.prompt}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (//최상단 부분에 글귀 타이틀 + 사진 처리
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <NavigationHeader title="홈" 
                Left= {() => <Icons name="text-account" size={30} onPress={drawerOpen} />}
                Right= {() => <Icons name="cart-heart" size={30} />}
                />

      <View style={style.header}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 28}}>안녕하세요~!</Text>
            <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>
              레시피를 부탁해
            </Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 22, color: COLORS.grey}}>
            당신은 요리법이 필요해~!
          </Text>
        </View>
        <Image
          source={require('../assets/person.png')}
          style={{height: 50, width: 50, borderRadius: 25}}
        />
      </View>
      <View 
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput //검색바 + 우측 검색 구간 아이콘 삭제(현재 슬라이더로 메뉴 구성단 완성으로 삭제)
            style={{flex: 1, fontSize: 18}}
            placeholder="요리법을 선택하세요"
          />
        </View>
      </View>
      <View>
        <ListCategories />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={foods}
        renderItem={({item}) => <Card food={item} />}
      />
    </SafeAreaView> //여기에 검색바에서 메뉴 검색 슬라이딩 메뉴 기능 구현을 해야함
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); //css 구간

export default HomeScreen; //홈스크린 회기
