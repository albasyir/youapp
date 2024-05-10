// components/atoms/InputField.tsx

import React from 'react';

interface InputFieldProps {
  id?: string;
  label?: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, value, onChange, placeholder, className }) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={id}
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;
