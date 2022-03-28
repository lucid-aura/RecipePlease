import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Alert, 
    FlatList, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View } 
from "react-native";

/* 테스트 페이지 : 구매 목록 리스트 */

/* 이슈 체크
    - 현재 사용자 아이디를 제대로 불러오지 못하는 문제가 있음.
    - 코드 화면 저장 시 리스트를 제대로 로드함.
*/


// 플랫 리스트 안에 들어갈 아이템 컴포넌트
const Item = ({userId, count, name, amount, del, 
    paymentSeq, paymentDate, props, confirm}:any) => {

    const [detailVisible, setDetailVisibla] = useState(false);

    // 각 아이템 클릭시
    function itemClick(paymentSeq:number) {
        console.log('itemClicked');
        axios.get("http://192.168.0.13:3000/payment/getPurchaseDetail", {
            params: {
                paymentSeq: paymentSeq
            }
        })
        .then((res) => {
            console.log(res.data);
            setDetailVisibla(!detailVisible);
        })
        .catch((err) => console.log(err));
    }

    // 환불접수를 tab하면 confirm을 true로 바꿔주고 조건문 실행
    const onClickOrderCancel = (confirm:boolean) => {
        
        if (confirm) {

            const orderCancelHandler = async () => {
                await axios.post("http://192.168.0.13:3000/payment/returnGoods", null, {
                    params: {
                        memberId: userId,
                        paymentSeq: paymentSeq
                    }
                })
                .then((res) => {
                    console.log(res.data);
                    // 환불 요청 성공시 새로고침 작성
                })
                .catch((err) => console.log(err));
            }

            orderCancelHandler();
        }

    }

    return (
        <ScrollView>

            {/* 구매 목록 리스트 */}
            <TouchableOpacity style={styles.itemContainer} onPress={() => itemClick(paymentSeq)}>
                <View style={styles.rowDirection}>
                    <Text style={styles.buyer}>{userId}</Text>
                    {/* DB에서 넘어온 구매 취소 여부가 1이면 환불로 보여줌. */}
                    { del === 0 
                        ? <Text>구매완료</Text>
                        : <Text style={{color: '#ff0000'}}>환불처리됨</Text> 
                    }
                </View>
                <Text>{`구매수량 ${count}개`}</Text>
                <Text>{`구분: ${name}`}</Text>
                <Text>{`결제금액 ${amount.toLocaleString('ko-KR')}원`}</Text>
                <Text>{paymentSeq}</Text>
            </TouchableOpacity>

            {/* 디테일 아래에 보여주기 */}
            { detailVisible 
                ? <View style={styles.detailView}>
                    <View style={styles.rowDirection}>
                        <Text>{`${userId}님의 구매이력`}</Text>

                        {/* 백엔드로부터 넘어온 paymentDel(구매 취소여부 체커)이 0이면 구매완료 상태이므로 환불접수 버튼을 보여줌.  */}
                        { del === 0
                            ? <TouchableOpacity style={styles.refundBtn}
                                onPress={() => {
                                    Alert.alert("환불접수", "환불을 접수하시겠습니까?", [
                                        {text: "예", onPress: () => {
                                            confirm = true;
                                            console.log(`confirm: ${confirm}`);
                                            onClickOrderCancel(confirm);
                                        }},
                                        {text: "아니오"}
                                    ])
                                }}
                              >
                                <Text style={{color: '#fff'}}>환불접수</Text>
                              </TouchableOpacity>
                            : <Text />
                        }
                        
                    </View>
                        <Text>{`구분: ${name}`}</Text>
                        <Text>{`구매일: ${paymentDate}`}</Text>
                        <Text>{`결제금액 ${amount.toLocaleString('ko-KR')}원`}</Text>
                  </View>
                : <View style={{display: 'none'}}></View>
            }
        </ScrollView>
    )
}


// 구매리스트
export default function PurchaseList(props:any) {

    // 로그인 데이터(백엔드단에서 로그인된 아이디에 맞게 구매 이력를 조회하기 위해 로그인 세션 정보를 가져옴.)
    const [userId, setUserId] = useState('');

    // useEffect를 사용할 경우 로그인 데이터가 불러와지지 않음.
    // useEffect(() => {
    const getLoginData = async () => {
        console.log('aaaaaaaaaaaa');
        let loginData = await AsyncStorage.getItem("loginData");
        
        try {
            if (loginData !== null) {
                let data = JSON.parse(loginData);
                setUserId(data.memberId);
                console.log("로그인 데이터 userId: " + data.memberId);
            } else {
                console.log("login data가 없음");
            }
        } catch (err) {
            console.log(err);
        }

        // getLoginData();
    }
    // }}, [])

    getLoginData();

    // 구매 리스트를 불러오는 요청
    const [data, setData] = useState([]);       // 불러온 JSON 데이터 보관
    
    useEffect(() => {
        console.log("구매 리스트 데이터 userId: " + userId);
        const getGoodsPurchaseList = async() => {
            await axios.get("http://192.168.0.13:3000/payment/goodsPurchaseList", {
                params: {
                    memberId: userId
                }
            })
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((err) => console.log(err));
        }

        getGoodsPurchaseList();
    }, []);
    

    // 리스트로 렌더링할 아이템
    const renderItem = ({item}:any) => {

        return(
            <Item
                userId={item.memberId}
                count={item.paymentCount}
                name={item.paymentCategory}
                amount={item.paymentPay}
                del={item.paymentDel}
                paymentSeq={item.paymentSeq}
                paymentDate={item.paymentDate}
                props={props}
                confirm={false}
            />
        )
    }

    return (
        <View>
            <FlatList data={data} renderItem={renderItem}></FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5
    },  // 구매목록 리스트 스타일
    buyer: {
        fontSize: 17,
        fontWeight: '700'
    },  // 구매자 이름을 크게 보이게 하기
    rowDirection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  // 가로로 떨어져서 배치
    detailView: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
    },  // 리스트 탭했을 때 상세 구매 내역 영역
    refundBtn: {
        padding: 3,
        borderRadius: 5,
        backgroundColor: '#bd4646'
    }   // 환불버튼
})