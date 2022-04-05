import axios from "axios";
import { address } from "../../project.config";
import { MyFavoriteRecipeProps } from "./myFavorite";


export const getMyFavoriteRecipeDatas = (memberId:string):Promise<MyFavoriteRecipeProps> => new Promise((resolve, reject) => {
    console.log('getMyFavoriteRecipeDatas')
    axios.get(address+"myFavoriteRecipe", { params: { memberId: memberId } })
            .then((response) => {
                const datas = response.data
                resolve(datas)
                console.log(datas)
            })
            .catch((err:Error) => {
                console.log(err)
            })
            .catch(reject)

})