import { Container, Box } from "@chakra-ui/react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import TimerControlls from "./components/TimerControlls";
import CameraView from "./components/CameraView";
import useTimerControlls from "./hooks/useTimerControlls";

function App() {
  const timerControllsProps = useTimerControlls();
  return (
    <Box>
      <Header {...timerControllsProps} />
      <Container>
        <Timer {...timerControllsProps} />
        <CameraView {...timerControllsProps} />
        <TimerControlls {...timerControllsProps} />
      </Container>
    </Box>
  );
}

export default App;
