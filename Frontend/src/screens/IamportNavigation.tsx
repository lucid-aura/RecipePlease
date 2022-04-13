import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IMPData } from "iamport-react-native";
import React from "react";

export interface CertificationParams {
    params: IMPData.CertificationData;
    tierCode?: string;
  }

export type RootStackParamList = {
    Home: undefined;
    Certification: CertificationParams | undefined;
    CertificationTest: undefined;
    CertificationResult: any;
}

const Stack = createNativeStackNavigator()

const IamportNavigation = () => {

    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="PortHome" component={}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default IamportNavigation