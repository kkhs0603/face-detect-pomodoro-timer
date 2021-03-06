import { Button, Box, Center, Text } from "@chakra-ui/react";
import { TIMER_TYPE } from "../common/constants";

const TimerControlls = ({
  startTimer,
  stopTimer,
  resetTimer,
  isStart,
  setIsStart,
  timerType,
  setTimerType,
}) => {
  return (
    <Box>
      <Box>
        <Center>
          <Text fontSize="4xl">
            {timerType === TIMER_TYPE.LOADING && <span>{"Loading..."}</span>}
            {timerType === TIMER_TYPE.STOP && <span>{"εζ­’δΈ­"}</span>}
            {timerType === TIMER_TYPE.FOCUS && (
              <>
                {isStart ? (
                  <span>{"π¨βπ»δ½ζ₯­δΈ­π¨βπ»"}</span>
                ) : (
                  <span>{"πιεΈ­δΈ­π"}</span>
                )}
              </>
            )}
            {timerType === TIMER_TYPE.REST && <span>{"πδΌζ©δΈ­π"}</span>}
          </Text>
        </Center>
      </Box>

      <Box mt={10}>
        <Center>
          {/* <Button onClick={() => setIsStart(true)} isDisabled={isStart}>
            START
          </Button>
          <Button onClick={() => setIsStart(false)} isDisabled={!isStart}>
            STOP
          </Button>
          <Button onClick={resetTimer} isDisabled={false}>
            RESET
          </Button> */}
        </Center>
      </Box>
    </Box>
  );
};

export default TimerControlls;
