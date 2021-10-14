import {
  Box,
  Flex,
  VStack,
  InputGroup,
  InputRightElement,
  Input,
  Button,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function Home() {
  // States
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  const addItem = () => {
    if (!todoInput) {
      console.log("No Input Text");
    } else {
      if (!todoList) {
        setTodoList([]);
      } else {
        setTodoList((todoList) => [...todoList, todoInput]);
        setTodoInput("");
      }
    }
  };

  const deleteTodo = (index) => {
    setTodoList(todoList.filter((todo) => todo !== todoList[index]));
  };
  return (
    <Box w="100%" minH="100vh">
      <Flex justify="center" align="center" direction="column">
        <Text fontSize="6xl" color="gray.400">
          todo
        </Text>
        <Box>
          <InputGroup
            size="lg"
            variant="filled"
            w={["18rem", "20rem", "25rem", "25rem"]}
          >
            <InputRightElement>
              <Button
                rounded="md"
                as="Button"
                bg="gray.900"
                onClick={addItem}
                _focus=""
                color="white"
              >
                +
              </Button>
            </InputRightElement>
            <Input
              id="input"
              _focus=""
              placeholder="add todo"
              size="lg"
              variant="filled"
              rounded="md"
              onChange={(e) => setTodoInput(e.target.value)}
              value={todoInput}
            />
          </InputGroup>

          <VStack spacing={5} align="stretch" mt={8}>
            {todoList.length === 0 || !todoList ? (
              <Text align="center">no todos</Text>
            ) : (
              todoList.map((todo, index) => {
                return (
                  <Box
                    key={index}
                    display="flex"
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                    h={12}
                    w={["18rem", "20rem", "25rem", "25rem"]}
                    color="white"
                    rounded="md"
                    border="2px"
                    borderColor="gray.700"
                  >
                    <Text ml={5} isTruncated color="black">
                      {todo}
                    </Text>
                    <IconButton
                      h="2.3rem"
                      w="2.3rem"
                      mr={1}
                      rounded="md"
                      bg="gray.900"
                      _focus=""
                      color="red.400"
                      onClick={() => {
                        deleteTodo(index);
                      }}
                      icon={<MdOutlineDeleteOutline />}
                    ></IconButton>
                  </Box>
                );
              })
            )}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
