import { motion } from "framer-motion"

const GenerationProcess = ({ title, subTitle, loading, loadingAnimation, MiracleLoader }) => {
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-md mx-auto"
    >
      
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 dark:text-gray-200">{title}</h2>
      <p className="text-sm sm:text-lg text-gray-600 mb-8 dark:text-gray-300">{subTitle}</p>
      {loading === true ? (
        <div className="flex item-center w-fit justify-center m-auto">
          <img src={MiracleLoader || "/placeholder.svg"} alt="Loader" width={150} height={150} />
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={loadingAnimation}
            className="px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-sm text-miracle-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 transform hover:scale-105"
          >
            Generate
          </button>
        </div>
      )}
    </motion.div>
  )
}

export default GenerationProcess;
