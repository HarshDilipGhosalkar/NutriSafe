// src/components/Camera.js
import React, { useRef, useCallback, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from "next/router";
import { ScaleLoader } from 'react-spinners';



const Camera = () => {
  const router = useRouter();
  const webcamRef = useRef(null);
  const [isScanning, setScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [responseInfo, setResponseInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const videoConstraints = {
    facingMode: 'environment', // Set to 'environment' for back camera
  };
  const capture = useCallback(() => {
    console.log("clicked1")
    setScanning(true);
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    // Simulate a delay for scanning effect
    setTimeout(() => {
      setScanning(false);
    }, 1000);

    handleUpload()
  }, []);


//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedImage(file);
//   };
  
  const handleUpload = () => {
    
    if (capturedImage) {
        console.log("clicked")
      const formData = new FormData();
      formData.append('image', capturedImage);
      setLoading(true);
  
      // Remove or update the Content-Type header
      fetch('https://tsec-hacks.onrender.com/packagedFood', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: {
        }
      })
        .then(response => response.json())
        .then(result => {
            console.log(result.data);
            setResponseInfo(result.data);
        })
        .finally(() => {
          setLoading(false);
        })
  
        .catch(error => console.log('error', error));
    } else {
        console.log(capturedImage)
      console.warn('No image selected');
    }
  };


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
          videoConstraints={videoConstraints}
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
      
      {responseInfo && (
                <div className={`mt-4 p-6 rounded-lg ${responseInfo.can_eat === 'yes' ? 'bg-green-100 border-green-800 border-[1px]' : 'bg-red-100 border-[1px] border-red-800'}`}>
                  <h2 className={`text-3xl font-semibold ${responseInfo.can_eat === 'yes' ? 'text-green-800 ' : 'text-[#a20220]'} `}>{responseInfo.can_eat === 'yes' ? 'Can Eat' : 'Cannot Eat'}</h2>
                  <div className="mt-2 flex flex-wrap">
                    {responseInfo.ingredients.map((ingredient, index) => (
                      <div key={index} className={`p-2 rounded-md my-2 mr-2 ${responseInfo.can_eat === 'yes' ? 'bg-green-800 text-white' : 'bg-[#f7a6b5] border-[1px] border-[#a20220]'} `}>
                        {ingredient}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <strong>Reason:</strong> {responseInfo.reason}
                  </div>
                </div>
              )}
              {loading ? (
                <div className="mt-4">
                  <ScaleLoader color="#2563eb" />
                  Hold on!
                </div>
              ) : (
                <button
                  className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-full"
                  onClick={handleUpload}
                >
                  Upload Image
                </button>
              )}
    </div>
  );
};

export default Camera;