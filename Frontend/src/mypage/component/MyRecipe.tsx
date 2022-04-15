import React from "react";
import { Image, Text, View } from "react-native";

export default function MyRecipe() {

    const info = ["./foodPicture.jpg", "한식만들기", "gal", "평점", "조회수"]
    

    return(
        <View>
            <Image
                source={require("./foodPicture.jpg")} />
            <Text>{info[1]}</Text>
            <Text>{info[2]}</Text>
            <Text>{info[3]}</Text>

        </View>
    )
}


