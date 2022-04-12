import axios from "axios"
import { address } from "../../project.config"
import { MyUploadedRecipeProps } from "./MyUploadedRecipeProps"

export const getMyUploadedRecipeDatas = (memberId:string):Promise<MyUploadedRecipeProps[]> => new Promise((resolve, reject) => {
    console.log('getMyUploadedRecipeDatas')
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