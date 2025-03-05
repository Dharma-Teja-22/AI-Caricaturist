import { motion } from "framer-motion";
import { Printer, RefreshCcw, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import LabsLogo from "../assets/labs.png";
import API from "@/services/API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GeneratedResult = ({ handleStartOver, generatedImage, userData }) => {
  const captureRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const handlePrint = useReactToPrint({
    content: () => captureRef.current,
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSendMail = async () => {
    try{
      const response = await API.post.sendMail(email, generatedImage, userData.fullName || JSON.parse(userData)?.fullName)
      console.log(response);
      if(response?.status)
      {
        toast.success(response?.message || "Mail sent successfully")
      }
      handleCloseModal();
    }
    catch(err)
    {
      toast.error("Error while sending Mail")
      console.log(err);
    }
  };

  return (
    <motion.div
      key="step5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <ToastContainer/>
      <h2 className="text-3xl font-bold text-gray-900 mb-6 dark:text-gray-200">
        Your Caricature
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Image Section */}
        <div
          ref={captureRef}
          className="bg-white shadow-lg rounded-lg p-4 mx-auto w-full max-w-xs sm:max-w-sm"
        >
          <div className="flex justify-between items-center">
            <img src={LabsLogo} alt="Labs Logo" className="h-10 w-30 mb-2" />
            <p className="font-bold mb-2 dark:text-miracle-darkBlue text-miracle-lightBlue/100">
              Booth #1234
            </p>
          </div>
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <img
              src={generatedImage}
              className="w-full h-full object-cover rounded-lg"
              alt="Generated Caricature"
            />
          </div>
          <p className="mt-4 text-sm text-gray-800 font-bold">
            {userData?.fullName || JSON.parse(userData)?.fullName || "Here is your Caricature"}
          </p>
        </div>

        {/* Button Section */}
        <motion.div
          key="generated-result-step"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 2.5 }}
          className="flex flex-col w-full items-center md:items-start gap-4"
        >
          <button
            onClick={handleStartOver}
            className="w-full md:w-[250px] px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-miracle-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 flex items-center "
          >
            <RefreshCcw className="w-5 h-5 mr-2" />
            Start Over
          </button>
          <button
            onClick={handlePrint}
            className="w-full md:w-[250px] px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-miracle-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 flex items-center "
          >
            <Printer className="w-5 h-5 mr-2" />
            Print my Caricature
          </button>
          <button
            onClick={handleOpenModal}
            className="w-full md:w-[250px] px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-miracle-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 flex items-center "
          >
            <Send className="w-5 h-5 mr-2" />
            Send via Email
          </button>
        </motion.div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-miracle-black mb-4">
              Enter Email ID
            </h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md bg-miracle-white text-miracle-black"
              placeholder="Enter your email"
            />
            <div className="flex flex-col sm:flex-row justify-end mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={handleCloseModal}
                className="w-full sm:w-auto px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMail}
                className="w-full sm:w-auto px-4 py-2 text-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 rounded-md "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GeneratedResult;
