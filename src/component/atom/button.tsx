import React from "react";
import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  icon?: React.ReactNode; // Add icon prop
  iconPosition?: "left" | "right"; // Optional: icon position
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "medium",
  className,
  isLoading = false,
  icon,
  iconPosition = "left", // Default position
  ...props
}) => {
  const variantClasses = {
    primary: "bg-[#004389] hover:bg-[#0059B8] text-white",
    secondary: "bg-[#75AFD1] hover:bg-[#94C1DB] font-semibold text-[#142E3D]",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        variantClasses[variant]
      } ${sizeClasses[size]} ${className} ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 mr-3 ..."
            viewBox="0 0 24 24"
          ></svg>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          {icon && iconPosition === "left" && <span>{icon}</span>}
          <span>{label}</span>
          {icon && iconPosition === "right" && <span>{icon}</span>}
        </div>
      )}
    </button>
  );
};

export default Button;
