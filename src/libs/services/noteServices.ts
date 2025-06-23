import axios, { AxiosError } from "axios";


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
import { getUserToken } from "../utilities";


export async function getUserNotes (){
    const token = getUserToken()
    if(!token) return
    try {
        console.log(`${backendUrl}/notes/get-notes`)
        const response = await axios.get(`${backendUrl}/notes/get-notes`,{
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

export async function getUserAudio (){
    console.log('getting audio')
    const token = getUserToken()
    if(!token) return
    try {
        console.log(`${backendUrl}/notes/get-audio`)
        const response = await axios.get(`${backendUrl}/notes/get-audio`,{
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

export async function editNote (data:any){
    const token = getUserToken()
    if(!token) return
    try {
        console.log(`${backendUrl}/notes/get-notes`)
        const response = await axios.post(`${backendUrl}/notes/edit-note/${data.id}`,data,{
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

