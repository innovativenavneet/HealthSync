import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // Options: primary, secondary, danger, success
  size = "medium", // Options: small, medium, large
  disabled = false,
  className = "", // For additional custom styles
}) => {
  // Base styles
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring transition-all duration-300";

  // Size styles
  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-5 py-3 text-lg",
  };

  // Variant styles
  const variantStyles = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300",
    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300",
    success:
      "bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-300",
  };

  // Disabled styles
  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${
        variantStyles[variant]
      } ${disabled ? disabledStyles : ""} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
