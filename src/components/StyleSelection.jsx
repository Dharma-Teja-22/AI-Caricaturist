import API from "@/services/API";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const StyleSelection = ({ setStep }) => {
  const [styles, setStyles] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    (async () => {
      const response = await API.get.getStyles();
      setStyles(response?.blobsList);
    })();
  }, []);

  const handleSelect = (style) => {
    setSelectedStyle((prevStyle) => (prevStyle === style ? null : style));
  };  

  const handleGenerateCaricature = () => {
    if (selectedStyle) {
      setStep(3);
    }
  };

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center dark:text-miracle-white">
        Choose a Style
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {styles &&
          styles.map((style, index) => (
            <motion.button
              key={style}
              onClick={() => handleSelect(style)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                delay: index * 0.1,
              }}
              className={`relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-transform duration-200 transform hover:scale-105 ${
                selectedStyle === style ? "ring-4 ring-blue-500" : ""
              }`}
            >
              <img
                src={style}
                alt="Style"
                className="object-cover w-full h-full"
              />
            </motion.button>
          ))}
      </div>

      {/* Buttons Section */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Back Button */}
        <button
          onClick={() => setStep(1)}
          className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-600 transition"
        >
          Back
        </button>

        {/* Action Buttons (Only show when a style is selected) */}
        {selectedStyle && (
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition"
            >
              Customize Prompt
            </button>
            <button
              onClick={handleGenerateCaricature}
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 transition"
            >
              Generate Caricature
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-miracle-black">
              Enter Your Prompt
            </h3>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-2 border rounded-md bg-miracle-white text-miracle-black"
              placeholder="Enter your prompt..."
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
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

export default StyleSelection;
