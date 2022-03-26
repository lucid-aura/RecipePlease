import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const testData = [
    {
        "memberId": "카카오", 
        "paymentCategory": "굿즈", 
        "paymentCount": 1, 
        "paymentDate": "2022-03-22", 
        "paymentDel": 0, 
        "paymentDetailAddr": "1층 경비실", 
        "paymentMainAddr": "대전 서구 둔산로 100", 
        "paymentPay": 12400, 
        "paymentSeq": 5, 
        "paymentZipcode": 35242
    },
    {
        "memberId": "카카오", 
        "paymentCategory": "굿즈", 
        "paymentCount": 1, 
        "paymentDate": "2022-03-20", 
        "paymentDel": 0, 
        "paymentDetailAddr": "101동 101호", 
        "paymentMainAddr": "대전 서구 둔산로 100", 
        "paymentPay": 23000, 
        "paymentSeq": 6, 
        "paymentZipcode": 35242
    }
];

export default function PurchaseList() {

    const [memberId, setMemberId] = useState('test');
    const [addr, setAddr] = useState('');
    const [amount, setAmount] = useState(0);
    
    axios.get("http://192.168.0.13:3000/payment/goodsPurchaseList", {
            params: {
                memberId: memberId
            }
    })
    .then((res) => {
        console.log(res.data);
        // setData(res.data[0].memberId);
        console.log(res.data.length);
        // for (let i = 0; i < res.data.length; i++) {
        //     setMemberId(res.data[i].memberId);
        //     setAddr(res.data[i].paymentMainAddr);
        //     setAmount(res.data[i].paymentPay);
        // }
    })
    .catch((err) => console.log(err));

    return (
        <View>
            <Text>Purchase List Page</Text>
            <Text>{memberId}</Text>
            <Text>{addr}</Text>
            <Text>{amount}</Text>

        </View>
    )
}