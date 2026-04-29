"use client";
import LoginForm from "./loginForm";
import { useEffect, useState } from "react";
import OTPForm from "./otpForm";
import EmailForm from "./regEmailForm";
import CredentialsForm from "./credentialForm";

import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useAppDispatch } from "@/redux/hooks";
import { googleLogin } from "@/redux/actions/authantication/authanticationAction";
import { useRouter } from "next/navigation";

export interface LoginModalProps {
  open: boolean;
  toggle: string;
  onClose: () => void;
}
interface EmailData {
  email: string;
  role: "user" | "owner";
}

export default function AuthModal({ open, onClose, toggle }: LoginModalProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [toggleAuth, setToggleAuth] = useState<string>(toggle);
  const [otpOpen, setOtpOpen] = useState<boolean>(false);
  const [openCredential, setOpenCredential] = useState<boolean>(false);
  const [data, setData] = useState<EmailData>({
    email: "",
    role: "user",
  });

  useEffect(() => {
    setToggleAuth(toggle);
  }, [toggle]);
  const openOtp = () => {
    setOtpOpen(true);
  };
  const credentialOpen = () => {
    setOtpOpen(false);
    setOpenCredential(true);
  };

  const onEmailSubmit = (emailData: EmailData) => {
    setData(emailData);
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    await dispatch(googleLogin(credentialResponse.credential!));
    router.push("/home");
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
        <div
          className="bg-white w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl flex relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-1/2 hidden md:block bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url('register.png')` }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00423D]/70 to-[#415C41]/80"></div>

            <div className="absolute bottom-10 left-6 right-6 text-white">
              <h3 className="text-2xl font-bold mb-2">
                {toggleAuth === "login"
                  ? "Welcome back!"
                  : "Join our platform today!"}
              </h3>
              <p className="text-white/80">
                {toggleAuth === "login"
                  ? "Log in to access your account and explore all the features our platform offers."
                  : "Create an account to personalize your experience, connect with others, and unlock exclusive features."}
              </p>
            </div>
          </div>

          <div
            className={`w-full md:w-1/2  bg-white relative ${
              toggleAuth === "register" ? "p-4 sm:p-6" : "p-6 sm:p-8"
            }`}
          >
            {otpOpen ? (
              <OTPForm credentialOpen={credentialOpen} />
            ) : openCredential ? (
              <CredentialsForm email={data.email} role={data.role} />
            ) : (
              <>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-200 p-2 rounded-full hover:bg-gray-100"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className={`text-center mb-8`}>
                  <div className="w-16 h-16 bg-[#98916D]/10 flex items-center justify-center rounded-full mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-[#00423D]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                      />
                    </svg>
                  </div>
                  <h2 className="text-[#00423D] text-2xl font-bold">
                    {toggleAuth === "login" ? "Welcome back" : "Welcome aboard"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {toggleAuth === "login"
                      ? "Log in to continue to your account"
                      : "Sign in to continue to your account"}
                  </p>
                </div>

                <div className={`mb-6`}>
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      console.log("Google login failed");
                    }}
                  />
                </div>

                <div className={`flex items-center my-3`}>
                  <div className="flex-1 border-t border-gray-300"></div>
                  <div className="px-4 text-sm text-gray-500">
                    or continue with email
                  </div>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {toggleAuth === "login" ? (
                  <LoginForm />
                ) : (
                  <EmailForm openOtp={openOtp} onEmailSubmit={onEmailSubmit} />
                )}

                <div className={`text-center text-sm mt-6`}>
                  {toggleAuth === "login"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <a
                    href="#"
                    className="text-[#415C41] font-medium hover:text-[#998869] transition duration-200 ml-1"
                    onClick={() => {
                      if (toggleAuth === "login") {
                        setToggleAuth("register");
                      } else {
                        setToggleAuth("login");
                      }
                    }}
                  >
                    {toggleAuth === "login" ? "Create an account" : "Log in"}
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
