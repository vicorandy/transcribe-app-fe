import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
} from "@chakra-ui/react";

function AudioModal({
  isOpen,
  onClose,
  selectedAudio,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedAudio: { audioUrl: string | null };
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Audio Player</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display="flex" justifyContent="center" alignItems="center">
            {selectedAudio.audioUrl ? (
              <audio controls>
                <source src={selectedAudio.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <p>No audio selected</p>
            )}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button bg={'#0A0A0A'} textColor={'white'} _hover={{bg:'#0A0A0A'}} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AudioModal;
