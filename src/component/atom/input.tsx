import React, { useState, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, iconPosition = "left", type = "text", className, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const isPasswordType = type === "password";
    const inputType = isPasswordType && showPassword ? "text" : type;

    return (
      <div className={`flex text-black flex-col mb-4 ${className}`}>
        {label && <label className="mb-1 text-sm font-medium">{label}</label>}
        <div
          className={`border rounded-xl p-2 relative ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <input
            ref={ref} // Pass the ref to the input
            type={inputType}
            className={`bg-transparent w-full ${
              iconPosition === "right" ? "pr-10" : ""
            } focus:outline-none focus:ring-0`}
            {...props}
          />

          {isPasswordType && (
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          )}
        </div>
        {error && <span className="mt-1 text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
