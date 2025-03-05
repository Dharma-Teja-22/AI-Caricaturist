import { motion } from "framer-motion";
import { Upload, X, Camera as CameraIcon, RefreshCw } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MiracleLoader from "../assets/Loader.gif";
const UploadStep = ({
  uploadedImage,
  handleImageUpload,
  handleReupload,
  setUploadedImage,
  setStep,
  uploadUserImage,
  isLoading, 
  setIsLoading
}) => {
  const webcamRef = useRef(null);
  const [isCamera, setIsCamera] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const handleCameraCapture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setUploadedImage(imageSrc);
      localStorage.setItem("uploadedImage", imageSrc);
      setIsCamera(false);
    } else {
      console.log("Error");
      toast.error("Please fill in all fields!");
    }
  }, [setUploadedImage]);

  const toggleCameraView = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };

  const handleCameraToggle = () => {
    if (webcamRef.current.state.hasUserMedia === false) {
      toast.error("Camera is Necessary");
    } else {
      setIsCamera((prev) => !prev);
    }
  };

  const base64ToFile = (base64String, fileName) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1]; // Extract MIME type
    const bstr = atob(arr[1]); // Decode Base64
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  const handleNext = async () => {
    try {
      setIsLoading(true);
      base64ToFile(uploadedImage, "image");
      await uploadUserImage(base64ToFile(uploadedImage, "uploadedImage"));
      setIsLoading(false);
      setStep(2);
    } catch (err) {
      console.error(err);
      toast.error("Error while uploading the Image");
    }
  };

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto sm:p-6 lg-p-8"
    >
      <ToastContainer />

      {isLoading ? (
        <div className="w-full h-full text-miracle-black flex flex-col justify-center items-center m-auto ">
          <img
            src={MiracleLoader || "/placeholder.svg"}
            alt="Loader"
            width={200}
            height={200}
          />
          <h2 className="mt-4 text-xl sm:text-2xl font-semibold  dark:text-miracle-white">
            Uploading your image ...
          </h2>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 text-center ">
          {uploadedImage ? (
            <div className="mt-4">
              <p className="mt-4 text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                Your Uploaded Image{" "}
              </p>
              <div className="h-full w-full rounded-lg overflow-hidden border border-black">
                {uploadedImage.length > 0 && (
                  <div className="h-full w-full  relative"> {/* Added relative here */}
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      // width={350}
                      // height={350}
                      className="h-full w-full mx-auto object-contain rounded-lg relative"
                    />
                    <button
                      onClick={handleReupload}
                      className="absolute top-2 right-2 bg-white rounded-full shadow-md hover:bg-red-200 p-1"
                    >
                      <X className="w-6 h-6 text-red-400" />
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleNext}
                className="mt-6 px-6 py-3 w-full border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Next
              </button>
            </div>
          ) : (
            <div className="mt-2 flex flex-col gap-4 justify-center w-full">
              <Upload className="mx-auto h-16 w-16 text-blue-500" />
              <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-gray-900">
                Upload or Capture an Image
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Choose or take a photo to turn into a caricature.
              </p>
              <div className="w-full">
                <label className="inline-flex justify-center text-center items-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 cursor-pointer transition-colors duration-200">
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                  Select Image
                </label>
              </div>

              <div className="w-full">
                <button
                  onClick={handleCameraToggle}
                  className="inline-flex justify-center text-center items-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 transition-colors duration-200"
                >
                  <CameraIcon className="w-5 h-5 mr-2" />
                  {isCamera ? "Close Camera" : "Capture Image"}
                </button>
              </div>

              <div
                className={`w-full ${
                  isCamera ? "flex" : "hidden"
                } flex items-center flex-col`}
              >
                <div className="relative w-72 h-[310px]">
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode, aspectRatio: 16 / 17 }}
                    mirrored={false}
                    className="rounded-md absolute"
                  />
                  <div className="absolute right-0 p-2">
                    <button
                      onClick={toggleCameraView}
                      className=" text-white rounded-md shadow-md flex items-center"
                    >
                      <RefreshCw className="w-7 h-7" />
                    </button>
                  </div>
                </div>

                <div className="flex w-fit gap-4">
                  <button
                    onClick={handleCameraCapture}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md shadow-md"
                  >
                    Take Photo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default UploadStep;
