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

const Item = ({ member, paymentCategory, paymentCount, 
                paymentDate, paymentDel, paymentMainAddr, 
                paymentDetailAddr, paymentPay, paymentSeq, paymentZipcode }:any) => {
    
    function itemClick(paymentSeq:number) {
        console.log('item clicked');
    }

    return (
        <View>
            <TouchableOpacity onPress={() => itemClick(paymentSeq)}>
                <Text>{member}</Text>
                <Text>{paymentCategory}</Text>
                <Text>{paymentCount}</Text>
                <Text>{paymentDate}</Text>
                <Text>{paymentDel}</Text>
                <Text>{paymentMainAddr}</Text>
                <Text>{paymentDetailAddr}</Text>
                <Text>{paymentPay}</Text>
                <Text>{paymentSeq}</Text>
                <Text>{paymentZipcode}</Text>
            </TouchableOpacity>
        </View>
    )
}

const renderPurchaseList = () => {

    const renderItem = ({item}:any) => {
        return (
            <Item
                member={item.member}
                paymentCategory={item.paymentCategory}
                paymentCount={item.paymentCount}
                paymentDate={item.paymentDate}
                paymentDel={item.paymentDel}
                paymentMainAddr={item.paymentMainAddr}
                paymentDetailAddr={item.paymentDetailAddr}
                paymentPay={item.paymentPay}
                paymentSeq={item.paymentSeq}
                paymentZipcode={item.paymentZipcode}
            />
        )
    }

    const [data, setData] = useState([]);

    // useEffect(() => {
    //     axios.get("http://192.168.0.13:3000/payment/goodsPurchaseList", {
    //         params: {
    //             paymentSeq: 
    //         }
    //     })
    // })

    return (
        <View>
            <FlatList data={testData} renderItem={renderItem} />
        </View>
    )
}

export default function PurchaseList() {

    const [memberId, setMemberId] = useState('카카오');
    
    axios.get("http://192.168.0.13:3000/payment/goodsPurchaseList", {
            params: {
                memberId: memberId
            }
        })
        .then((res) => {
            console.log(res.data);
            
        })
        .catch((err) => console.log(err));

    return (
        <View>
            <Text>Purchase List Page</Text>
        </View>
    )
}