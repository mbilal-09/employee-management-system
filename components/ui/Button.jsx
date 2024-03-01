import React from "react";

const Button = ({ children, handleOnClick, disabled = false, styles = "" }) => {
  return (
    <div>
      <button
        disabled={disabled}
        onClick={() => handleOnClick()}
        className={`bg-white from-[--primary] to-[--secondary] text-[--primary] border-2 border-white py-2 px-4 rounded-lg font-semibold hover:text-white hover:bg-transparent transition-all delay-75 duration-700 ${styles}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
