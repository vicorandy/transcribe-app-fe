import axios, { AxiosError } from "axios";


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
import { getUserToken } from "../utilities";


export async function transcribeAudio (data:any){
    console.log(data)
    const token = getUserToken()
    if(!token) return
    try {
        const response = await axios.post(`${backendUrl}/transcribe/transcribe-audio`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response?.data
        
    } catch (error) {
        if(error instanceof AxiosError){
            console.log('running')
                     throw new Error(error.response?.data?.message || 'An unexpected error occurred')
            }
                    throw new Error('An unexpected error occurred')
    }
}
export async function transcribeUploadedAudioLink (data:any){
    console.log(data)
    const token = getUserToken()
    if(!token) return
    try {
        const response = await axios.post(`${backendUrl}/transcribe/transcribe-uploaded-audio-link`,data,{
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

