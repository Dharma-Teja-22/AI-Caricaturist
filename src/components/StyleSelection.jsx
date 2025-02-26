import { motion } from "framer-motion"

const StyleSelection = ({ styles, handleStyleSelect, setStep }) => {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center dark:text-miracle-white">Choose a Style</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {styles.map((style, index) => (
          <motion.button
            key={style}
            onClick={() => handleStyleSelect(style)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              delay: index * 0.1,
            }}
            className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 transform hover:scale-105"
          >
            <img src={style || "/placeholder.svg"} alt="Style" layout="fill" objectFit="cover" />
          </motion.button>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setStep(2)}
          className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-miracle-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Back
        </button>
      </div>
    </motion.div>
  )
}

export default StyleSelection;