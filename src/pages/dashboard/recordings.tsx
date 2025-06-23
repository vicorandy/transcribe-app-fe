import { Box,Flex,Text} from "@chakra-ui/react";
import React, { use } from "react";
import SidebarWithHeader from "@/componets/layouts/dashboard";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { useGetUserAudio } from "@/libs/hooks/noteHooks";
import { useState,useEffect } from "react";
import AudioModal from "@/componets/notes/audioModal";
import { useGetUserInfo } from "@/libs/hooks/userHooks";
import SubscriptionModal from "@/componets/subscription/subscriptionModal";
interface Audio {
  audioFilePath: string;       
  audioUrl: string;           
  createdAt: string;           
  date: string;                
  id: string;                 
  name: string;                
  notePreferences: string | null; 
  participant: string;         
  transcribeId: string;        
  updatedAt: string;         
  userId: string;              
}

interface Subscription { 
  plan:string
  subscription:string
}


const Recordings = function () {
  const {isError,isLoading,data} = useGetUserAudio()
  const {isError:userError,data:userData} = useGetUserInfo()
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(true);
  const [selectedAudio, setSelectedAudio] = useState<{ audioUrl: string }>({audioUrl:'',});
  const [audios, setAudios] = useState<Audio[]>();
  const [subscription,setSubscription] = useState<Subscription>()

  const handleOpenModal = (audioUrl: string) => {
    if(!audioUrl) return
    setSelectedAudio({ audioUrl });
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

useEffect(()=>{
  setAudios(data?.audios)
},[data])

useEffect(()=>{
 setSubscription(userData?.subscription)
 console.log({userData})
},[userData])


   return (
    <SidebarWithHeader>   
  

        <Box >
              <AudioModal isOpen={isOpen} onClose={handleCloseModal} selectedAudio={selectedAudio} />
              <Box>
                  <Box p={'0.5rem'} border={'0.6px solid rgba(10, 10, 10, 0.40)'} borderRadius={'8px'}>
                  {/* header */}
                      <Flex fontWeight={'bold'} w={'100%'} p={'0.7rem 0'} borderBottom={' 0.6px solid rgba(10, 10, 10, 0.40)'}>
                      <Box  w={{lg:'30%',md:'40%',sm:'40%',base:'40%'}}>Audio Name</Box>
                      <Box  w={{lg:'30%',md:'40%',sm:'40%',base:'40%'}}>Participant</Box>
                      <Box  w={'30%'} display={{lg:'block',md:'none',sm:'none',base:'none'}} >Date</Box>
                      <Box  w={{lg:'10%',md:'20%',sm:'20%',base:'20%'}}>Action</Box>
                      </Flex>
                  {/* body */}
                  { audios &&
                  
                      audios?.map((audio,index)=>{
                          return (
                              <Flex onClick={()=>handleOpenModal(audio?.audioUrl) } key={index} alignItems={'center'} w={'100%'} p={'0.7rem 0'} borderBottom={' 0.6px solid rgba(10, 10, 10, 0.40)'}>
                              <Box  w={{lg:'30%',md:'40%',sm:'40%',base:'40%'}} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{audio.name ? audio.name :'N/A'}</Box>
                              <Box  w={{lg:'30%',md:'40%',sm:'40%',base:'40%'}} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{audio.participant? audio.participant : 'N/A'}</Box>
                              <Box  w={'30%'}  display={{lg:'block',md:'none',sm:'none',base:'none'}} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >{audio.date}</Box>
                              <Box  w={{lg:'10%',md:'20%',sm:'20%',base:'20%'}}>
                              <Menu>
                              <MenuButton as={Button} onClick={(e)=>e.stopPropagation()}>
                                  <BsThreeDots />
                              </MenuButton>
                              <MenuList onClick={(e)=>e.stopPropagation()} >
                                  <MenuItem   _hover={{ bg: 'green.500', color: 'white' }} transition="background-color 0.3s ease" onClick={()=>setSelectedAudio(audio)}>Open</MenuItem>
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
        </Box>

   
        <Box display={subscription?.plan !== 'pro' ? 'block' : 'none' }>
          <SubscriptionModal isOpen={isSubOpen} plan={subscription?.plan} upgradeTo={['pro']} />
        </Box>

    </SidebarWithHeader>
   )


}

export default Recordings