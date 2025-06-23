import {} from "../services/userServices";
import { useMutation, useQueryClient ,useQuery} from '@tanstack/react-query';

import { createNewUser, loginUser, getUserInfo } from "../services/userServices";

export function useCreateNewUser (){
    return useMutation({
        mutationFn:createNewUser
    })
}
export function useLoginUser (){
    return useMutation({
        mutationFn:loginUser
    })
}
    
export function useGetUserInfo(){
    return useQuery({
    queryFn:()=>getUserInfo(),
    queryKey:["get-user-info"]
    })
}

