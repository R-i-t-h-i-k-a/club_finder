import { Button, ButtonGroup } from "@chakra-ui/react";
import React from "react";

interface Props {
  onClick: () => Promise<void>;
}

const SubmitButton = ({ onClick }: Props) => {
  return (
    <Button
      height="45px"
      bg="blue.700"
      textColor="gray.100"
      _hover={{ bg: "blue.500" }}
      onClick={onClick}
    >
      Search
    </Button>
  );
};

export default SubmitButton;
