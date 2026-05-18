import axiosInstance from "../BaseUrl/baseurl"
import { getErrorMessage } from "../Utils/errorMessage"







export const breakingNewsApi = async () => {


    try {

        const news = await axiosInstance.get('news/breaking-news')
        return {
            success: true,
            news: news.data.data.allNews || []
        }

    } catch (err) {

        const message = getErrorMessage(err)
        console.log(message)
        return {
            success: false,
            message
        }
    }
}


export const userInfoCoutnapi = async () => {


    try {
        const res = await axiosInstance.get(`user/getUserInfo/admin`)
        const result = res.data

        return {
            success: true,
            data: result.data
        }
    } catch (err) {
        const message = getErrorMessage(err)

        return {
            success: false,
            message
        }

    }
}



// user analytics 
export const userAnalyticsApi = async (year: number) => {


    try {
        const result = await axiosInstance.get(`user/userAnylitcs?year=${year}`)

        return {
            success: true,
            data: result.data.data || []
        }

    } catch (err) {
        const message = getErrorMessage(err)
        return {
            success: false,
            message
        }
    }
}




// recent five user

export const recentFiveUsersapi = async () => {

    try {

        const result = await axiosInstance.get('user/recentFiveusers/admin')
        return {
            success: true,
            data: result?.data?.data || []
        }
    } catch (err) {
        const message = getErrorMessage(err)
        return {
            success: false,
            message
        }
    }

}








// recent Added video 
export const recentAddedvideoapi = async () => {

    try {
        const res = await axiosInstance.get('video/recentAddedvideo')

        return {
            success: true,
            data: res.data.data || []
        }

    } catch (err) {
        const message = getErrorMessage(err)

        return {
            success: false,
            message
        }
    }
}



// recent bannars

export const recentBannarApi = async () => {

    try {
        const res = await axiosInstance.get('bannar/recenAddedBannar')

        return {
            success: true,
            data: res?.data?.data || []
        }
    } catch (err) {
        const message = getErrorMessage(err)
        return {
            success: false,
            message
        }
    }
}





// ctr 
type IParams = {
    limit?: number
}
export const ctrApi = async (limit: number) => {

    const params: IParams = {}

    if (limit) {
        params.limit = limit
    }

    try {
        const res = await axiosInstance.get('ctr/get-ctr', { params })

        return {
            data: res?.data?.data || []
        }
    }
    catch (err) {
        const message = getErrorMessage(err)
        return {
            message
        }
    }
}






// top users

export const topusersapi = async () => {
    console.log("kire")
    try {
        const res = await axiosInstance.get("user/topUsers");
        return res.data.data || [];
    } catch (err) {
        const message = getErrorMessage(err);
        return message
    }
};