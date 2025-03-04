import { useState, useEffect, useRef, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import MiracleLoader from "../assets/Loader.gif";
import Header from "@/components/Header";
import UploadStep from "@/components/UploadStep";
import StyleStep from "@/components/StyleSelection";
import ResultStep from "@/components/GeneratedResult";
import ConsentStep from "./ConsentStep";
import { UserContext } from "@/App";
import API from "@/services/API";

export default function Caricature() {
  const {step, setStep , userData, setUserData} = useContext(UserContext);  
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [uploadedImage, setUploadedImage] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const { theme, setTheme } = useTheme();
  const [userImageURL, setUserImageURL] = useState('');
  const [userId, setUserId] = useState('')
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const body = document.querySelector("body");
    body?.classList.remove("light", "dark");
    body?.classList.add(theme || "");    
  }, [theme]);

  useEffect(()=>{
    if(localStorage.getItem("uploadedImage")) setUploadedImage(localStorage.getItem("uploadedImage"));
    if(localStorage.getItem("selectedPrompts")) setSelectedPrompts(JSON.parse(localStorage.getItem("selectedPrompts")))
    if(localStorage.getItem("generatedImage")) setGeneratedImage((localStorage.getItem("generatedImage")))

  },[])

  const handleStartOver = () => {
    setSelectedPrompts([]);
    setUploadedImage(null);
    setSelectedStyle(null);
    setStep(0);
    localStorage.clear();
    setUserData(null);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // await uploadUserImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result);
        localStorage.setItem("uploadedImage",e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadUserImage = async (image) =>{
    console.log(image);
    const response = await API.post.uploadUserImage(image, userData?.fullName || JSON.parse(userData)?.fullName);
    setUserImageURL(response?.fileAddress);
    setUserId(response?.userId);
    console.log(response?.userId, userData?.fullName || JSON.parse(userData)?.fullName);
  }

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    localStorage.setItem("selectedStyle", style);
    setStep(4);
  };

  // const generateCaricature = async () => {
  //   console.log("Generating caricature with:", {
  //     uploadedImage,
  //     selectedPrompts,
  //     selectedStyle,
  //   });
  //   setStep(5);
  // };

  const handleReupload = () => {
    setUploadedImage(null);
    localStorage.removeItem("uploadedImage");
    setStep(1);
  };

  const handleCameraCapture = async () => {
    try {
      // 1. Access the camera (if not already accessed)
      if (!videoRef.current.srcObject) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      }

      // 2. Draw the current video frame onto the canvas
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // 3. Get the image data URL from the canvas
      const dataURL = canvas.toDataURL("image/png");
      setUploadedImage(dataURL);
      setStep(2);
    } catch (error) {
      console.error("Error accessing camera or capturing image:", error);
      alert("Error accessing camera: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-red-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col transition-colors duration-200">
      <Header step={step} theme={theme} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-28 ">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <ConsentStep  setUserData={setUserData} />
          )}
          {step === 1 && (
            <UploadStep
              uploadedImage={uploadedImage}
              handleImageUpload={handleImageUpload}
              handleReupload={handleReupload}
              handleCameraCapture={handleCameraCapture}
              videoRef={videoRef}
              canvasRef={canvasRef}
              displayCapturedImage={!!uploadedImage}
              setUploadedImage={setUploadedImage}
              setStep={setStep}
              uploadUserImage={uploadUserImage}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          )}

          {step === 2 && (
            <StyleStep
              handleStyleSelect={handleStyleSelect}
              setStep={setStep}
              userImageURL={userImageURL}
              userId={userId}
              setGeneratedImage={setGeneratedImage}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          )}

          {step === 3 && (
            <ResultStep
              handleStartOver={handleStartOver}
              userData={userData}
              generatedImage={generatedImage}
              // generatedImage="https://aicaricaturedemo.blob.core.windows.net/ai-caricature-styles-data/2025-03-03T19:34:04.895Z-PHOTO-2025-02-25-19-47-12.jpg?sv=2025-01-05&ss=btqf&srt=sco&spr=https&st=2025-03-03T19%3A34%3A04Z&se=2027-03-03T19%3A34%3A04Z&sp=rwdlacupi&sig=%2FkOGnmBkuqpl%2BNHYWgLV4u6OweOGEAYUudSEkgbj2nE%3D"
            />
          )}
        </AnimatePresence>
      </main>
      {/* Hidden video and canvas elements */}
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
