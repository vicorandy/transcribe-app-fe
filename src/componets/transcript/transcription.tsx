// pages/index.tsx
import React from "react";
import { LuCopy } from "react-icons/lu";
import { useState,useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Textarea,
  useDisclosure,
  VStack,
  Accordion, 
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Input,
  FormLabel 
} from '@chakra-ui/react';
import MagicEdit from './magicEdit';
import { CiEdit } from "react-icons/ci";
import { useEditNote } from "@/libs/hooks/noteHooks";
import toast from "react-hot-toast";
import LoadingSpinner from "../loadingSpinner";
import { useRouter } from "next/router";


interface TranscriptionComponetProps {
  transcript: string | undefined
    transcriptionSummary: string | undefined
    objective: string | undefined
    assementAndPlan: string | undefined
    clientInstruction: string | undefined
    noteId? : string | undefined
    name? :string | undefined
    participant? :string |undefined
}


const TranscriptionComponet: React.FC<TranscriptionComponetProps> = ({transcript,objective,transcriptionSummary, assementAndPlan,clientInstruction,name ,participant,noteId}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPronoun, setSelectedPronoun] = useState('');
  const [nameText,setNameText] =useState<string>('')
  const [participantText,setParticipantText] =useState<string>('')
  const [transcriptionText,setTranscriptionText] =useState('');
  const [transcriptionSummaryText,setTranscriptionSummaryText] =useState('');
  const [objectiveText,setObjectiveText] =useState('');
  const [assementAndPlanText,setAssementAndPlanText] =useState('');
  const [clientInstructionText,setClientInstructionText] =useState('');
  const [showLoadingSpinner,setShowLoadingSpinner] = useState<boolean>(false)
  const mutation = useEditNote()
  const router = useRouter()

  async function updateHandler () {

    try {
      console.log('running')
      setShowLoadingSpinner(true)
      mutation.mutateAsync({id:noteId,name:nameText,participant:participantText,objective:objectiveText,transcriptionSummary:transcriptionSummaryText,transcript:transcriptionText,clientInstruction:clientInstructionText,assementAndPlan:assementAndPlanText})
      toast.success('Note was successfully updated ')
    } catch (error:any) {
      toast.error(error.message)
    }finally{
      setShowLoadingSpinner(false)
    }
  }
  
  

  return (
    <Box>
      <LoadingSpinner showLoadingSpinner={showLoadingSpinner}/>
     <Flex flexDir={{lg:'row',md:'column',sm:'column',base:'column'}} gap={'2rem'} justifyContent={'space-between'} >
      <Box width={{lg:'30%'}}>
          <FormLabel htmlFor="email">Note Name</FormLabel>
          <Input  focusBorderColor="#FAC515" fontWeight={'700'} fontSize={'1.5rem'} onChange={(e)=>setNameText(e.target.value)} defaultValue={name || ''} id="name" type="text"  p={'2rem 1rem'}  />
      </Box>
      <Box width={{lg:'30%'}}>
          <FormLabel htmlFor="email"> Participant </FormLabel>
          <Input   focusBorderColor="#FAC515" fontWeight={'700'} fontSize={'1.5rem'} onChange={(e)=>setParticipantText(e.target.value)} defaultValue={participant || ''} id="participant " type="text"  p={'2rem 1rem'}  />
      </Box>
    </Flex> 
    <Accordion allowMultiple defaultIndex={[0, 1, 2, 3, 4,]}>

    {/* Transcript Summary */} 
     <AccordionItem mt={'1rem'} border={'none'}> 
          <Box p={0} >
            {/* Header */}
            <AccordionButton p={0} borderBottom={'1px solid rgba(0, 0, 0, 0.50)'} >
                <Heading justifySelf={'flex-start'} size="lg" mb={'6'} >
                  Transcript Summary
                </Heading>
            </AccordionButton>
            <AccordionPanel >
           {/* Pronoun Select and Buttons */}
            <Flex justifyContent={'flex-end'} gap={4} mb={'4rem'}>
              <Select
                placeholder="Select Pronoun"
                width="200px"
                defaultValue={selectedPronoun}
                onChange={(e) => setSelectedPronoun(e.target.value)}
              >
                <option value="he/him">He/Him</option>
                <option value="she/her">She/Her</option>
                <option value="they/them">They/Them</option>
              </Select>

            
                <Button onClick={onOpen} fontSize={'14px'} fontWeight={'400'} display={"flex"} gap={3} bg={'transparent'} border={'1px solid rgba(68, 68, 68, 0.60)'} borderRadius={'5px'}>
                <CiEdit/>
                  Magic Edit
                </Button>
                <Button fontSize={'14px'} fontWeight={'400'} display={"flex"} gap={3} bg={'transparent'} border={'1px solid rgba(68, 68, 68, 0.60)'} borderRadius={'5px'}>
                  <LuCopy/>      
                      Copy All
                  </Button>
            
            </Flex>
            <Textarea
              onChange={(e)=>setTranscriptionSummaryText(e.target.value)}
              defaultValue={transcriptionSummary}
              height="300px"
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              resize="none"
            />

            {/* Magic Edit Modal */}
            <MagicEdit isOpen={isOpen} onClose={onClose} />
            </AccordionPanel>
          </Box>
     </AccordionItem>
    

    {/* Objective  */}    
     <AccordionItem mt={'1rem'}  border={'none'}> 
          <Box p={0} >
            {/* Header */}
            <AccordionButton p={0} borderBottom={'1px solid rgba(0, 0, 0, 0.50)'}>
                <Heading justifySelf={'flex-start'} size="lg" mb={6}>
                  Objective
                </Heading>
            </AccordionButton>
            <AccordionPanel >
           {/* Pronoun Select and Buttons */}
            <Flex justifyContent={'flex-end'} gap={4} mb={'4rem'}>
                <Button fontSize={'14px'} fontWeight={'400'} display={"flex"} gap={3} bg={'transparent'} border={'1px solid rgba(68, 68, 68, 0.60)'} borderRadius={'5px'}>
                  <LuCopy/>      
                      Copy All
                  </Button>            
            </Flex>
            <Textarea
              onChange={(e)=>setObjectiveText(e.target.value)}
              defaultValue={objective}
              height="300px"
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              resize="none"
            />
            </AccordionPanel>
          </Box>
     </AccordionItem>

    {/* Assement and Plan */}    
      <AccordionItem mt={'1rem'}  border={'none'}> 
          <Box p={0} >
            {/* Header */}
            <AccordionButton p={0} borderBottom={'1px solid rgba(0, 0, 0, 0.50)'}>
                <Heading justifySelf={'flex-start'} size="lg" mb={6}>
                Assement and Plan
                </Heading>
            </AccordionButton>
            <AccordionPanel >
           {/* Pronoun Select and Buttons */}
            <Flex justifyContent={'flex-end'} gap={4} mb={'4rem'}>
                <Button fontSize={'14px'} fontWeight={'400'} display={"flex"} gap={3} bg={'transparent'} border={'1px solid rgba(68, 68, 68, 0.60)'} borderRadius={'5px'}>
                  <LuCopy/>      
                      Copy All
                  </Button>            
            </Flex>
            <Textarea
              onChange={(e)=>setAssementAndPlanText(e.target.value)}
              defaultValue={assementAndPlan}
              height="300px"
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              resize="none"
            />
            </AccordionPanel>
          </Box>
      </AccordionItem>

    {/* Client Instruction  */}    
      <AccordionItem mt={'1rem'}  border={'none'}> 
          <Box p={0} >
            {/* Header */}
            <AccordionButton p={0} borderBottom={'1px solid rgba(0, 0, 0, 0.50)'}>
                <Heading justifySelf={'flex-start'} size="lg" mb={6}>
                Client Instruction 
                </Heading>
            </AccordionButton>
            <AccordionPanel >
           {/* Pronoun Select and Buttons */}
            <Flex justifyContent={'flex-end'} gap={4} mb={'4rem'}>
                <Button fontSize={'14px'} fontWeight={'400'} display={"flex"} gap={3} bg={'transparent'} border={'1px solid rgba(68, 68, 68, 0.60)'} borderRadius={'5px'}>
                  <LuCopy/>      
                      Copy All
                  </Button>            
            </Flex>
            <Textarea
              onChange={(e)=>setClientInstructionText(e.target.value)}
              defaultValue={clientInstruction}
              height="300px"
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              resize="none"
            />
            </AccordionPanel>
          </Box>
      </AccordionItem>

    {/* Audio Transcript  */} 
      <AccordionItem mt={'1rem'}  border={'none'}> 
          <Box p={0} >
            {/* Header */}
            <AccordionButton p={0} borderBottom={'1px solid rgba(0, 0, 0, 0.50)'}>
                <Heading justifySelf={'flex-start'} size="lg" mb={6}>
                Audio Transcript
                </Heading>
            </AccordionButton>
            <AccordionPanel >
           {/* Pronoun Select and Buttons */}
            <Flex justifyContent={'flex-end'} gap={4} mb={'4rem'}>
                <Button fontSize={'14px'} fontWeight={'400'} display={"flex"} gap={3} bg={'transparent'} border={'1px solid rgba(68, 68, 68, 0.60)'} borderRadius={'5px'}>
                  <LuCopy/>      
                      Copy All
                  </Button>            
            </Flex>
            <Textarea
              onChange={(e)=>setTranscriptionText(e.target.value)}
              defaultValue={transcript}
              height="300px"
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              resize="none"
            />
            </AccordionPanel>
          </Box>
      </AccordionItem>

    </Accordion>
    <Flex>
    <Button mt={'1rem'} mx={'auto'} padding={'2rem 1rem'} bg={'#101828'} textColor={'white'} onClick={updateHandler}>Update Note</Button>
    </Flex>
    </Box>
  );
};

export default TranscriptionComponet;
