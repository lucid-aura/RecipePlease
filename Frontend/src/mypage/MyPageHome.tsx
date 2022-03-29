import AsyncStorage from "@react-native-async-storage/async-storage";
import { KakaoOAuthToken, KakaoProfile, login, logout, getProfile as getKakaoProfile, unlink } from "@react-native-seoul/kakao-login";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text,StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationHeader } from "../theme";
import { signOutWithKakao } from "./utils";

/* 
npm i react-native-paper
npm i color
npm i @types/color
npm i axios

*/

export default function MyPageHome(){

    const navigation = useNavigation()
    const drawerOpen = useCallback(() => {navigation.dispatch(DrawerActions.openDrawer())}, [])
    const [result, setResult] = useState<string>('');

      

    
    // 로그인 훅
    const [id, setId] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')

    let screenChange = ''
    useEffect(() =>  {screenChange = id}, [])

    if(screenChange == '') {
        return(
            <View style={styles.container}>
                <NavigationHeader title="홈" 
                Left= {() => <Icon name="text-account" size={30} onPress={drawerOpen} />}
                Right= {() => <Icon name="cart-heart" size={30} />}
                />
                {/* 아이디 입력 */}
                <View>
                    <TextInput
                        placeholder="id를 입력해 주세요"
                        placeholderTextColor='#003f5c'
                        onChangeText = {(id) => setId(id)} />
                </View>

                {/* 패스워드 입력 */}
                <View>
                    <TextInput
                        placeholder="패스워드를 입력해 주세요"
                        placeholderTextColor='#003f5c'
                        secureTextEntry={true}
                        onChangeText = {(pwd) => setPwd(pwd)} />
                </View>

                {/* 로그인 버튼 */}
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text>로그인</Text>
                </TouchableOpacity>

                {/* 회원가입 버튼 */}
                <TouchableOpacity onPress={() => navigation.navigate('MyAccount')}>
                    <Text>회원가입</Text>
                </TouchableOpacity>

            </View>
        )
    } else {
        <View>
            <Text>로그인 되어 있음</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MyFavoriteRecipe')}>
                    <Text>즐겨찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MyInfo')}>
                    <Text>내 정보</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MyUploadedRecipe')}>
                    <Text>내가 쓴 레시피</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RecipeUpload')}>
                    <Text>레시피 업로드</Text>
            </TouchableOpacity>
        </View>
    }
   /* 
        <View>
            <Text>로그인 되었을 때</Text>
        </View>
     */
}  // 네비 함수 생성후 버튼 클릭시 이동처리

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}) //css

/** 테스트용 **/
// export default function MyPageHomeScreen(){

//     const navigation = useNavigation()
    
//     // 로그인 훅
//     const [id, setId] = useState<string>('')
//     const [pwd, setPwd] = useState<string>('')

//     let screenChange = ''
//     useEffect(() =>  {screenChange = id}, [])

//     if(screenChange == '') {
//         return(
//             <View style={styles.container}>
//                 {/* 아이디 입력 */}
//                 <View>
//                     <TextInput
//                         placeholder="id를 입력해 주세요"
//                         placeholderTextColor='#003f5c'
//                         onChangeText = {(id) => setId(id)} />
//                 </View>

//                 {/* 패스워드 입력 */}
//                 <View>
//                     <TextInput
//                         placeholder="패스워드를 입력해 주세요"
//                         placeholderTextColor='#003f5c'
//                         secureTextEntry={true}
//                         onChangeText = {(pwd) => setPwd(pwd)} />
//                 </View>

//                 {/* 로그인 버튼 */}
//                 <TouchableOpacity onPress={() => {
//                     navigation.navigate('Home')

//                     axios.post("http://192.168.0.13:3000/login", null, {
//                         params: {
//                             memberId: id,
//                             memberPwd: pwd
//                         }
//                     })
//                     .then((res) => { 
//                         console.log(res.data);
//                         AsyncStorage.setItem("loginData", JSON.stringify(res.data));
//                     })
//                     .catch((err) => console.log(err));
                    
//                 }}>
//                     <Text>로그인</Text>
//                 </TouchableOpacity>

//                 {/* 회원가입 버튼 */}
//                 <TouchableOpacity onPress={() => navigation.navigate('MyAccount')}>
//                     <Text>회원가입</Text>
//                 </TouchableOpacity>

//             </View>
//         )
//     } else {
//         <View>
//             <Text>로그인 되어 있음</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('MyFavoriteRecipe')}>
//                     <Text>즐겨찾기</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate('MyInfo')}>
//                     <Text>내 정보</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate('MyUploadedRecipe')}>
//                     <Text>내가 쓴 레시피</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate('RecipeUpload')}>
//                     <Text>레시피 업로드</Text>
//             </TouchableOpacity>
//         </View>
//     }
//    /* 
//         <View>
//             <Text>로그인 되었을 때</Text>
//         </View>
//      */
// }  // 네비 함수 생성후 버튼 클릭시 이동처리

/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}) //css

*/