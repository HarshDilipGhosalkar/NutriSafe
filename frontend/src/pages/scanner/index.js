// src/components/Camera.js
import React, { useRef, useState } from 'react';
// import './Camera.css'; // Import Tailwind CSS styles

const Camera = () => {
  const videoRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraOpen(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());

      videoRef.current.srcObject = null;
      setCameraOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className={`relative w-full h-full ${cameraOpen ? '' : 'border-4 border-green-500'}`}>
        {cameraOpen ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline // Add playsInline for iOS support
            className="w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 bg-black"></div>
        )}
        {cameraOpen && (
          <button
            onClick={closeCamera}
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            Close Camera
          </button>
        )}
      </div>
      {!cameraOpen && (
        <button
          onClick={openCamera}
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 focus:outline-none"
        >
          Open Camera
        </button>
      )}
    </div>
  );
};

export default Camera;
