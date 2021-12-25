import React from "react";
import {
  Stack,
  Heading,
  Flex,
  useDisclosure,
  Progress,
} from "@chakra-ui/react";
type Props = {
  progressValue?: any;
};
const Header: React.FC<Props> = ({ progressValue }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // console.log("prog", progressValue);
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={6}
        bg="teal.500"
        color="white"
        // {...props}
      >
        <Flex align="center">
          <Heading as="h1" size="lg">
            Face Detect Pomodoro Timer
          </Heading>
        </Flex>

        {/* <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box> */}

        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: isOpen ? "block" : "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        ></Stack>
      </Flex>

      <Progress value={progressValue} colorScheme="cyan" />
    </>
  );
};

export default Header;
