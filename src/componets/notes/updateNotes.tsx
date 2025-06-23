import React, { useState,useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

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
    name: string | null;
    notePreferences: Record<string, any> | null;
    audioFilePath: string;
    participant: string | null;
    date: string;
    userId: string;
    transcribeId: string;
    createdAt: string;
    updatedAt: string;
    transcribe?: Transcribe;
  }

type UpdateNoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  note? : Note | null
};

const UpdateNoteModal: React.FC<UpdateNoteModalProps> = ({ isOpen, onClose , note }) => {
  const [noteName, setNoteName] = useState('');
  const [participant, setParticipant] = useState('');

  useEffect(()=>{
    console.log({note})
  },[note])

  const handleUpdate = () => {
    // Handle update logic
    console.log('Updated Note:', { noteName, participant });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Note Name</FormLabel>
            <Input
               focusBorderColor="#FAC515"
              placeholder="Enter note name"
              value={noteName}
              onChange={(e) => setNoteName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Participant</FormLabel>
            <Input
             focusBorderColor="#FAC515"
              placeholder="Enter participant name"
              value={participant}
              onChange={(e) => setParticipant(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateNoteModal;
