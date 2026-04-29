"use client";

import { useAppDispatch } from "@/redux/hooks";
import { useState, useRef, useEffect } from "react";
import { emailverification } from "../../redux/actions/authantication/authanticationAction";

interface OTPFormProps {
  credentialOpen: () => void;
}

interface ValidationErrors {
  otp?: string;
  email?: string;
  network?: string;
}

const OTPForm = ({ credentialOpen }: OTPFormProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [canResend, setCanResend] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isResending, setIsResending] = useState(false);
  // const [resendAttempts, setResendAttempts] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const dispatch = useAppDispatch();

  const email = localStorage.getItem("email") || "";

  // const MAX_RESEND_ATTEMPTS = 3;
  // const RESEND_TIMEOUT = 120; // 2 minutes

  useEffect(() => {
    inputRefs.current[0]?.focus();
    
    if (!email) {
      setErrors(prev => ({
        ...prev,
        email: "Email not found. Please log in again."
      }));
    }
  }, [email]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const validateOTP = (otpArray: string[]): string | null => {
    const otpString = otpArray.join("");
    
    if (otpString.length === 0) {
      return "Please enter the verification code.";
    }
    
    if (otpString.length < 6) {
      return "Please enter a complete 6-digit verification code.";
    }
    
    if (!/^\d{6}$/.test(otpString)) {
      return "Verification code must contain only numbers.";
    }
    
    return null;
  };

  const validateEmail = (): string | null => {
    if (!email) {
      return "Email not found. Please log in again.";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    
    return null;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const setError = (type: keyof ValidationErrors, message: string) => {
    setErrors(prev => ({
      ...prev,
      [type]: message
    }));
  };

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (errors.otp) {
      setErrors(prev => ({ ...prev, otp: undefined }));
    }

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
    
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    
    if (!/^\d+$/.test(pasteData)) {
      setError("otp", "Pasted content must contain only numbers.");
      return;
    }
    
    const pasteArray = pasteData.slice(0, 6).split("");
    
    if (pasteArray.length < 6) {
      setError("otp", "Pasted code must be 6 digits long.");
      return;
    }

    const newOtp = new Array(6).fill("");
    pasteArray.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    
    setOtp(newOtp);
    clearErrors();

    const nextIndex = Math.min(pasteArray.length - 1, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    clearErrors();
    
    const emailError = validateEmail();
    if (emailError) {
      setError("email", emailError);
      return;
    }

    const otpError = validateOTP(otp);
    if (otpError) {
      setError("otp", otpError);
      return;
    }

    const otpString = otp.join("");
    setIsSubmitting(true);

    try {
      await dispatch(emailverification({ email, otp: otpString })).unwrap();
      credentialOpen();
    } catch (err: unknown) {
      console.error("OTP verification failed:", err);
      
      if (err) {
        setError("otp", "Invalid verification code. Please try again.");
      } 
      
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleResendOTP = async () => {
  //   if (isResending || resendAttempts >= MAX_RESEND_ATTEMPTS) return;
    
  //   clearErrors();
    
  //   // Validate email before resending
  //   const emailError = validateEmail();
  //   if (emailError) {
  //     setError("email", emailError);
  //     return;
  //   }

  //   setIsResending(true);
    
  //   try {
  //     // Add your resend OTP API call here
  //     // await dispatch(resendOTP({ email })).unwrap();
      
  //     console.log("Resending OTP...");
      
  //     // Reset form state
  //     setTimeLeft(RESEND_TIMEOUT);
  //     setCanResend(false);
  //     setOtp(new Array(6).fill(""));
  //     setResendAttempts(prev => prev + 1);
      
  //     // Focus first input
  //     setTimeout(() => {
  //       inputRefs.current[0]?.focus();
  //     }, 100);
      
  //   } catch (err) {
  //     console.error("Resend OTP failed:", err);
      
  //     if (err?.response?.status === 429) {
  //       setError("network", "Too many resend requests. Please wait before trying again.");
  //     } else {
  //       setError("network", "Failed to resend code. Please try again.");
  //     }
      
  //   } finally {
  //     setIsResending(false);
  //   }
  // };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isFormValid = () => {
    return otp.join("").length === 6 && !Object.values(errors).some(error => error) && email;
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-[#00423D] rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Verify Your Email</h2>
        <p className="text-sm text-gray-600">
          We&apos;ve sent a 6-digit verification code to{" "}
          <span className="font-medium">{email || "your email address"}</span>. 
          Please enter it below.
        </p>
      </div>

      {errors.email && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errors.email}</p>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
          Enter Verification Code
        </label>
        <div className="flex justify-center gap-3">
          {otp.map((data, index) => (
            <input
              key={index}
              type="tel"
              pattern="\d*"
              inputMode="numeric"
              name="otp"
              maxLength={1}
              value={data}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={isSubmitting}
              className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${
                errors.otp 
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500" 
                  : "border-gray-300 focus:ring-[#00423D] focus:border-transparent"
              }`}
              required
              aria-label={`Digit ${index + 1} of verification code`}
            />
          ))}
        </div>
        
        {/* OTP Error */}
        {errors.otp && (
          <p className="text-red-500 text-sm mt-2 text-center" role="alert">
            {errors.otp}
          </p>
        )}
      </div>

      <div className="text-center mb-6">
        {!canResend ? (
          <p className="text-sm text-gray-600">
            Resend code in{" "}
            <span className="font-medium text-[#00423D]">{formatTime(timeLeft)}</span>
          </p>
        ) : (
          <div>
            {/* <button
              // onClick={handleResendOTP}
              disabled={isResending || resendAttempts >= MAX_RESEND_ATTEMPTS}
              className="text-sm text-[#00423D] hover:text-[#415C41] font-medium transition duration-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {isResending ? "Sending..." : "Didn't receive the code? Resend"}
            </button>
            {resendAttempts >= MAX_RESEND_ATTEMPTS && (
              <p className="text-xs text-red-500 mt-1">
                Maximum resend attempts reached. Please contact support if needed.
              </p>
            )}
            {resendAttempts > 0 && resendAttempts < MAX_RESEND_ATTEMPTS && (
              <p className="text-xs text-gray-500 mt-1">
                Resend attempts: {resendAttempts}/{MAX_RESEND_ATTEMPTS}
              </p>
            )} */}
          </div>
        )}
      </div>

      {errors.network && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errors.network}</p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!isFormValid() || isSubmitting}
        className="w-full bg-[#00423D] text-white py-3 rounded-lg font-medium hover:bg-[#415C41] transition duration-300 shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        aria-label="Verify OTP code"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            VERIFYING...
          </>
        ) : (
          "VERIFY CODE"
        )}
      </button>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Check your spam folder if you don&apos;t see the email in your inbox.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          The verification code will expire in {formatTime(timeLeft)}.
        </p>
      </div>
    </div>
  );
};

export default OTPForm;