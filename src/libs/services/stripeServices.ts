import axios, { AxiosError } from "axios";


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
import { getUserToken } from "../utilities";

export async function createUserSubscription (data:any){
    const token = getUserToken()
    if(!token) return
    try {
        console.log(`${backendUrl}/stripe/subscribe`)
        const response = await axios.post(`${backendUrl}/stripe/subscribe`,data,{
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
export async function upgradeUserSubscription (data:any){
    const token = getUserToken()
    if(!token) return
    try {
      
        const response = await axios.post(`${backendUrl}/stripe/upgrade`,data,{
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

export async function downgradeUserSubscription (data:any){
    const token = getUserToken()
    if(!token) return
    try {
      
        const response = await axios.post(`${backendUrl}/stripe/downgrade`,data,{
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