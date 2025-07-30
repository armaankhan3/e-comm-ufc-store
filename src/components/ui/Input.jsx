import React from 'react';

const Input = ({ 
  label,
  error,
  type = 'text',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          w-full px-3 py-2 border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-transparent
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${error ? 'focus:ring-red-500' : 'focus:ring-neon-orange'}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
