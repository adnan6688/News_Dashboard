
import axiosInstance from "../BaseUrl/baseurl"
import { getErrorMessage } from "../Utils/errorMessage"


type ILogin = {
    email: string,
    password: string
}



export const loginFn = async (loginInfo: ILogin) => {

    try {
        const result = await axiosInstance.post('user/login', loginInfo)
        return result.data
    } catch (err) {
        const message = getErrorMessage(err)
        console.log(message)
    }
    return true

}