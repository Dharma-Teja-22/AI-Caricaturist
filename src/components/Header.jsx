import { ThemeToggle } from "@/components/themes/ThemeToggle.jsx"
import LabsLogoBlack from "../assets/labsBlack.png";
import LabsLogoWhite from "../assets/labsWhite.png";

const Header = ({ step, theme }) => {
  return (
    <header className="bg-miracle-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center space-x-6 mb-4 sm:mb-0">
          <img
            src={theme === "light" || theme === "system" ? LabsLogoBlack : LabsLogoWhite}
            alt="Labs Logo"
            width={120}
            height={120}
          />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-miracle-white m-auto">
            AI Caricature Generator
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500 dark:text-gray-200">Step {step} of 5</span>
          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="dark:bg-miracle-lightBlue/80 rounded-full h-2 transition-all duration-500 ease-out bg-miracle-mediumBlue"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header;