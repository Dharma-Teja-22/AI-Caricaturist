import { useState, useEffect, useRef, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import MiracleLoader from "../assets/Loader.gif";
import Header from "@/components/Header";
import UploadStep from "@/components/UploadStep";
import PromptStep from "@/components/PromptConfiguration";
import StyleStep from "@/components/StyleSelection";
import GenerateStep from "@/components/GenerationProcess";
import ResultStep from "@/components/GeneratedResult";
import ConsentStep from "./ConsentStep";
import { UserContext } from "@/App";

export default function Caricature() {
  const { step, setStep, userData, setUserData } = useContext(UserContext);
  const [subTitle, setSubTitle] = useState("Click generate for your own Caricature");
  const [title, setTitle] = useState("Generate Caricature");
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [uploadedImage, setUploadedImage] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const prompts = [
    "Create an image with a humorous and lighthearted theme to entertain.",
    "Make the elements exaggerated to enhance drama and visual impact.",
    "Use a bright and bold color palette for a vibrant effect.",
    "Keep the design simple, clean, and minimal with fewer details.",
    "Illustrate the subject in a playful and whimsical cartoon-like style.",
    "Ensure the artwork looks as close to real life as possible.",
    "Use abstract shapes and unconventional forms to create a unique composition.",
    "Give the design an old-fashioned, nostalgic look reminiscent of past eras.",
  ];

  const styles = [
    "https://i.pinimg.com/736x/fe/7f/1d/fe7f1dedecc075f178e90eb098a55daa.jpg",
    "https://www.instantaiprompt.com/wp-content/uploads/2023/12/simple-cartoon-from-photo.jpg",
    "https://caricaturer.io/_next/image?url=%2Fimages%2Fv2%2Fpreview_image_1.webp&w=1080&q=75",
    "https://xinva.ai/wp-content/uploads/2023/12/111.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRI4DvFm-J5lkCmUedd_7MWsXXXn75l1gpMg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWdF1FTBA9oAPmtxSTrfP1Wn-E3nJ60-I5jA&s",
    "https://easy-peasy.ai/_next/image?url=https%3A%2F%2Fmedia.easy-peasy.ai%2F1a341e0f-d9e0-42b6-8ee0-eb60a7493e4d%2Ff7426714-3913-44c8-8726-4dca0071b563.png&w=828&q=75",
    "https://www.shutterstock.com/image-vector/character-face-cartoon-icon-vector-600nw-2225068655.jpg",
  ];

  useEffect(() => {
    const body = document.querySelector("body");
    body?.classList.remove("light", "dark");
    body?.classList.add(theme || "");    
  }, [theme]);

  // Save userData to localStorage only when it's valid
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  // Load initial state from localStorage
  useEffect(() => {
    // Load uploadedImage
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) setUploadedImage(savedImage);

    // Load userData with validation
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        if (parsedData && typeof parsedData === 'object' && Object.keys(parsedData).length > 0) {
          setUserData(parsedData);
        } else {
          localStorage.removeItem("userData");
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
        localStorage.removeItem("userData");
      }
    }

    // Load selectedPrompts
    const savedPrompts = localStorage.getItem("selectedPrompts");
    if (savedPrompts) setSelectedPrompts(JSON.parse(savedPrompts));
  }, []);

  const handleStartOver = () => {
    setSelectedPrompts([]);
    setUploadedImage(null);
    setSelectedStyle(null);
    setStep(0);
    setUserData({}); // Reset to empty object instead of undefined
    localStorage.removeItem("uploadedImage");
    localStorage.removeItem("selectedPrompts");
    localStorage.removeItem("selectedStyle");
    localStorage.removeItem("step");
    localStorage.removeItem("userData");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result);
        localStorage.setItem("uploadedImage", e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePromptToggle = (prompt) => {
    setSelectedPrompts((prev) => {
      const newSelectedPrompts = prev.includes(prompt)
        ? prev.filter((p) => p !== prompt)
        : [...prev, prompt];
      localStorage.setItem("selectedPrompts", JSON.stringify(newSelectedPrompts));
      return newSelectedPrompts;
    });
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    localStorage.setItem("selectedStyle", style);
    setStep(4);
  };

  const generateCaricature = async () => {
    console.log("Generating caricature with:", {
      uploadedImage,
      selectedPrompts,
      selectedStyle,
    });
    setStep(5);
  };

  const loadingAnimation = async () => {
    setTitle("Creating your caricature... ");
    setSubTitle("Generating your unique caricature – almost there!");
    setLoading(true);
    setTimeout(async () => {
      await generateCaricature();
      setLoading(false);
      setTitle("Generating your caricature... Please wait.");
      setSubTitle("Excited to transform your photo? Click 'Generate'!");
    }, 5000);
  };

  const handleReupload = () => {
    setUploadedImage(null);
    setStep(1);
  };

  const handleCameraCapture = async () => {
    try {
      if (!videoRef.current.srcObject) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

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
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
        <AnimatePresence mode="wait">
          {step === 0 && <ConsentStep setUserData={setUserData} />}
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
            />
          )}
          {step === 2 && (
            <PromptStep
              prompts={prompts}
              selectedPrompts={selectedPrompts}
              handlePromptToggle={handlePromptToggle}
              setStep={setStep}
            />
          )}
          {step === 3 && (
            <StyleStep
              styles={styles}
              handleStyleSelect={handleStyleSelect}
              setStep={setStep}
            />
          )}
          {step === 4 && (
            <GenerateStep
              title={title}
              subTitle={subTitle}
              loading={loading}
              loadingAnimation={loadingAnimation}
              MiracleLoader={MiracleLoader}
            />
          )}
          {step === 5 && (
            <ResultStep
              handleStartOver={handleStartOver}
              generatedImage="data:image/png;base64,iVB"
            />
          )}
        </AnimatePresence>
      </main>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}