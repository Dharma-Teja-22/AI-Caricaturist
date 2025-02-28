// import CaricatureGeneration from "./components/CaricatureGeneration";
import Caricature from "./components/Caricature";
import { useState,createContext,useEffect } from "react";

export const UserContext = createContext();

function App() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({});
  useEffect(()=>{
    
    if(localStorage.getItem("step"))
    {
      setStep(JSON.parse(localStorage.getItem("step")));
    }
    if(localStorage.getItem("userData")){
      setUserData(localStorage.getItem("userData"));
    }
  },[])


  useEffect(()=>{
    if(step) localStorage.setItem("step",step);
  },[step])


  return (
    <>
      {/* <CaricatureGeneration/> */}
      <UserContext.Provider value={{step, setStep, userData, setUserData}} >
        <div className="h-full w-full">
          <Caricature />
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
