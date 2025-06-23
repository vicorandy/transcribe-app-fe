import { Box,Flex,Heading, useDisclosure } from "@chakra-ui/react";
import React from "react";
import SidebarWithHeader from "@/componets/layouts/dashboard";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useEffect,useState } from "react";
import { useGetUserNotes } from "@/libs/hooks/noteHooks";
import TranscriptionComponet from "@/componets/transcript/transcription";
import { IoMdArrowRoundBack } from "react-icons/io";
import LoadingSpinner from "@/componets/loadingSpinner";
import { IoIosArrowBack } from "react-icons/io";
import toast from "react-hot-toast";
import UpdateNoteModal from "@/componets/notes/updateNotes";
import { useRouter } from "next/router";

interface Transcribe {
    id: string;
    assemblyAiId: string | null;
    transcript: string;
    transcriptionSummary: string;
    objective: string;
    clientInstruction: string;
    assementAndPlan: string;
    createdAt: string;
    updatedAt: string;
  }
  
  interface Note {
    id: string;
    name: string;
    notePreferences: Record<string, any> | null;
    audioFilePath: string;
    participant: string;
    date: string;
    userId: string;
    transcribeId: string;
    createdAt: string;
    updatedAt: string;
    transcribe?: Transcribe;
  }

const Notes = function () {
   const {isError,isLoading,error,data} = useGetUserNotes()
   const [showLoadingSpinner,setShowLoadingSpinner] = useState<boolean>(false)
   const [notes,setNotes] = useState<Note[]>([])
   const [selectedNote,setSelectedNote] = useState<Note>()
   const [noteToBeEdited,setNoteToBeEdited] = useState<Note | null>()
   const {isOpen,onOpen,onClose} = useDisclosure()
   const router = useRouter()

   function editNoteHandler(note:Note){
     onOpen()
     setNoteToBeEdited(note)

     
   }

  function goBack(){
      router.reload()
  }

   useEffect(()=>{
     if(isError)toast.error(error)
     if(isLoading)setShowLoadingSpinner(true)
     
     if(data){
       console.log({data})
       setNotes(data.notes)

     }
    
   },[data,isLoading])

   return (
    <SidebarWithHeader>
    <Box>
 

        {/* notes component */}        
        {
         !selectedNote &&
         <Box >
            <Heading mb={'2rem'}>Notes</Heading>
            <Box p={'0.5rem'} border={'0.6px solid rgba(10, 10, 10, 0.40)'} borderRadius={'8px'}>
            {/* header */}
            <Flex fontWeight={'bold'} w={'100%'} p={'0.7rem 0'} borderBottom={' 0.6px solid rgba(10, 10, 10, 0.40)'}>
            <Box  w={{lg:'30%',md:'40%',sm:'40%',base:'40%'}}>Note Name</Box>
            <Box  w={{lg:'30%',md:'40%',sm:'40%',base:'40%'}}>Participant</Box>
            <Box  w={'30%'} display={{lg:'block',md:'none',sm:'none',base:'none'}} >Date</Box>
            <Box  w={{lg:'10%',md:'20%',sm:'20%',base:'20%'}}>Action</Box>
            </Flex>
            {/* body */}

            {
            notes?.map((note,index)=>{
                return (
                    <Flex onClick={()=>setSelectedNote(note)} key={index} alignItems={'center'} w={'100%'} p={'0.7rem 0'} borderBottom={' 0.6px solid rgba(10, 10, 10, 0.40)'}>
                    <Box  w={{lg:'30%',md:'40%',sm:'40%',base:'40%'}} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{note.name ? note.name :'N/A'}</Box>
                    <Box  w={{lg:'30%',md:'40%',sm:'40%',base:'40%'}} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{note.participant? note.participant : 'N/A'}</Box>
                    <Box  w={'30%'}  display={{lg:'block',md:'none',sm:'none',base:'none'}} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >{note.date}</Box>
                    <Box  w={{lg:'10%',md:'20%',sm:'20%',base:'20%'}}>
                    <Menu>
                    <MenuButton as={Button} onClick={(e)=>e.stopPropagation()}>
                        <BsThreeDots />
                    </MenuButton>
                    <MenuList onClick={(e)=>e.stopPropagation()} >
                        <MenuItem   _hover={{ bg: 'green.500', color: 'white' }} transition="background-color 0.3s ease" onClick={()=>setSelectedNote(note)}>Open</MenuItem>
                        {/* <MenuItem   _hover={{ bg: 'green.500', color: 'white' }} transition="background-color 0.3s ease" onClick={()=>editNoteHandler(note)}>Edit</MenuItem> */}
                        <MenuItem   _hover={{ bg: 'red.500', color: 'white' }} transition="background-color 0.3s ease">Delete</MenuItem>
                        
                        {/* <MenuItem>Logout</MenuItem> */}
                        
                    </MenuList>
                   </Menu>
                    </Box>
                   
                </Flex>
                )
            })
            }
    
        
            {/* body */}
            
            </Box>
        </Box>
        }

        {/* notes component */}

        {/*transcription component  */}
        {
        selectedNote 
        &&  
        <Box>
        <IoIosArrowBack fontSize={'3rem'} onClick={goBack}/>  
        {/* <Button bg={'#0A0A0A'} color={'white'} _hover={{bg:'#0A0A0A'}}>Go Back</Button> */}
        <TranscriptionComponet
        name={selectedNote?.name}
        noteId={selectedNote.id}
        participant={selectedNote?.participant}
        transcript={selectedNote.transcribe?.transcript}
        transcriptionSummary={selectedNote.transcribe?.transcriptionSummary}
        objective={selectedNote.transcribe?.objective}
        clientInstruction={selectedNote.transcribe?.clientInstruction}
        assementAndPlan={selectedNote.transcribe?.assementAndPlan}  
        />
        </Box>
        }
    </Box>
    <UpdateNoteModal isOpen={isOpen} onClose={onClose} note={noteToBeEdited} />
    </SidebarWithHeader>
   )


}

export default Notes