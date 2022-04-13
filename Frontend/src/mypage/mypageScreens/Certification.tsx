import React from "react";
import { SafeAreaView } from "react-native";
import IMP from 'iamport-react-native'
import { useNavigation } from "@react-navigation/native";
import Loading from "../component/Loading";


const Certification = () => {

    const navigation = useNavigation()

    const callback = () => {
        navigation.addListener
    }

    const data = {
        merchant_uid: `mid_${new Date().getTime()}`,
        company: '아임포트',
        carrier: 'SKT',
        name: '홍길동',
        phone: '01012341234',
        min_age: '',
      };

    return(
        <SafeAreaView>
            <IMP.Certification
                userCode={'iamport'}
                tierCode={'aaa'}
                loading={<Loading />}
                data={data}
                callback={(response) => navigation.p}
            />
        </SafeAreaView>
    )
}

export default Certification