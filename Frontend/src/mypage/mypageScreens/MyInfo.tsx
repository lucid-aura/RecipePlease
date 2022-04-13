import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import * as L from "../../store/login"
import MyInfoItem from "../component/MyInfoItem";

export default function MyInfo() {

    const navigation = useNavigation()
    const log = useSelector<AppState, L.State>((state) => state.login)
    
    const {loggedIn, loggedUser} = log


    return (
        <MyInfoItem loggedUser={loggedUser} />
    )
}