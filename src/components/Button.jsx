import React from "react";

const Button = ({
  children,
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      {...props}
      className={`
        px-4 py-2 rounded-xl text-white font-medium
        transition duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;