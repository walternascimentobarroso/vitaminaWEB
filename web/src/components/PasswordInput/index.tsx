import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { RxEyeClosed } from "react-icons/rx";

const PasswordInput = ({
  label,
  name,
  placeholder = "",
  value,
  onChange,
  onBlur = () => {},
  readOnly = false,
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label
        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white dark:bg-gray-800"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={`bg-white dark:bg-gray-700 border border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full px-3 py-2 mb-3
        ${readOnly && "bg-gray-100 dark:bg-gray-900"}`}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          readOnly={readOnly}
          onBlur={onBlur}
        />
        <div
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <RxEyeClosed className="text-gray-500" />
          ) : (
            <FaRegEye className="text-gray-500" />
          )}
        </div>
      </div>
      {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
    </div>
  );
};

export default PasswordInput;
