import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  label: string;
  options: SelectOption[];
  onSelect: (value: string) => void;
}

const CustomSelect: React.FC<SelectProps> = ({
  name,
  label,
  options,
  onSelect,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <div className="mb-4">
      <label
        className="block mb-2 text-sm font-bold text-gray-700 dark:text-white dark:bg-gray-800"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <select
          value={selectedValue}
          onChange={handleSelectChange}
          className={`bg-white dark:bg-gray-700 border border-gray-300 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full px-3 py-2 mb-3 appearance-none
          ${
            !selectedValue ? "text-gray-400" : "text-gray-900 dark:text-white"
          }`}
        >
          <option value="" disabled hidden className="text-gray-400">
            Selecione uma opção
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <MdKeyboardArrowDown className="h-5 w-5 text-gray-400 dark:text-white" />
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
