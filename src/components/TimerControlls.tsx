import { Button, Box, Center, Text } from "@chakra-ui/react";

const TimerControlls = ({
  startTimer,
  stopTimer,
  resetTimer,
  isStart,
  timerType,
}) => {
  return (
    <Box>
      {/* <Button onClick={startTimer} isDisabled={isStart}>
          START
        </Button> */}
      {/* <Button onClick={stopTimer} isDisabled={!isStart}>
          STOP
          </Button> */}
      <Box>
        <Center>
          <Text fontSize="4xl">
            {timerType === 0 && (
              <>
                {isStart ? (
                  <span>{"👨‍💻作業中👨‍💻"}</span>
                ) : (
                  <span>{"🏃退席中🏃"}</span>
                )}
              </>
            )}
            {timerType === 1 && <span>{"🛌休憩中🛌"}</span>}
          </Text>
        </Center>
      </Box>

      <Box>
        {/* <Center>
          <Button onClick={resetTimer} isDisabled={false}>
            RESET
          </Button>
        </Center> */}
      </Box>
    </Box>
  );
};

export default TimerControlls;
