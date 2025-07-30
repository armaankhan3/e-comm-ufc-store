import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  ...props 
}) => {
  const baseStyles = 'rounded-lg font-semibold transition-all duration-300 flex items-center justify-center';
  
  const variants = {
    primary: 'bg-neon-orange hover:bg-opacity-90 text-white',
    secondary: 'bg-neon-pink hover:bg-opacity-90 text-white',
    outline: 'border-2 border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-white',
    ghost: 'text-neon-orange hover:bg-neon-orange hover:bg-opacity-10'
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
      `}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
