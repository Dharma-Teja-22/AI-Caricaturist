// import { motion } from "framer-motion"
// import { Download } from "lucide-react"
// import LabsLogo from "../assets/labs.png";

// const GeneratedResult = ({ handleStartOver, handleDownload }) => {
//   return (
//     <motion.div
//       key="step5"
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -50 }}
//       transition={{ duration: 0.5 }}
//       className="text-center max-w-md mx-auto"
//     >
//       <div>
//         <h2 className="text-3xl font-bold text-gray-900 mb-6 dark:text-gray-200">Your Caricature</h2>
//         <div className="bg-white shadow-lg rounded-lg p-4 inline-block items-center ">
//             <div className="flex justify-between items-center">
//                 <img src={LabsLogo} alt="Labs Logo" className="h-10 w-30 mb-2"/>
//                 <p className="font-bold mb-2 dark:text-miracle-darkBlue text-miracle-lightBlue/100">Booth #1234</p>
//             </div>
//             <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center m-auto">
//                 <img
//                 src="https://i.pinimg.com/736x/50/b7/58/50b7589adbdac2274b92d32eca46629b.jpg"
//                 className="w-64 h-64"
//                 alt="Generated Caricature"
//                 />
//             </div>
//             <p className="mt-4 text-sm text-gray-600">Here is your caricature</p>
//         </div>
//         <div className="mt-8 flex justify-center space-x-4">
//           <button
//             onClick={handleStartOver}
//             className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-miracle-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//           >
//             Start Over
//           </button>
//           <button
//             onClick={handleDownload}
//             className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-miracle-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 flex items-center"
//           >
//             <Download className="w-5 h-5 mr-2" />
//             Download
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default GeneratedResult;

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import LabsLogo from "../assets/labs.png";
import { useRef } from "react";

const GeneratedResult = ({ handleStartOver, generatedImage }) => {
  const captureRef = useRef(null);


  const handleDownload = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
        allowTaint: true,
      });
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = "caricature.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.div
      key="step5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-md mx-auto"
    >
      <div >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 dark:text-gray-200">
          Your Caricature
        </h2>
        {/* Capture this div */}
        <div
          ref={captureRef}
          className="bg-white shadow-lg rounded-lg p-4 inline-block items-center "
        >
          <div className="flex justify-between items-center ">
            <img src={LabsLogo} alt="Labs Logo" className="h-10 w-30 mb-2" />
            <p className="font-bold mb-2 dark:text-miracle-darkBlue text-miracle-lightBlue/100">
              Booth #1234
            </p>
          </div>
          <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center m-auto">
            <img
              src={generatedImage}
              className="w-64 h-64"
              alt="Generated Caricature"
            />
          </div>
          <p className="mt-4 text-sm text-gray-600">Here is your caricature</p>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handleStartOver}
            className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-miracle-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Start Over
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-miracle-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 flex items-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GeneratedResult;
