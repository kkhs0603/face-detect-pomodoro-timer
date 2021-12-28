import React from "react";
import {
  Stack,
  Heading,
  Flex,
  useDisclosure,
  Progress,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from "@chakra-ui/react";

const SettingModal = ({
  isOpen,
  onClose,
  focusTime,
  restTime,
  setTmpFocusTime,
  onSubmitSetting,
  setTmpRestTime,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>設定</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text>作業時間</Text>
            <NumberInput
              defaultValue={focusTime / 60}
              onChange={(val) => setTmpFocusTime(Number(val) * 60)}
              min={1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box>
            <Text mt={5}>休憩時間(分)</Text>
            <NumberInput
              defaultValue={restTime / 60}
              onChange={(val) => setTmpRestTime(Number(val) * 60)}
              min={1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            閉じる
          </Button>
          <Button colorScheme="teal" onClick={onSubmitSetting}>
            設定
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingModal;
