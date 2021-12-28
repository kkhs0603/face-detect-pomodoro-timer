import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import { TIMER_TYPE } from "../common/constants";
import { useDisclosure } from "@chakra-ui/react";

const useTimerControlls = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [focusTime, setFocusTime] = useState(60 * 25);
  const [tmpFocusTime, setTmpFocusTime] = useState(focusTime);
  const [restTime, setRestTime] = useState(60 * 5);
  const [tmpRestTime, setTmpRestTime] = useState(restTime);
  const [settingTime, setSettingTime] = useState(focusTime);
  const [timerType, setTimerType] = useState(TIMER_TYPE.LOADING);
  const [timerId, setTimerId] = useState<NodeJS.Timeout>();
  const [isStart, setIsStart] = useState(false);
  const [minutesLeft, setMinutesLeft] = useState(
    Math.floor((settingTime - elapsedTime) / 60)
  );
  const [secoundsLeft, setSecoundsLeft] = useState(
    (settingTime - elapsedTime) % 60
  );
  const [progressValue, setProgressValue] = useState(0);

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);

  const startTimer = () => {
    if (timerId) return;
    const id = setInterval(() => {
      setElapsedTime((t) => t + 1);
      // () => clearInterval(id);
    }, 1000);
    setTimerId(id);
    setIsStart(true);
  };
  const stopTimer = () => {
    setIsStart(false);
    clearInterval(timerId);
    setTimerId(null);
  };
  const resetTimer = () => {
    clearInterval(timerId);
    setTimerId(null);
    setElapsedTime(0);
    setIsStart(false);
  };

  useEffect(() => {
    if (settingTime - elapsedTime > 0) {
      setMinutesLeft(Math.floor((settingTime - elapsedTime) / 60));
      setSecoundsLeft((settingTime - elapsedTime) % 60);
    } else {
      setElapsedTime(0);
      if (timerType == TIMER_TYPE.FOCUS) {
        setSettingTime(restTime);
      } else {
        stopTimer();
        setSettingTime(focusTime);
      }
      setTimerType(
        timerType == TIMER_TYPE.FOCUS ? TIMER_TYPE.REST : TIMER_TYPE.FOCUS
      );
    }
    setProgressValue((elapsedTime / settingTime) * 100);
  }, [elapsedTime]);

  useEffect(() => {
    faceDetectHandler();
  }, []);

  const faceDetectHandler = async () => {
    if (!webcamRef.current || !canvasRef.current) return;
    await loadModels();
    await handleLoadWaiting(webcamRef);
    const webcam = webcamRef.current.video;
    const canvas = canvasRef.current;
    webcam.width = webcam.videoWidth;
    webcam.height = webcam.videoHeight;
    canvas.width = webcam.videoWidth;
    canvas.height = webcam.videoHeight;
    const video = webcamRef.current.video;
    if (!video) return;
    if (timerType === TIMER_TYPE.LOADING) setTimerType(TIMER_TYPE.STOP);
    (async function draw() {
      const detectionsWithExpressions = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();
      if (detectionsWithExpressions.length > 0) {
        if (!isFaceDetected) setIsFaceDetected(true);
        drawSquare(detectionsWithExpressions, canvasRef.current);
      } else {
        setIsFaceDetected(false);
        canvasRef.current
          .getContext("2d")
          .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      requestAnimationFrame(draw);
    })();
  };

  useEffect(() => {
    if (isStart) {
      if (timerType == TIMER_TYPE.FOCUS) {
        //顔認証が外れてタイマーを止めるまでの遊び時間
        const timer = setTimeout(() => {
          if (isFaceDetected) {
            startTimer();
          } else {
            stopTimer();
          }
        }, 500);
        return () => clearInterval(timer);
      } else if (timerType == TIMER_TYPE.STOP) {
        setTimerType(TIMER_TYPE.FOCUS);
        startTimer();
      }
    } else {
      if (timerType == TIMER_TYPE.FOCUS) {
        //顔認証が外れてタイマーを止めるまでの遊び時間
        const timer = setTimeout(() => {
          if (isFaceDetected) {
            if (!isStart) startTimer();
          } else {
            if (isStart) stopTimer();
          }
        }, 500);
        return () => clearInterval(timer);
      } else if (timerType == TIMER_TYPE.STOP) {
        setTimerType(TIMER_TYPE.FOCUS);
        startTimer();
      }
    }
  }, [isFaceDetected, isStart]);

  useEffect(() => {
    if (isOpen) {
      stopTimer();
      setIsStart(false);
    } else {
      if (timerType === TIMER_TYPE.LOADING || timerType === TIMER_TYPE.STOP)
        return;
      startTimer();
      setIsStart(true);
    }
  }, [isOpen]);

  const onSubmitSetting = () => {
    // stopTimer();
    if (tmpFocusTime !== focusTime) {
      setFocusTime(tmpFocusTime);
    }
    if (tmpRestTime !== restTime) {
      setRestTime(tmpRestTime);
    }
    if (timerType == TIMER_TYPE.FOCUS) {
      setSettingTime(tmpFocusTime);
    } else if (timerType == TIMER_TYPE.REST) {
      setSettingTime(tmpRestTime);
    }
    // startTimer();
    onClose();
  };

  return {
    startTimer,
    stopTimer,
    resetTimer,
    isStart,
    minutesLeft,
    secoundsLeft,
    webcamRef,
    canvasRef,
    isFaceDetected,
    setIsFaceDetected,
    timerType,
    progressValue,
    focusTime,
    setFocusTime,
    restTime,
    setRestTime,
    isOpen,
    onOpen,
    onClose,
    onSubmitSetting,
    setIsStart,
    setTimerType,
    tmpFocusTime,
    setTmpFocusTime,
    tmpRestTime,
    setTmpRestTime,
  };
};

export default useTimerControlls;

const loadModels = async () => {
  const MODEL_URL = "../models";
  await Promise.all([
    faceapi.nets.tinyFaceDetector.load(MODEL_URL),
    faceapi.nets.faceExpressionNet.load(MODEL_URL),
  ]);
};
const handleLoadWaiting = async (webcamRef) => {
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (webcamRef.current?.video?.readyState === 4) {
        resolve(true);
        clearInterval(timer);
      }
    }, 500);
  });
};

function drawSquare(
  detectionsWithExpressions: faceapi.WithFaceExpressions<{
    detection: faceapi.FaceDetection;
  }>[],
  current: HTMLCanvasElement
) {
  detectionsWithExpressions.forEach((obj) => {
    const topLeft = obj.detection.box.topLeft;
    const topRight = obj.detection.box.topRight;
    const bottomLeft = obj.detection.box.bottomLeft;
    const bottomRight = obj.detection.box.bottomRight;
    const ctx = current.getContext("2d");

    if (!ctx) return;
    ctx.clearRect(0, 0, current.width, current.height);
    ctx.beginPath();
    ctx.rect(
      topLeft.x,
      topLeft.y,
      bottomLeft.y - topLeft.y,
      bottomRight.x - bottomLeft.x
    );
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.stroke();
  });
}
