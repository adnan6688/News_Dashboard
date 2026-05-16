import axiosInstance from "../BaseUrl/baseurl"
import { getErrorMessage } from "../Utils/errorMessage"







export const breakingNewsApi = async () => {


    try {

        const news = await axiosInstance.get('news/breaking-news')

        console.log(news.data.data.allNews)
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
