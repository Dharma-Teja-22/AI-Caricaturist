import { ThemeToggle } from "@/components/themes/ThemeToggle.jsx"
import LabsLogoBlack from "../assets/symbolBlack.png";
import LabsLogoWhite from "../assets/symbolWhite.png";
import fullLabsWhiteLogo from '../assets/labsWhite.png'
import fullLabsBlackLogo from '../assets/labsBlack.png'

const Header = ({ step, theme }) => {
  return (
    <header className="bg-miracle-white dark:bg-gray-800 shadow-sm ">
      <div className="max-w-full mx-auto md:p-4 flex flex-col sm:flex-row items-center justify-between py-2">
        <div className="flex w-full sm:w-fit items-center mb-1 sm:mb-0">

          {/* mobile logo */}
          <img
            src={theme === "light" || theme === "system" ? LabsLogoBlack : LabsLogoWhite}
            alt="Labs Logo"
            width={40}
            height={40}
            className="sm:hidden ml-1"
          />

          {/* desktop logo */}
          <img
            src={theme === "light" || theme === "system" ? fullLabsBlackLogo : fullLabsWhiteLogo}
            alt="Labs Logo"
            width={120}
            height={120}
            className="hidden sm:block"
          />
          <h1 className="text-xl md:text-2xl flex-1 font-semibold text-gray-900 dark:text-miracle-white ml-1">
            AI Caricature Generator
          </h1>
          <div className="sm:hidden">
            <ThemeToggle/>
          </div>
            {/* <ThemeToggle className='border border-red-600' /> */}
        </div>
        <div className="sm:flex items-center space-x-4 hidden">
          <span className="text-sm text-gray-500 dark:text-gray-200 ">Step {step} of 5</span>
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