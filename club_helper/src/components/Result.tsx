import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  useDisclosure,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
} from "@chakra-ui/react";
import ResultLoading from "./ResultLoading";

interface Props {
  name: string;
  description_summary: string;
  description: string;
  meeting: string;
  contact: string;
}

const Result = ({
  name,
  description_summary,
  description,
  meeting,
  contact,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Card width="50vw">
      <CardHeader paddingBottom="10px" paddingTop="10px">
        <Heading as="h3" size="md">
          {name}
        </Heading>
      </CardHeader>
      <CardBody paddingBottom="1px" paddingTop="2px">
        <Text>{description_summary}</Text>
      </CardBody>
      <CardFooter justifyContent="right">
        <Button
          bg="blue.700"
          textColor="gray.100"
          onClick={onOpen}
          _hover={{ bg: "blue.500" }}
        >
          See More
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text paddingBottom="1px">{description}</Text>
              <Divider
                borderWidth="1px"
                borderColor="black"
                marginTop="5"
                marginBottom="5"
              />
              <Text mt="1vw" color="grey.700">
                Meeting: {meeting}
              </Text>
              <Text color="grey.700">Contact: {contact}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" marginRight="10px" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CardFooter>
    </Card>
  );
};

export default Result;
