// src/components/Camera.js
import React, { useRef, useCallback, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from "next/router";


const Camera = () => {
  const router = useRouter();
  const webcamRef = useRef(null);
  const [isScanning, setScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = useCallback(() => {
    setScanning(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    // Simulate a delay for scanning effect
    setTimeout(() => {
      setScanning(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const openCamera = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    openCamera();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className=" mb-[15px] text-4xl font-md mt-4">Scan Food</h1>
      <div className="flex flex-col  items-center relative w-[80%] h-4/5 rounded-[17px] overflow-hidden">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className={`w-full rounded-[17px]  overflow-hidden  ${isScanning ? 'animate-scanning' : ''}`}
        />
        <button
        onClick={capture}
        className=" mt-[25px] bg-blue-500 text-white px-6 py-2 rounded-md focus:outline-none"
      >
        Capture Image
      </button>

      <div className="flex items-center my-2 space-x-2">
          <span className="text-gray-500">OR</span>
          <div className="border-t border-gray-500 flex-1"></div>
        </div>
        <button
          onClick={() => router.push("/packaged")}
          className="bg-green-500 text-white px-6 py-2 rounded-md focus:outline-none"
        >
          Upload Food Image
        </button>

      </div>
      
      {capturedImage && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Captured Image</h2>
          <img src={capturedImage} alt="Captured" className="max-w-md w-full" />
        </div>
      )}
    </div>
  );
};

export default Camera;
