import {
  GridItem,
  Heading,
  Grid,
  Text,
  HStack,
  Box,
  VStack,
} from "@chakra-ui/react";
import { SearchBar } from "./components/SearchBar";
import { useState } from "react";
import SubmitButton from "./components/SubmitButton";
import Result from "./components/Result";
import axios from "axios";
import { ClubData } from "./components/ClubData";
import ResultLoading from "./components/ResultLoading";
//http://localhost:8212/clubs
function App() {
  const [inputText, setInputText] = useState("");
  const [clubs, setClubs] = useState<ClubData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      console.log("hello");
      const response = await axios.post("http://127.0.0.1:8501/clubs", {
        data: { text: inputText },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setClubs(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <Box bg="rgb(227, 225, 232)" minH="100vh">
      <Grid
        templateAreas={`"top" "query" "body"`}
        justifyItems="center"
        alignItems="center"
        gap={4}
        width="100%"
      >
        <GridItem area="top" marginTop="15vh">
          <Heading
            color="blue.700"
            size="3xl"
            fontFamily="cursive"
            fontStyle="oblique"
          >
            Wildcats Club Finder
          </Heading>
        </GridItem>
        <GridItem
          area="query"
          alignItems={"center"}
          marginTop="7vh"
          marginBottom="7vh"
        >
          <HStack spacing={10}>
            <SearchBar
              onChange={(text: string) => setInputText(text)}
              inputText={inputText}
            />
            <SubmitButton onClick={handleSearch} />
          </HStack>
        </GridItem>
        <GridItem area="body" marginBottom="2vh">
          {loading ? (
            <VStack spacing="10">
              <ResultLoading />
              <ResultLoading />
              <ResultLoading />
              <ResultLoading />
              <ResultLoading />
            </VStack>
          ) : (
            <VStack spacing="10">
              {clubs.length !== 0 &&
                clubs.map((club, i) => (
                  <Result
                    name={club.name}
                    description_summary={club.description_summary}
                    meeting={club.meeting}
                    contact={club.contact}
                    description={club.description}
                  />
                ))}
            </VStack>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
}

export default App;
