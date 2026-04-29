"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { loginAdmin } from "@/redux/actions/admin/auth";


const Page = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  interface AdminLoginData {
    email: string;
    password: string;
    adminCode?: string; // Optional admin verification code
  }

  interface ValidationErrors {
    email?: string;
    password?: string;
    adminCode?: string;
    general?: string;
  }

  const [data, setData] = useState<AdminLoginData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdminCode, setShowAdminCode] = useState(false);

  const validateEmail = (email: string): string | undefined => {
    if (!email) {
      return "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    if (email.length > 254) {
      return "Email is too long";
    }

    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return "Password is required";
    }

    if (password.length < 8) {
      return "Admin password must be at least 8 characters long";
    }

    if (password.length > 128) {
      return "Password is too long";
    }

    // Additional admin password requirements
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      return "Password must contain uppercase, lowercase, number, and special character";
    }

    return undefined;
  };

  const validateAdminCode = (code: string): string | undefined => {
    if (showAdminCode && !code) {
      return "Admin verification code is required";
    }

    if (showAdminCode && code.length !== 6) {
      return "Admin code must be 6 characters";
    }

    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    const emailError = validateEmail(data.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(data.password);
    if (passwordError) newErrors.password = passwordError;

    if (showAdminCode) {
      const adminCodeError = validateAdminCode(data.adminCode || "");
      if (adminCodeError) newErrors.adminCode = adminCodeError;
    }

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

    if (value) {
      let fieldError: string | undefined;
      if (name === "email") {
        fieldError = validateEmail(value);
      } else if (name === "password") {
        fieldError = validatePassword(value);
      } else if (name === "adminCode") {
        fieldError = validateAdminCode(value);
      }

      if (fieldError) {
        setErrors({
          ...errors,
          [name]: fieldError,
        });
      }
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
      await dispatch(loginAdmin(data)).unwrap();
      
      // Redirect to admin dashboard
      route.push("/admin");
    } catch (err: unknown) {
      let errorMessage = "An error occurred during admin login";

      if (typeof err === "string") {
        errorMessage = err;
      }

      // If error suggests need for admin code verification
      if (errorMessage.includes("verification") || errorMessage.includes("code")) {
        setShowAdminCode(true);
        errorMessage = "Please enter your admin verification code";
      }

      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[500px]">
      {/* Admin Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-50 flex items-center justify-center rounded-full mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h2 className="text-red-700 text-2xl font-bold">Admin Access</h2>
        <p className="text-sm text-gray-600 mt-1">
          Secure login for administrative personnel only
        </p>
      </div>

      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 text-center">{errors.general}</p>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Admin Email <span className="text-red-500">*</span>
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
            value={data.email}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
              errors.email
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-red-600 focus:border-transparent"
            }`}
            placeholder="admin@company.com"
            required
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

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Admin Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className={`w-5 h-5 ${
                errors.password ? "text-red-400" : "text-gray-400"
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
              errors.password
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-red-600 focus:border-transparent"
            }`}
            placeholder="••••••••••••"
            required
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
        </div>
        {errors.password && (
          <p id="password-error" className="mt-1 text-sm text-red-600">
            {errors.password}
          </p>
        )}
      </div>

      {/* Admin Code Field - Shows conditionally */}
      {showAdminCode && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admin Verification Code <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className={`w-5 h-5 ${
                  errors.adminCode ? "text-red-400" : "text-gray-400"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              name="adminCode"
              value={data.adminCode}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 uppercase tracking-wider ${
                errors.adminCode
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-red-600 focus:border-transparent"
              }`}
              placeholder="ABC123"
              maxLength={6}
              required
              aria-invalid={errors.adminCode ? "true" : "false"}
              aria-describedby={errors.adminCode ? "adminCode-error" : undefined}
            />
          </div>
          {errors.adminCode && (
            <p id="adminCode-error" className="mt-1 text-sm text-red-600">
              {errors.adminCode}
            </p>
          )}
        </div>
      )}

      {/* Security Notice */}
      <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <div>
            <p className="text-sm text-yellow-800 font-medium">Security Notice</p>
            <p className="text-xs text-yellow-700 mt-1">
              All admin login attempts are logged and monitored for security purposes.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg ${
          isSubmitting
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        {isSubmitting ? "AUTHENTICATING..." : "ADMIN LOGIN"}
      </button>

      {/* Admin Help */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Need help accessing your admin account?{" "}
          <a
            href="#"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Contact IT Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;