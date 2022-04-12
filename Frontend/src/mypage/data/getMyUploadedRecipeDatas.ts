import axios from "axios"
import { address } from "../../project.config"
import { myUploadedRecipeProps } from "./myUploadedRecipeProps"


export const getMyUploadedRecipeDatas = (memberId:string):Promise<myUploadedRecipeProps[]> => new Promise((resolve, reject) => {
    console.log('getMyFavoriteRecipeDatas')
    axios.get(address+"myUploadedRecipe", { params: { memberId: memberId } })
            .then((response) => {
                resolve(response.data)
                console.log(response.data)
            })
            .catch((err:Error) => {
                console.log(err)
            })
            .catch(reject)

})