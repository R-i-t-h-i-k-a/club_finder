import { Input } from "@chakra-ui/react";

interface Props {
  onChange: (text: string) => void;
  inputText: string;
}

export const SearchBar = ({ onChange, inputText }: Props) => {
  return (
    <Input
      size="lg"
      width="50vw"
      bg="white"
      variant="filled"
      placeholder="Describe what kind of club you are looking for"
      value={inputText}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};
