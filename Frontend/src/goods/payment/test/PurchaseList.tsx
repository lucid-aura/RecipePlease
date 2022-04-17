import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, 
    FlatList, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View } 
from "react-native";
import { resolvePath } from "react-native-reanimated/src/reanimated2/animation/styleAnimation";
import { useSelector } from "react-redux";
import config from  "../../../project.config"
import { AppState } from "../../../store";
import * as L from "../../../store/login"

// 구매리스트
export default function PurchaseList({user}:any, props:any) {

    // 1. 로그인 데이터 가져오기(이전 페이지[TestPage.tsx]에서 props로 넘겨서 받아오는 방법)
    console.log(`memberId는 ${user}`);
    const [userId, setUserId] = useState(user);
    const [completed, setCompleted] = useState(false);
    const log = useSelector<AppState, L.State>((state) => state.login)
    const {loggedIn, loggedUser} = log

    /* 2. 로그인 데이터 가져오기(AsyncStorage에 저장된 로그인 세션 정보를 가져오는 방법)
    const getLoginData = async () => {
        
        let loginData = await AsyncStorage.getItem("loginData");
        try {
            if (loginData !== null) {
                const parseData = JSON.parse(loginData);
                setUserId(parseData.userId);
            }
        } catch (err) {
            console.log(err);
        }
    }

    getLoginData();
    */

    const Item = ({userId, count, name, amount, del, paymentSeq, paymentDate, props, confirm}:any) => {

        const [detailVisible, setDetailVisible] = useState(false);
    
        // 각 아이템 클릭시
        function itemClick(paymentSeq:number) {
            // console.log('itemClicked');
            axios.get(config.address + "payment/getPurchaseDetail", {
                params: {
                    paymentSeq: paymentSeq
                }
            })
            .then((res) => {
                console.log(res.data);
                console.log(res);
                setDetailVisible(!detailVisible);
            })
            .catch((err) => console.log(err));
        }
    
        // 환불접수를 tab하면 confirm을 true로 바꿔주고 조건문 실행
        const onClickOrderCancel = (confirm:boolean) => {
            
            if (confirm) {
                axios.post(config.address + "payment/returnGoods", null, {
                    params: {
                        memberId: userId,
                        paymentSeq: paymentSeq
                    }
                })
                .then((res) => {
                    console.log(res.data);
                    // 새로고침
                    if (res.data === "환불완료") {
                        Alert.alert("환불 접수 완료", `환불접수가 완료되었습니다. \n 매출 취소까지 최대 7영업일이 소요되며 결제 카드사마다 다소 차이가 있을 수 있습니다. \n 자세한 사항은 카드사에 문의하십시오.`);
    
                    }
                })
                .catch((err) => console.log(err));           
            }
        }

        // 숫자 자리수 구분
        const divideNum = (num:number) => {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
            
        // 구매 목록 리스트 
        return (
            <View>            
                <TouchableOpacity style={styles.itemContainer} onPress={() => itemClick(paymentSeq)}>
                    <View style={styles.rowDirection}>
                        <Text style={styles.buyer}>{userId}</Text>                    
                        {// DB에서 넘어온 구매 취소 여부가 1이면 환불로 보여줌.
                            del === 0 
                                ? <Text>구매완료</Text>
                                : <Text style={{color: '#ff0000'}}>환불처리됨</Text>
                        }
                    </View>
                    <Text>{`구매수량 ${count}개`}</Text>
                    <Text>{`구분: ${name}`}</Text>
                    <Text>{`결제금액: ${divideNum(amount)}원`}</Text>
                    <Text>{paymentSeq}</Text>
                </TouchableOpacity>
    
                
                { // 디테일 아래에 보여주기
                    detailVisible 
                    ? <View style={styles.detailView}>
                        <View style={styles.rowDirection}>
                            <Text>{`${userId}님의 구매이력`}</Text>
    
                            
                            { // 백엔드로부터 넘어온 paymentDel(구매 취소여부 체커)이 0이면 구매완료 상태이므로 환불접수 버튼을 보여줌.  
                                del === 0
                                    ? <TouchableOpacity style={styles.refundBtn}
                                        onPress={() => {
                                            Alert.alert("환불접수", "환불을 접수하시겠습니까?", [
                                                {text: "예", onPress: () => {
                                                    confirm = true;
                                                    console.log(`confirm: ${confirm}`);
                                                    onClickOrderCancel(confirm);
                                                    setCompleted(true)
                                                }},
                                                {text: "아니오"}
                                            ]);
                                        }}
                                    >
                                        <Text style={{color: '#fff'}}>환불접수</Text>
                                    </TouchableOpacity>
                                    
                                    : <Text />
                            }
                            
                        </View>
                            <Text>{`구분: ${name}`}</Text>
                            <Text>{`구매일: ${paymentDate}`}</Text>
                            <Text>{`결제금액: ${divideNum(amount)}원`}</Text>
                    </View>
                    : <View style={{display: 'none'}}></View>
                }
            </View>
        )
    } 

    const [data, setData] = useState([]);     // 불러온 JSON 형태의 데이터 보관
    
    useEffect(() => {        
        //Alert.alert("useEffect start", "useEffect 실행")
        const fetchData = async () => {
            await axios.get(
                config.address + "payment/goodsPurchaseList", 
                { params: { memberId: userId }
            })
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((err) => console.log(err));
        }

        fetchData();

        return () => {
            setCompleted(false)
            // Alert.alert("useEffect", "useEffect 실행")
        }
        
    }, [completed]);

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
        <View style={styles.scrView}>
            <Text style={styles.titleText}>상품 구매 이력</Text>
            <FlatList data={data} renderItem={renderItem} />
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
        justifyContent: 'space-between',
    },  // 가로로 떨어져서 배치
    detailView: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
    },  // 리스트 탭했을 때 상세 구매 내역 영역
    refundBtn: {
        padding: 3,
        borderRadius: 5,
        backgroundColor: '#bd4646',
    },   // 환불버튼
    titleText: {
        fontSize: 25,
        padding: 10,
        fontWeight: '600'
    },  // 페이지 제목
    scrView: {
        height: 760
    }   // 마지막 리스트가 잘려서 임의로 높이 지정(기기의 세로 길이)
})