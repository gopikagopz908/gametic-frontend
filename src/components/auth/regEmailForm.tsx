"use client";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { emailCheck } from "../../redux/actions/authantication/authanticationAction";

interface EmailData {
  email: string;
  role: "user" | "owner";
}

interface EmailFormProps {
  onEmailSubmit: (data: EmailData) => void;
  openOtp: () => void;
}

interface ValidationErrors {
  email?: string;
  role?: string;
  general?: string;
}

const EmailForm = ({ openOtp, onEmailSubmit }: EmailFormProps) => {
  const [data, setData] = useState<EmailData>({
    email: "",
    role: "user",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  const validateEmail = (email: string): string | undefined => {
    if (!email) {
      return "Email is required";
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail !== email) {
      return "Email cannot have leading or trailing spaces";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return "Please enter a valid email address";
    }

    if (trimmedEmail.length > 254) {
      return "Email address is too long";
    }

    if (trimmedEmail.includes("..")) {
      return "Email cannot contain consecutive dots";
    }

    if (trimmedEmail.startsWith(".") || trimmedEmail.endsWith(".")) {
      return "Email cannot start or end with a dot";
    }

    return undefined;
  };

  const validateRole = (role: string): string | undefined => {
    if (!role) {
      return "Please select an account type";
    }

    if (role !== "user" && role !== "owner") {
      return "Invalid account type selected";
    }

    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    const emailError = validateEmail(data.email);
    if (emailError) newErrors.email = emailError;

    const roleError = validateRole(data.role);
    if (roleError) newErrors.role = roleError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });

    if (errors[name as keyof ValidationErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }

    if (name === "email" && value) {
      const emailError = validateEmail(value);
      if (emailError) {
        setErrors({
          ...errors,
          email: emailError,
        });
      }
    }
  };

  const handleToggleChange = (role: "user" | "owner") => {
    setData({
      ...data,
      role: role,
    });

    if (errors.role) {
      setErrors({
        ...errors,
        role: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setErrors((prev) => ({ ...prev, general: undefined }));

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(emailCheck(data)).unwrap();
      onEmailSubmit(data);
      localStorage.setItem("email", data.email);
      openOtp();
    } catch (error: unknown) {
      console.error("Failed to send OTP:", error);

      let errorMessage = "Failed to send OTP. Please try again.";

      if (typeof error === "string") {
        errorMessage = error;
      }

      if (errorMessage.toLowerCase().includes("email")) {
        setErrors({ email: errorMessage });
      } else if (
        errorMessage.toLowerCase().includes("role") ||
        errorMessage.toLowerCase().includes("account")
      ) {
        setErrors({ role: errorMessage });
      } else {
        setErrors({ general: errorMessage });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 text-center">{errors.general}</p>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Account Type <span className="text-red-500">*</span>
        </label>
        <div
          className={`flex rounded-lg border p-1 ${
            errors.role ? "border-red-300" : "border-gray-300"
          }`}
        >
          <button
            type="button"
            onClick={() => handleToggleChange("user")}
            className={`flex-1 py-2 px-4 rounded-md text-center text-sm font-medium transition-colors duration-200 ${
              data.role === "user"
                ? "bg-[#00423D] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-pressed={data.role === "user"}
          >
            User Account
          </button>
          <button
            type="button"
            onClick={() => handleToggleChange("owner")}
            className={`flex-1 py-2 px-4 rounded-md text-center text-sm font-medium transition-colors duration-200 ${
              data.role === "owner"
                ? "bg-[#00423D] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-pressed={data.role === "owner"}
          >
            Owner Account
          </button>
        </div>
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">{errors.role}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className={`w-5 h-5 ${
                errors.email ? "text-red-400" : "text-gray-400"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </div>
          <input
            type="email"
            name="email"
            required
            value={data.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
              errors.email
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-[#00423D] focus:border-transparent"
            }`}
            placeholder="you@example.com"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </div>
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg ${
          isSubmitting
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-[#00423D] text-white hover:bg-[#415C41]"
        }`}
      >
        {isSubmitting ? "SENDING OTP..." : "CONTINUE"}
      </button>
    </div>
  );
};

export default EmailForm;
