/* eslint-disable @typescript-eslint/no-unused-vars */
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
        console.log(message, 'ttt')
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
    limit?: number,
    page?: number,
    role?: string,
    search?: string
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

    try {
        const res = await axiosInstance.get("user/topUsers");
        return res.data.data || [];
    } catch (err) {
        const message = getErrorMessage(err);
        return message
    }
};


// videos 
export const videosApi = async (limit?: number, page?: number) => {
    const params: IParams = {};

    params.limit = limit ?? 10;
    params.page = page ?? 1;

    try {
        const res = await axiosInstance.get('/video/getvideos', {
            params,
        });

        return {
            totalPage: res?.data?.meta?.totalpage,
            data: res?.data?.data || [],
        };
    } catch (err) {
        const message = getErrorMessage(err);

        throw new Error(message, {
            cause: err,
        });
    }
};

// delete video
export const DeleteVideo = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`/video/delete-video/${id}`);

        return res.data;

    } catch (err) {
        const message = getErrorMessage(err);

        throw new Error(message, {
            cause: err,
        });
    }
};


// add video
export const UploadVideo = async (link: string) => {

    try {
        const res = await axiosInstance.post('/video/upload-video', { videoUrl: link })
        return {
            success: true,
            message: res?.data?.message
        }
    }
    catch (err) {
        const message = getErrorMessage(err)

        return {
            success: false,
            message
        }
    }
}



// admin bannars
export const adminBannarsapi = async (limit?: number, page?: number) => {

    const params: IParams = {}
    if (limit) {
        params.limit = limit
    }
    if (page) {
        params.page = page
    } try {
        const res = await axiosInstance.get('/bannar/adminBannars', {
            params,
        });

        return {
            totalPage: res?.data?.meta?.totalpage,
            data: res?.data?.data || [],
        };
    } catch (err) {
        const message = getErrorMessage(err);

        throw new Error(message, {
            cause: err,
        });
    }


}




// upload bannar

export const uploadBannarapi = async (data: { title: string; link: string; file: File; }) => {
    try {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("link", data.link);
        formData.append("file", data.file);

        const res = await axiosInstance.post("/bannar/bannar-create", formData, {
            headers: { "Content-Type": "multipart/form-data", },
        });
        return res.data;
    } catch (err) {
        const message = getErrorMessage(err)

        throw new Error(message, {
            cause: err,
        });
    }
};




// news
export const getNewsApi = async (limit?: number, page?: number) => {

    const params: IParams = {}
    if (limit) {
        params.limit = limit
    }
    if (page) {
        params.page = page
    } try {
        const res = await axiosInstance.get('/news/admin_all_news', {
            params,
        });

        return {
            data: res?.data?.data || {},
        };
    } catch (err) {
        const message = getErrorMessage(err);

        throw new Error(message, {
            cause: err,
        });
    }


}



type Author = {
    name: string;
    image: string;
};

export type NewsItem = {
    _id: string;
    id: number;
    title: string;
    description: string;
    image: string;
    category: string[];
    categorySlugs: string[];
    author: Author;
    link: string;
    clicks: number;
    impressions: number;
    ctr: number;
    views?: number;
    isBreaking: boolean;
};



// delete bannar
export const deleteBannarApi = async (id: string) => {
    try {
        const res = await axiosInstance.delete(`/bannar/delete-bannar/${id}`);

        return {
            success: true,
            message: res?.data?.message || "Banner deleted successfully",
            data: res?.data?.data,
        };
    } catch (err) {
        return {
            success: false,
            message: "Failed to delete banner",
        };
    }
};




// all users
export const getAllUsersApi = async (limit?: number, page?: number, role?: string, search?: string) => {

    const params: IParams = {}
    if (limit) {
        params.limit = limit
    }
    if (page) {
        params.page = page
    }
    if (role !== 'All') {
        params.role = role
    }
    if (search) {
        params.search = search
    }

    try {
        const result = await axiosInstance.get('/user/get-all-users', { params })

        return {
            data: result?.data?.data?.data || [],
            meta: {
                totalpage: result?.data?.data?.totalpage,
                totalUsers: result?.data?.data?.totalUsers,
                page: result?.data?.data?.page
            }
        }
    } catch (err) {
        return {
            success: false,
            message: "Failed to get all users",
        };
    }

}


export type TUser = {
    _id: string;
    name: string;
    email: string;
    role: "USER" | "GUEST" | "ADMIN";
    isDelete: boolean;
    birth_date: string;
    image: string;

    clicks: number;
    impressions: number;
    total: number;

    installCount: number;
    uninstallCount: number;
};



export const logoutUserapi = async () => {

    try {
        await axiosInstance.post(`/user/logout`)
        return {
            success: true,
            message: "Logout successfully!"
        }

    }
    catch (err) {
        return {
            success: false,
            message: "Failed to delete banner",
        };
    }
}



export const updateUserapi = async (payload: { name: string, birth_date: string, image: File }) => {
    try {
        const formData = new FormData();

        // append normal fields
        formData.append("name", payload.name);

        formData.append("birth_date", payload.birth_date);


        // handle image (IMPORTANT)
        if (payload.image instanceof File) {
            formData.append("file", payload.image);
        }

        const res = await axiosInstance.patch(
            "/user/updateinformation",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log(res, "response");

        return {
            success: true,
            message: "updated",
        };
    } catch (err) {
        return {
            success: false,
            message: "Not update",
        };
    }
};


export const changePassword = async ({ currentPassword, newPassword, confirmPassword }: { currentPassword: string, newPassword: string, confirmPassword: string }) => {

    try {

        const result = await axiosInstance.post(`/password/changePassword`, { currentPassword, newPassword, confirmPassword })

        return {
            success: true,
            message: result?.data?.message
        }
    } catch (err) {
        const message = getErrorMessage(err);

        throw new Error(message, {
            cause: err,
        });
    }

}


export const sendEmail = async (email: string) => {

    const res = await axiosInstance.post('/password/forgetPassword', { email })
    return res?.data
}

export const verifyOTp = async (email: string, otp: string) => {

    const result = await axiosInstance.post(`/password/verify-password`, { email, otp })
    return result?.data
}

export const updatepasswordapi = async (email: string, password: string) => {
    const res = await axiosInstance.post('/password/reset-password', { email, password })
    return res?.data
}




export const sendNotifications = async (payload: { title: string, headline: string, link: string, file: File }) => {
    try {
        //
        const result = await axiosInstance.post('notification/sendnotifiication', payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return {
            success: true,
            message: result?.data?.message
        }
    } catch (err) {
        const message = getErrorMessage(err)
        return {
            success: false,
            message: message
        }
    }
}



export const getAllNotifications = async (page?: number, search?: string, limit?: number) => {


    const params: IParams = {}
    if (limit) {
        params.limit = limit
    }
    if (page) {
        params.page = page
    }
    if (search) {
        params.search = search
    }

    try {
        const result = await axiosInstance.get('notification/all-notifications', { params })



        return {
            data: result?.data?.data,
            meta: result?.data?.meta
        }

    } catch (err) {
        const message = getErrorMessage(err)
        return {
            success: false,
            message
        }
    }
}



export const deleteNotifications = async (id: string) => {

    try {
        const result = await axiosInstance.delete(`notification/deleteNotifications/${id}`)

        console.log(result)
        return {
            success: true,
            message: 'Notification remove'
        }

    } catch (err) {
        const message = getErrorMessage(err)
        return {
            success: false,
            message
        }
    }
}


export const admobsSetup = async () => {


    try {
        await axiosInstance.post(`admobs/update-admobs`)

        return true
    }
    catch (err) {
        const message = getErrorMessage(err)

        return {
            success: false,
            message
        }
    }
}