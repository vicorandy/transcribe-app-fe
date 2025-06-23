import {} from "../services/userServices";
import { useMutation, useQueryClient ,useQuery} from '@tanstack/react-query';
import { transcribeAudio,transcribeUploadedAudioLink } from "../services/transcribeServices";

    export  function useTranscribeUploadedAudioLink(){
      return useMutation({
        mutationFn:transcribeUploadedAudioLink
      });
    };


    export  function useTranscribeAudio(){
        return useMutation ({
            mutationFn:transcribeAudio
        })
    }