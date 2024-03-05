import React from "react";

const Button = ({ children, handleOnClick, disabled = false, styles = "" }) => {
  return (
    <div>
      <button
        disabled={disabled}
        onClick={() => handleOnClick()}
        className={`bg-neutral-100 text-gray-800 border- border-white py-2 px-4 rounded-lg font-semibold hover:text-white hover:bg-transparent transition-all duration-400 ${styles}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
