import { Box, Center, Text } from "@chakra-ui/react";

const Timer = ({
  minutesLeft,
  secoundsLeft,
}: {
  minutesLeft: number;
  secoundsLeft: number;
}) => {
  return (
    <Center>
      <Box>
        <Text fontSize="8xl">
          <span>{minutesLeft.toString().padStart(2, "0")}</span>:
          <span>{secoundsLeft.toString().padStart(2, "0")}</span>
        </Text>
      </Box>
    </Center>
  );
};

export default Timer;
