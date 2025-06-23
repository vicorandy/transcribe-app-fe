import { Box, Flex,Image,Text,Button,Input,FormLabel} from "@chakra-ui/react"
import SidebarWithHeader from "@/componets/layouts/dashboard"
import { useEffect,useState,useRef, use } from "react"
import Soundwave from "@/componets/soundwave";
import Timer,{TimerRef} from "@/componets/soundwave/timer";
import { useTranscribeAudio } from "@/libs/hooks/transcribeHook";
import TranscriptionComponet from "@/componets/transcript/transcription";
import { formatDate } from "@/libs/utilities";
import toast from "react-hot-toast";
import LoadingSpinner from "@/componets/loadingSpinner";
import LiveTranscription from "@/componets/transcript/liveTranscription";
import { useGetUserInfo } from "@/libs/hooks/userHooks";


interface transcriptionDataObject {
  transcript:string,
  transcriptionSummary: string ,
  objective: string ,
  assementAndPlan: string ,
  clientInstruction: string ,
}

interface Subscription { 
  plan:string
  subscription:string
}


export default function Dashboard (){
    const [showLoadingSpinner,setShowLoadingSpinner] = useState <boolean> (false)
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [name,setName] = useState<string>('')
    const [participant,setParticipant] = useState<string>('')
    const [audioUrl, setAudioUrl] = useState<string|null>(null);
    const [mediaStream,setMediaStream] =useState<MediaStream | null>(null)
    const [transcriptionData,setTranscriptionData] = useState<transcriptionDataObject>()
    const [subscription,setSubscription] = useState<Subscription>()
    const [show,setShow] =useState<any>()
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const timerRef = useRef<TimerRef>(null)
    const audioChunksRef = useRef<Blob[]>([]);
    const transcribeAudiomutation = useTranscribeAudio()
    const {data,isLoading} = useGetUserInfo()

    const startRecording = async () => {
        try {

          if(subscription?.subscription !=='active'){
             toast.error('you dont have subscription and your free trial has expired ')
             return
          }
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          setMediaStream(stream)
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
          };
    
          mediaRecorderRef.current.onstop = async () => {
            try{
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const audioFile = new File([audioBlob], 'audio.wav', { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob); 
            const date = new Date()
            const currentDate = formatDate(date)
            console.log({currentDate})
            const formData = new FormData();
            formData.append('file', audioFile);   
            formData.append('date', currentDate)
            formData.append('name', name)
            formData.append('participant',participant)
            setShowLoadingSpinner(true)
            const response = await transcribeAudiomutation.mutateAsync(formData)
            setTranscriptionData(response.transcribe)
            setAudioUrl(audioUrl);
            }catch(err:any){
              toast.error(err.message) 
            }finally{
              setShowLoadingSpinner(false)
            }
          };
          
          mediaRecorderRef.current.start();
          setIsRecording(true);

        } catch (err:any) {
          console.log({err})
          console.error('Error accessing audio device', err);
          toast.error(err.message)
        }finally{
          setShowLoadingSpinner(false)
        }

      };

      // Pause recording
      const pauseRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
           mediaRecorderRef.current.pause();
           setIsPaused(true);  // Optional: Update UI to reflect paused state
        }
      };

  // Resume recording
  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);  // Optional: Update UI to reflect resumed state
    }
  };
  
  // Stop recording
    const stopRecording = () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current = null; // Clean up
      }
      setIsRecording(false);
    };


    // Cancel recodring
    const cancelRecording = () => {
      setAudioUrl(null)
      setIsPaused(false)
      setIsRecording(false)
      if(timerRef?.current) {
        timerRef?.current?.resetTimer()
      }
      mediaRecorderRef.current = null;

    }

    useEffect(()=>{
      setSubscription(data?.subscription)
    },[data])

    return (
       <SidebarWithHeader>
             
          { !transcriptionData && <Flex flexDir={{lg:'row',md:'row',sm:'column',base:'column'}} gap={'2rem'} justifyContent={'space-between'} >
              <Box width={{lg:'30%'}}>
                  <FormLabel htmlFor="email">Note Name</FormLabel>
                  <Input  focusBorderColor="#FAC515" onChange={(e)=> setName(e.target.value)} id="name" type="text"  p={'2rem 1rem'}  />
              </Box>
              <Box width={{lg:'30%'}}>
                  <FormLabel htmlFor="email"> Participant </FormLabel>
                  <Input  focusBorderColor="#FAC515" onChange={(e)=>setParticipant(e.target.value)} defaultValue={participant || ''} id="participant " type="text"  p={'2rem 1rem'}  />
              </Box>
             </Flex> }
            
             {!transcriptionData &&
             <Box boxShadow={'lg'} p={"1rem 0"}  position="relative" >
              <LoadingSpinner showLoadingSpinner={showLoadingSpinner} />
              <Flex m={{base:'1rem 0'}} p={{lg:'2rem',md:'1rem',sm:'0.5rem',base:'0.1rem'}} flexDir={{lg:'row',md:'row',sm:'column',base:'column'}}>
                    <Box w={'100px'} h={'100px'}>
                    <Image src="Mic.gif"></Image>
                    </Box>
                    <Box ml={{lg:'2rem',md:'1rem',sm:'0',base:'0'}} >
                      <Text  mt={'1rem'} fontSize={'2rem'}>The Mic is yours</Text>
                      <Text display={isRecording? 'none': 'flex'} >Click to start recording your audio</Text>
                      <Text display={isRecording? 'flex': 'none'} >Click on the buttons to pause or stop your recording</Text>

                      <Flex gap={5} display={isRecording?'none':'flex'}>
                        <Button  onClick={startRecording} mt={'3rem'} bg={'#101828'} borderRadius={'12px'} w={'fit-content'}color={'white'} >Record Now</Button>
                        {/* <Button  onClick={stopRecording} mt={'3rem'} bg={'#101828'} borderRadius={'12px'} w={'fit-content'}color={'white'} >Upload</Button> */}
                      </Flex> 

                      <Flex gap={{lg:5,md:2,sm:10,base:10}} display={isRecording?'flex':'none'}>
                        
                      <Button p={'1rem 2rem'} display={isPaused ? 'none' : 'flex'} onClick={pauseRecording} mt={'3rem'} bg={'#101828'} borderRadius={'12px'} w={'fit-content'}color={'white'} >Pause</Button>
                      <Button p={'1rem 2rem'} display={isPaused ? 'flex' : 'none'} onClick={resumeRecording} mt={'3rem'} bg={'#101828'} borderRadius={'12px'} w={'fit-content'}color={'white'} >Resume</Button>
                      <Button p={'1rem 2rem'} onClick={stopRecording} mt={'3rem'} bg={'#101828'} borderRadius={'12px'} w={'fit-content'}color={'white'} >Stop</Button>
                      <Button p={'1rem 2rem'} onClick={cancelRecording} mt={'3rem'} bg={'white'} border={'1px solid #101828'} borderRadius={'12px'} w={'fit-content'} color={'#101828'} >Cancel</Button>
                      </Flex>
                    </Box>
                    
              </Flex>

              
              <Soundwave isPaused={isPaused} isRecording={isRecording}></Soundwave>
              <Timer ref={timerRef} isRecording={isRecording} isPaused={isPaused}></Timer> 
          
              </Box>
              }
              {/* <LiveTranscription stream={mediaStream}></LiveTranscription> */}
             {transcriptionData && <TranscriptionComponet name={name} participant={participant} transcript={transcriptionData?.transcript} transcriptionSummary={transcriptionData?.transcriptionSummary} objective={transcriptionData?.objective} assementAndPlan={transcriptionData?.assementAndPlan} clientInstruction={transcriptionData?.clientInstruction} ></TranscriptionComponet> }

       </SidebarWithHeader>
    )
}