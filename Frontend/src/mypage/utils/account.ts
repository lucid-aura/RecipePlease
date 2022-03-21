import axios from "axios"
import { useState } from "react"
import { Alert } from "react-native"


export const idCheck = (id: string, msg:string) => {
    
    if(id.trim() === '') {
        Alert.alert("아이디", "아이디를 입력해주세요")
        id =''
        return id 
    } else {
        axios.post("192.168.219.101:3000/idCheck", null, {params: {id:id}})
             .then(function(response) {
                 console.log(response.data)
                 if(response.data = "OK") {
                     return msg= "사용 가능합니다."
                 } else {
                    return msg= "사용 중입니다."
                 }
             })
             .catch(function(err) {
                 console.log(err)
             })
    }
}