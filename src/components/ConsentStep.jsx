import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { UserContext } from "@/App";

const formSchema = z.object({
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must give consent to continue." }),
  }),
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  designation: z.string().optional(),
  aiUseCase: z.string().min(1, "AI use case is required"),
});

const ConsentStep = ({ setUserData }) => {
  const { setStep } = useContext(UserContext);
  const [consent, setConsent] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [aiUseCase, setAiUseCase] = useState("");
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState({
    consent: false,
    fullName: false,
    email: false,
    aiUseCase: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { consent, fullName, email, designation, aiUseCase };
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const updatedErrors = {
        consent: fieldErrors.consent ? "Consent is required" : undefined,
        fullName: fieldErrors.fullName ? "Full Name is required" : undefined,
        email: fieldErrors.email ? "Corporate email is required" : undefined,
        aiUseCase: fieldErrors.aiUseCase
          ? "AI use case is required"
          : undefined,
      };
      setErrors(updatedErrors);
      // setErrors(fieldErrors);
      const newShake = {
        consent: !!fieldErrors.consent,
        fullName: !!fieldErrors.fullName,
        email: !!fieldErrors.email,
        aiUseCase: !!fieldErrors.aiUseCase,
      };
      setShake(newShake);
      setTimeout(
        () =>
          setShake({
            consent: false,
            fullName: false,
            email: false,
            aiUseCase: false,
          }),
        500
      );
      return;
    }
    setErrors({});
    localStorage.setItem("userData", JSON.stringify(formData));
    setUserData(formData);
    setStep(1);
    console.log("data", formData);
  };

  const handleConsentChange = (checked) => {
    setConsent(checked);

    if (checked && errors.consent) {
      setErrors({ ...errors, consent: undefined });
    }
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value;

    setFullName(value);

    if (value && errors.fullName) {
      setErrors({ ...errors, fullName: undefined });
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;

    setEmail(value);

    if (value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(value)) {
        setErrors({ ...errors, email: "Please enter a correct email" });
      } else {
        setErrors({ ...errors, email: undefined });
      }
    } else {
      setErrors({ ...errors, email: undefined });
    }
  };

  const handleAiUseCaseChange = (e) => {
    const value = e.target.value;

    setAiUseCase(value);

    if (value && errors.aiUseCase) {
      setErrors({ ...errors, aiUseCase: undefined });
    }
  };

  const wiggle = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      key="consent-step"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg w-full mx-auto px-4 sm:px-6 lg:px-8 "
    >
      <div className="bg-white dark:bg-miracle-white text-miracle-black shadow-lg rounded-lg p-6 sm:p-8 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-miracle-black mb-6">
          User Consent and Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            className="flex items-center p-0 space-x-2"
            animate={shake.consent ? wiggle : {}}
          >
            <Checkbox
              id="consent"
              checked={consent}
              // onCheckedChange={setConsent}
              onCheckedChange={handleConsentChange}
            />
            <Label
              htmlFor="consent"
              className="text-sm text-gray-700 dark:text-gray-500 text-center"
            >
              I'm allowed to record my personal data for this application.
            </Label>
          </motion.div>
          {errors.consent && (
            <p className="text-red-500 text-sm">{errors.consent}</p>
          )}
          {consent && (
            <>
              <motion.div
                className="space-y-2"
                animate={shake.fullName ? wiggle : {}}
              >
                <Label htmlFor="fullName" className="text-left block">
                  Full Name<span className="text-miracle-red aira" aria-hidden="true">*</span>
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  placeholder="Jane Doe"
                  // onChange={(e) => setFullName(e.target.value)}
                  onChange={handleFullNameChange}
                  className={`w-full bg-miracle-white border border-miracle-lightGrey/20${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
              </motion.div>
              <motion.div
                className="space-y-2"
                animate={shake.email ? wiggle : {}}
              >
                <Label htmlFor="email" className="text-left block">
                  Corporate Email<span className="text-miracle-red aira" aria-hidden="true">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  onChange={handleEmailChange}
                  placeholder="jane.doe@example.com"
                  className={`w-full bg-miracle-white border border-miracle-lightGrey/20${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </motion.div>
              <div className="space-y-2">
                <Label htmlFor="designation" className="text-left block">
                  Designation (Optional)
                </Label>
                <Input
                  id="designation"
                  value={designation}
                  placeholder="Software Developer"
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full bg-miracle-white border border-miracle-lightGrey/20"
                />
              </div>
              <motion.div
                className="space-y-2"
                animate={shake.aiUseCase ? wiggle : {}}
              >
                <Label htmlFor="aiUseCase" className="text-left block">
                  Most sought-after AI use case<span className="text-miracle-red aira" aria-hidden="true">*</span>
                </Label>
                <Input
                  id="aiUseCase"
                  value={aiUseCase}
                  placeholder="AI-powered early disease detection and diagnosis."
                  // onChange={(e) => setAiUseCase(e.target.value)}
                  onChange={handleAiUseCaseChange}
                  className={`w-full bg-miracle-white border border-miracle-lightGrey/20${
                    errors.aiUseCase ? "border-red-500" : ""
                  }`}
                />
                {errors.aiUseCase && (
                  <p className="text-red-500 text-sm">{errors.aiUseCase}</p>
                )}
              </motion.div>
            </>
          )}
          <button
            type="submit"
            className="mt-6 px-6 py-3 w-full border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-miracle-darkBlue hover:bg-miracle-darkBlue/80 transition-colors duration-200"
          >
            Continue
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default ConsentStep;
