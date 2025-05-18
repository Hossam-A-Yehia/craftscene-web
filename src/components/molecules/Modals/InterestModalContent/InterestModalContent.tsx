import React from "react";
import { BiHeart } from "react-icons/bi";

interface ButtonProps {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick }) => {
  const baseClasses = "px-5 py-2 rounded-full font-medium transition-all duration-300 text-center";
  
  const variantClasses = {
    primary: "bg-pink-600 text-white hover:bg-pink-700 shadow-md hover:shadow-lg",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200",
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface InterestModalContentProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const InterestModalContent: React.FC<InterestModalContentProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl max-w-sm mx-auto transition-all duration-300 transform hover:translate-y-[-8px]">
      <div className="flex flex-col items-center space-y-6">
        {/* Icon container with animated pulse effect */}
        <div className="p-4 bg-pink-50 rounded-full animate-pulse">
          <BiHeart className="w-10 h-10 text-pink-500" strokeWidth={1.5} />
        </div>
        
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-800">Add Your Interests</h3>
          <p className="text-gray-500 max-w-xs">Personalize your experience by adding interests that matter to you</p>
        </div>
        
        <div className="flex w-full justify-between space-x-4 pt-4">
          <Button variant="secondary" onClick={onCancel}>
            Skip for now
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Add interests
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterestModalContent;