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