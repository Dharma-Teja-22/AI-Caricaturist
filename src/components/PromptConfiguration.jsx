import { motion } from "framer-motion"

const PromptConfiguration = ({ prompts, selectedPrompts, handlePromptToggle, setStep }) => {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-miracle-white mb-6 text-center">Select a prompt</h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 1 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {prompts.map((prompt) => (
          <motion.div
            key={prompt}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 200 },
              },
            }}
            className={`relative p-5 rounded-lg shadow-md text-center transition-all duration-200 transform hover:scale-105 ${
              selectedPrompts.includes(prompt)
                ? "dark:bg-miracle-darkBlue/100 bg-miracle-darkBlue/90 text-miracle-white hover:bg-miracle-darkBlue/80"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            }`}
          >
            <button onClick={() => handlePromptToggle(prompt)} className="w-full h-full">
              {prompt}
            </button>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => {setStep(1);
            // localStorage.setItem("step",1);
          }}
          className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-miracle-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Back
        </button>
        {selectedPrompts.length > 0 &&
          <button
          onClick={() => {setStep(3);
            // localStorage.setItem("step",3);
          }}
          className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-miracle-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Next
        </button>}
      </div>
    </motion.div>
  )
}

export default PromptConfiguration;
