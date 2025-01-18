import React, { useState, ReactNode } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
}) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${className}`}>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Popup Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div
          className="relative bg-white rounded-lg shadow-xl max-w-md mx-auto transform transition-all"
          onClick={(e) => e.stopPropagation()} // Prevents closing when clicked inside
        >
          {/* Header */}
          {title && (
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
          )}
          {/* Content */}
          <div className="p-6">{children}</div>
          {/* Close Button (Optional) */}
          <div className="px-6 py-4 text-right border-t">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
