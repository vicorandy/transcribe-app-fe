import axios, { AxiosError } from "axios";
import { getUserToken } from "../utilities";


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export async function createNewUser(data:any){
    try {
        const response  = await axios.post(`${backendUrl}/users/signup`,data)
        return response.data
        
    } catch (error) {
        console.error(error)
        if(error instanceof AxiosError){
                        throw new Error(error.response?.data?.message || 'An unexpected error occurred')
                    }
                    throw new Error('An unexpected error occurred') 
    }
}
export async function loginUser(data:any){
    try {
        const response  = await axios.post(`${backendUrl}/users/signin`,data)
        return response.data
        
    } catch (error) {
        console.error(error)
        if(error instanceof AxiosError){
                        throw new Error(error.response?.data?.message || 'An unexpected error occurred')
                    }
                    throw new Error('An unexpected error occurred') 
    }
}

export async function getUserInfo (){
    const token = getUserToken()
    if(!token) return
    try {
        const response = await axios.get(`${backendUrl}/users/get-user-info`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response?.data
        
    } catch (error) {
        console.error(error)
        if(error instanceof AxiosError){
                     throw new Error(error.response?.data?.message || 'An unexpected error occurred')
            }
                    throw new Error('An unexpected error occurred')
    }
}