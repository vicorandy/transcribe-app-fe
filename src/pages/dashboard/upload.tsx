import { Box, Button, Input, Flex,Text, VStack, Icon } from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';
import { useState,useEffect } from 'react';
import SidebarWithHeader from '@/componets/layouts/dashboard';
import { formatDate } from '@/libs/utilities';
import LoadingSpinner from '@/componets/loadingSpinner';
import { useTranscribeUploadedAudioLink } from '@/libs/hooks/transcribeHook';
import TranscriptionComponet from '@/componets/transcript/transcription';
import toast from 'react-hot-toast';
import { IoIosArrowBack } from "react-icons/io";
import SubscriptionModal from '@/componets/subscription/subscriptionModal';
import { useGetUserInfo } from '@/libs/hooks/userHooks';

interface transcriptionDataObject {
    transcript:string,
    transcriptionSummary: string ,
    objective: string ,
    assementAndPlan: string ,
    clientInstruction: string ,
  }


const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');
  const [id,setId] = useState<string>('')
  const [showLoadingSpinner,setShowLoadingSpinner] = useState<boolean>(false)
  const [transcriptionData,setTranscriptionData] = useState<transcriptionDataObject>()
  const transcribeAudiomutation = useTranscribeUploadedAudioLink ()
  const {data,isLoading} = useGetUserInfo()
  const [subscription,setSubscription] =useState<Subscription>()

  interface Subscription { 
    plan:string
    subscription:string
  }


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
   try {
    console.log('running')
    const uploadedFile = event.target.files?.[0] || null;
    setFile(uploadedFile);
    console.log({uploadedFile})
    if(!uploadedFile) return
    const date = new Date()
    const currentDate = formatDate(date)
    console.log({currentDate})
    const formData = new FormData();
    formData.append('file', uploadedFile);   
    formData.append('date', currentDate)
    // formData.append('name', name)
    // formData.append('participant',participant)
    setShowLoadingSpinner(true)
    
    const response = await transcribeAudiomutation.mutateAsync(formData)
    console.log({response})
    setTranscriptionData(response.transcribe)
    setId(response.note.id)

   } catch (error:any) {
    toast.error(error.message)
   }finally{
    setShowLoadingSpinner(false)
   }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

useEffect(()=>{
setSubscription(data?.subscription)
},[data])

  return (
  <SidebarWithHeader>
     <LoadingSpinner showLoadingSpinner={showLoadingSpinner} />
    {!transcriptionData &&
      <Flex flexDir={'column'}>
        <Text fontSize="34px" mb={'1rem'} fontWeight="600">
          Begin Upload!
        </Text>

        <Box boxShadow={'lg'} p={{lg:'1rem 6rem'}}>

        {/* URL Input */}
        <Box>
          <Input
            display={'none'}
            p={'1.5rem 1rem'}
            placeholder="Paste URL here"
            value={url}
            onChange={handleUrlChange}
            focusBorderColor="#FAC515"
          />
          <Text mt={2} color="gray.500" fontSize="sm">
            Only video and audio files are supported
          </Text>
        </Box>

        {/* File Upload Section */}
        <Box
          p={{lg:'4rem 6rem', md:'4rem 6rem' , sm:'4rem 1rem', base:'4rem 1rem'}}
          mt={'1rem'}
          border="2px"
          borderColor="gray.200"
          borderRadius="md"
          textAlign="center"
          bg="rgba(252, 226, 140, 0.15)"
          cursor="pointer"
          _hover={{ bg: '#FAC515' }}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <Icon as={FiUpload} boxSize={'4rem'} color="gray.600" mb={2} />
          <Text>Upload your audio or video files here to get accurate and reliable transcriptions.</Text>
          <Input
           focusBorderColor="#FAC515"
            id="fileInput"
            type="file"
            accept="audio/*,video/*"
            onChange={handleFileChange}
            display="none"
          />
        </Box>

        </Box>
      </Flex>
      }

      {/* transcript component */}
      {transcriptionData &&
        <Box>
        <IoIosArrowBack fontSize={'3rem'} onClick={()=>setTranscriptionData(undefined)}/> 
        <TranscriptionComponet noteId={id}  transcript={transcriptionData?.transcript} transcriptionSummary={transcriptionData?.transcriptionSummary} objective={transcriptionData?.objective} assementAndPlan={transcriptionData?.assementAndPlan} clientInstruction={transcriptionData?.clientInstruction} ></TranscriptionComponet> 
        </Box>
      }

      <Box display={subscription?.plan === 'free'? 'block' : 'none'}>
          <SubscriptionModal isOpen={true} plan={subscription?.plan} upgradeTo={['pro','basic']} />
      </Box>
  </SidebarWithHeader>
    
  );
};

export default UploadPage;
