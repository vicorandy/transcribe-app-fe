import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, Box } from "@chakra-ui/react";

function Test() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Your navigation buttons */}
      <Box
        position="fixed"
        right="10px"
        top="50%"
        transform="translateY(-50%)"
        display="flex"
        flexDirection="column"
        gap="10px"
      >
        <Button onClick={() => alert("Navigate to Page 1")}>Page 1</Button>
        <Button onClick={() => alert("Navigate to Page 2")}>Page 2</Button>
        <Button onClick={() => alert("Navigate to Page 3")}>Page 3</Button>
      </Box>

      {/* Trigger Button */}
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" /> {/* Optional: adjust opacity here */}
        <ModalContent width="400px" maxWidth="90%" margin="auto">
          <ModalHeader>Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This is the body of the modal. It will not cover the entire screen.
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Close</Button>
            <Button colorScheme="blue" onClick={onClose}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Test
