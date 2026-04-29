"use client";
import { registerUser } from "@/redux/actions/authantication/authanticationAction";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CredentialsData {
  username: string;
  password: string;
}

interface CredentialsFormProps {
  email: string;
  role: "user" | "owner";
}

interface ValidationErrors {
  username?: string;
  password?: string;
  general?: string;
}

interface PasswordRequirements {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

const CredentialsForm = ({ email, role }: CredentialsFormProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [data, setData] = useState<CredentialsData>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  const validateUsername = (username: string): string | undefined => {
    if (!username) {
      return "Username is required";
    }

    const trimmedUsername = username.trim();
    if (trimmedUsername !== username) {
      return "Username cannot have leading or trailing spaces";
    }

    if (trimmedUsername.length < 3) {
      return "Username must be at least 3 characters long";
    }

    if (trimmedUsername.length > 30) {
      return "Username must be less than 30 characters";
    }

    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(trimmedUsername)) {
      return "Username can only contain letters, numbers, underscores, and hyphens";
    }

    if (
      trimmedUsername.startsWith("_") ||
      trimmedUsername.startsWith("-") ||
      trimmedUsername.endsWith("_") ||
      trimmedUsername.endsWith("-")
    ) {
      return "Username cannot start or end with underscore or hyphen";
    }

    if (
      trimmedUsername.includes("__") ||
      trimmedUsername.includes("--") ||
      trimmedUsername.includes("_-") ||
      trimmedUsername.includes("-_")
    ) {
      return "Username cannot contain consecutive special characters";
    }

    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return "Password is required";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }

    if (password.length > 128) {
      return "Password is too long (maximum 128 characters)";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return "Password must contain at least one special character";
    }

    const commonPasswords = [
      "password",
      "12345678",
      "qwerty123",
      "password123",
    ];
    if (
      commonPasswords.some((common) => password.toLowerCase().includes(common))
    ) {
      return "Password is too common. Please choose a stronger password";
    }

    return undefined;
  };

  const getPasswordRequirements = (password: string): PasswordRequirements => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    const usernameError = validateUsername(data.username);
    if (usernameError) newErrors.username = usernameError;

    const passwordError = validatePassword(data.password);
    if (passwordError) newErrors.password = passwordError;

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
      if (name === "username") {
        fieldError = validateUsername(value);
      } else if (name === "password") {
        fieldError = validatePassword(value);
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

    const credential = {
      username: data.username.trim(),
      password: data.password,
      email,
      role,
    };

    try {
      await dispatch(registerUser(credential)).unwrap();
      const role = credential.role;
      if (role === "user") {
        router.push("/home");
      } else {
        router.push("/owner");
      }
    } catch (error: unknown) {
      console.error("Registration failed:", error);

      let errorMessage = "Registration failed. Please try again.";

      if (typeof error === "string") {
        errorMessage = error;
      }

      if (errorMessage.toLowerCase().includes("username")) {
        setErrors({ username: errorMessage });
      } else if (errorMessage.toLowerCase().includes("password")) {
        setErrors({ password: errorMessage });
      } else {
        setErrors({ general: errorMessage });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordRequirements = getPasswordRequirements(data.password);

  return (
    <div className="w-full">
      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Email:</span> {email}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Account Type:</span>{" "}
          {role === "user" ? "User Account" : "Owner Account"}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className={`w-5 h-5 ${
                errors.username ? "text-red-400" : "text-gray-400"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
              errors.username
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-[#00423D] focus:border-transparent"
            }`}
            placeholder="johndoe"
            required
            aria-invalid={errors.username ? "true" : "false"}
            aria-describedby={errors.username ? "username-error" : undefined}
          />
        </div>
        {errors.username && (
          <p id="username-error" className="mt-1 text-sm text-red-600">
            {errors.username}
          </p>
        )}
        {!errors.username && data.username && (
          <p className="mt-1 text-xs text-gray-500">
            3-30 characters, letters, numbers, underscore, and hyphen only
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password <span className="text-red-500">*</span>
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
            onFocus={() => setShowPasswordRequirements(true)}
            onBlur={() => setShowPasswordRequirements(false)}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
              errors.password
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-[#00423D] focus:border-transparent"
            }`}
            placeholder="••••••••"
            required
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={
              errors.password ? "password-error" : "password-requirements"
            }
          />
        </div>

        {(showPasswordRequirements || data.password) && errors.password && (
          <div
            id="password-requirements"
            className="mt-2 p-3 bg-gray-50 rounded-lg"
          >
            <p className="text-xs font-medium text-gray-700 mb-2">
              Password Requirements:
            </p>
            <div className="space-y-1">
              <div
                className={`flex items-center text-xs ${
                  passwordRequirements.minLength
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                <span className="mr-2">
                  {passwordRequirements.minLength ? "✓" : "○"}
                </span>
                At least 8 characters long
              </div>
              <div
                className={`flex items-center text-xs ${
                  passwordRequirements.hasUppercase
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                <span className="mr-2">
                  {passwordRequirements.hasUppercase ? "✓" : "○"}
                </span>
                Contains uppercase letter (A-Z)
              </div>
              <div
                className={`flex items-center text-xs ${
                  passwordRequirements.hasLowercase
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                <span className="mr-2">
                  {passwordRequirements.hasLowercase ? "✓" : "○"}
                </span>
                Contains lowercase letter (a-z)
              </div>
              <div
                className={`flex items-center text-xs ${
                  passwordRequirements.hasNumber
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                <span className="mr-2">
                  {passwordRequirements.hasNumber ? "✓" : "○"}
                </span>
                Contains number (0-9)
              </div>
              <div
                className={`flex items-center text-xs ${
                  passwordRequirements.hasSpecialChar
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                <span className="mr-2">
                  {passwordRequirements.hasSpecialChar ? "✓" : "○"}
                </span>
                Contains special charcters
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Register Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg ${
          isSubmitting
            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
            : "bg-[#00423D] text-white hover:bg-[#415C41]"
        }`}
      >
        {isSubmitting ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
      </button>
    </div>
  );
};

export default CredentialsForm;
