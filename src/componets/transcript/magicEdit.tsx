// components/MagicEdit.tsx
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Textarea,
    ModalFooter,
    Button,
    VStack,
  } from '@chakra-ui/react';
  
  interface MagicEditProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const MagicEdit: React.FC<MagicEditProps> = ({ isOpen, onClose }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Magic Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Textarea placeholder="Enter your edit here..." />
              <Textarea placeholder="Enter your edit here..." />
              <Textarea placeholder="Enter your edit here..." />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default MagicEdit;
  