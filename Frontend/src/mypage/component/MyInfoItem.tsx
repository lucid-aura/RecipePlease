import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { NavigationHeader } from "../../theme";
import * as L from "../../store/login"
import * as D from "../../store/drawer"
import axios from "axios";
import { address } from "../../project.config";

const MyInfoItem = ({loggedUser}:any) => {

    //console.log(`MyInfoItem ${loggedUser}`)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [updateUrl, setUpdateUrl] = useState<string>("")
    const [updateInfo, setUpdateInfo] = useState<string>("")
    const [updateValue, setUpdateValue] = useState<string>("")

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const goShoppingCart = () => {
        dispatch(D.drawerChangeFalseAction())
        navigation.dispatch(DrawerActions.openDrawer())
    }
    const goSetting = () => {
        dispatch(D.drawerChangeTrueAction())
        navigation.dispatch(DrawerActions.openDrawer())
    }
    const goMyInfoUpdate = () => {
        navigation.navigate("MyInfoUpdate")
    }

    const update = () => {
        console.log(updateValue)
        axios.post(address+updateUrl, null, { 
            params: { 
                        [updateInfo]: updateValue,
                        memberId: loggedUser.memberId 
                    }
            })
        .then((response) => {
            if(response.data === "success") {
                Alert.alert("수정이 완료되었습니다.")
                dispatch(L.loginAction({
                                        ...loggedUser,
                                        [updateInfo]: updateValue}
                                      ))
            } else {
                Alert.alert("수정이 안되었습니다. 다시 확인해주세요")
            }
        }).catch((err:Error) => console.log(err))
    }
    

    return (
        <SafeAreaView style={[styles.container]}>
             
            <View style={[styles.topBar]}> 
                <NavigationHeader title="내 정보" 
                    Left= {() => <Icon name="text-account" size={30} onPress={goSetting} />}
                    Right= {() => <Icon name="cart-heart" size={30} onPress={goShoppingCart} />} 
                />
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>아이디: {loggedUser.memberId}</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>닉네임: {loggedUser.memberNickname}</Text>
                <Pressable 
                    style={[styles.pressAble]} 
                    onPress={() => {
                        setTitle("닉네임")
                        setUpdateUrl("updateNickname")
                        setUpdateInfo("memberNickname")
                        setUpdateValue(loggedUser.memberNickname)
                        setModalVisible(!modalVisible)}
                    }>
                    <Text>수정하기</Text>
                </Pressable>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>이름: {loggedUser.memberName}</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>성별: {loggedUser.memberGender}</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>회원등급: {loggedUser.memberGrade}</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>이메일: {loggedUser.memberEmail}</Text>
                <Pressable 
                    style={[styles.pressAble]} 
                    onPress={() => {
                        setTitle("이메일")
                        setUpdateUrl("updateEmail")
                        setUpdateInfo("memberEmail")
                        setUpdateValue(loggedUser.memberEmail)
                        setModalVisible(!modalVisible)}
                    }>
                    <Text>수정하기</Text>
                </Pressable>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>전화번호: {loggedUser.memberPhone}</Text>
                <Pressable 
                    style={[styles.pressAble]} 
                    onPress={() => {
                        setTitle("전화번호")
                        setUpdateUrl("updatePhone")
                        setUpdateInfo("memberPhone")
                        setUpdateValue(loggedUser.memberPhone)
                        setModalVisible(!modalVisible)}
                    }>
                    <Text>수정하기</Text>
                </Pressable>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>코인: {loggedUser.memberCoin}</Text>
            </View>
            <View style={[styles.contentView]}>
                <Text style={{fontSize:23}}>주소: {loggedUser.memberMainAddr + loggedUser.memberDetailAddr}</Text>
                <Pressable 
                    style={[styles.pressAble]} 
                    onPress={() => {
                        navigation.navigate("MyInfoAddr")
                    }}>
                    <Text>수정하기</Text>
                </Pressable>
            </View>
            <Modal
                style={{justifyContent:'center', alignItems:'center'}}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed")
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={[styles.modalView]}>
                    <View style={[{borderWidth:1}]}>
                        <Text>{title} 수정하기</Text>
                        <TextInput 
                            value={updateValue}
                            placeholderTextColor='#003f5c'
                            onChangeText={(text) => setUpdateValue(text)}
                        />
                        <View style={{flexDirection:'row', justifyContent:"flex-end"}}>
                            <Pressable style={{ marginRight:10}} onPress={() => setModalVisible(!modalVisible)}>
                                <Text>취소</Text>
                            </Pressable>

                            <Pressable 
                                style={{marginRight:10}} 
                                onPress={() => {
                                    update()
                                }}>
                                <Text>확인</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>
            
        </SafeAreaView>
    )
}

export default MyInfoItem

const styles = StyleSheet.create({
    container: {
        flex:1,
        //backgroundColor: 'rgba(52,52,52, 0.5)'
    },
    topBar: {
        borderWidth: 0.5,
    },
    contentView: {
        padding:20,
        borderBottomWidth:0.5,
        borderBottomColor:Colors.grey500,
        flexDirection:'row',
        justifyContent: 'space-between',
        
    },
    pressAble: {
        borderWidth:0.5,
        justifyContent:'center',
        alignItems:'center',
        padding:3
    },
    modalView: {
        flex:1,
        justifyContent:'center', 
        alignItems:'center',
        borderwidth:1,
        borderColor:Colors.amber700

    },
})