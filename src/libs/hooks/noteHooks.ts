import {} from "../services/userServices";
import { useMutation, useQueryClient ,useQuery} from '@tanstack/react-query';

import { getUserNotes,editNote,getUserAudio } from "../services/noteServices";


export function useGetUserNotes(){
      return useQuery({
        queryFn:()=>getUserNotes(),
        queryKey:["get-user-notes"],
     
      })
}

export function useGetUserAudio(){
  return useQuery({
    queryFn:()=>getUserAudio(),
    queryKey:['get-user-audio']
  })
}

export function useEditNote(){
  return useMutation({
    mutationFn:editNote,
  })
}