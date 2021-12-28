import React from "react";
import { Stack, Heading, Flex, Progress, Box, Button } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import SettingModal from "./SettingModal";
type Props = {
  progressValue?: any;
  focusTime: number;
  restTime: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setTmpFocusTime: (val: number) => void;
  onSubmitSetting: () => void;
  setTmpRestTime: (val: number) => void;
};
const Header: React.FC<Props> = ({
  progressValue,
  focusTime,
  restTime,
  isOpen,
  onOpen,
  onClose,
  setTmpFocusTime,
  onSubmitSetting,
  setTmpRestTime,
}) => {
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
      >
        <Flex align="center">
          <Heading as="h1" size="lg">
            Face Detect Pomodoro Timer
          </Heading>
        </Flex>

        <Button display={{ base: "block" }} onClick={onOpen} variant="link">
          <SettingsIcon color="white" />
        </Button>
      </Flex>

      <Progress value={progressValue} colorScheme="cyan" />
      <SettingModal
        isOpen={isOpen}
        onClose={onClose}
        focusTime={focusTime}
        restTime={restTime}
        setTmpFocusTime={setTmpFocusTime}
        onSubmitSetting={onSubmitSetting}
        setTmpRestTime={setTmpRestTime}
      />
    </>
  );
};

export default Header;
