import API from "@/services/API";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const StyleSelection = ({ setStep, userImageURL, userId, setGeneratedImage }) => {
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state

  useEffect(() => {
    (async () => {
      const response = await API.get.getStyles();
      if (response?.status) {
        setStyles(response?.data || []);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedStyle?.Prompt) {
      setPrompt(selectedStyle.Prompt);
    }
  }, [selectedStyle]);

  const handleSelect = (style) => {
    setSelectedStyle((prevStyle) => (prevStyle?.Id === style.Id ? null : style));
  };

  const handleGenerateCaricature = async () => {
    if (selectedStyle) {
      setIsLoading(true); // Start loading
      try {        
        const response = await API.post.generateCaricature(
          userId,
          userImageURL,
          selectedStyle?.StyleImage,
          selectedStyle?.Prompt
        );
        console.log(response);
        setGeneratedImage(response?.data);

        localStorage.setItem("generatedImage", response?.data);
        setStep(3); // Move to the next step after response
      } catch (error) {
        console.error("Error generating caricature:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  const handlePromptUpdate = async () =>{
    console.log(selectedStyle?.Id, prompt); 
    try
    {
      const response = await API.put.updateStyleData(selectedStyle?.Id,prompt);
      console.log(response);
      
    }
    catch(err)
    {
      console.error(err);
      
    }
  }

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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {styles.map((style, index) => (
          <motion.button
            key={style.Id}
            onClick={() => handleSelect(style)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
            className={`relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-transform duration-200 transform hover:scale-105 ${
              selectedStyle?.Id === style.Id ? "ring-4 ring-blue-500" : ""
            }`}
          >
            <img
              src={style.StyleImage}
              alt="Style"
              className="object-cover w-full h-full"
            />
          </motion.button>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={() => setStep(1)}
          className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-600 transition"
        >
          Back
        </button>

        {selectedStyle && (
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto px-6 py-3 bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 text-miracle-white font-medium rounded-md shadow transition"
            >
              Customize Prompt
            </button>
            <button
              onClick={handleGenerateCaricature}
              disabled={isLoading} // Disable button while loading
              className={`w-full sm:w-auto px-6 py-3 rounded-md shadow transition ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 text-white"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Caricature"
              )}
            </button>
          </div>
        )}
      </div>

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
                className="px-4 py-2 bg-miracle-red hover:bg-miracle-red/80 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                // onClick={() => setShowModal(false)}
                onClick={handlePromptUpdate}
                className="px-4 py-2 bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 text-white rounded-md"
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
