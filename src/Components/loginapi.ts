
import axiosInstance from "../BaseUrl/baseurl"
import { getErrorMessage } from "../Utils/errorMessage"


type ILogin = {
    email: string,
    password: string
}


export const loginFn = async (loginInfo: ILogin) => {
    try {
        const result = await axiosInstance.post(
            "user/login",
            loginInfo
        );

        return {
            success: true,
            data: result.data,
        };
    } catch (err) {
        const message = getErrorMessage(err);

        return {
            success: false,
            message,
        };
    }
};



export const getMe = async () => {

    try {
        //
        const result = await axiosInstance.get('user/getMe')
        return {
            success: true,
            user: result.data.data
        }
    }
    catch (err) {
        const message = getErrorMessage(err);
        return {
            success: false,
            message,
        };
    }

}