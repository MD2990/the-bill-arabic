import { Text } from "@chakra-ui/layout";
const { Button } = require("@chakra-ui/button");
const { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } = require("@chakra-ui/modal");

export default function NewModal({ onClose, isOpen, onClick, children, title, subTitle }) {
  /*   const { isOpen, onOpen, onClose } = useDisclosure(); */

  return (
    <>
      {/*  <Button onClick={onOpen}>Trigger modal</Button> */}
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="blackAlpha.600" fontSize={[12, 15, 18, 20]}>
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text
              fontWeight="black"
              fontSize={['2xl','3xl', '4xl', '5xl']}
              className="shadow"
              textShadow="9px 2px 5px rgba(0, 0, 0, 0.6)"
              mb="1rem"
              mt="-4"
              color="blackAlpha.900"
              textAlign="center"
            >
               {subTitle}
            </Text>
            {children}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blackAlpha' onClick={onClick}>
              Edit Port
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
