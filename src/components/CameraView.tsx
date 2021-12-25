import React from "react";
import Webcam from "react-webcam";
import { Box } from "@chakra-ui/react";

const CameraView = ({ webcamRef, canvasRef }) => {
  return (
    <Box
      style={{
        position: "relative",
        height: 0,
        overflow: "hidden",
        paddingTop: "56.25%",
        maxWidth: "600px",
        maxHeight: "340px",
        margin: "10px auto",
      }}
    >
      <Webcam
        audio={false}
        ref={webcamRef}
        mirrored={false}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          maxWidth: "600px",
          maxHeight: "340px",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          maxWidth: "600px",
          maxHeight: "340px",
        }}
      />
    </Box>
  );
};

export default CameraView;
