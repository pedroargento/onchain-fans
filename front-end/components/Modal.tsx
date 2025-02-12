"use client";
import { ReactNode } from "react";

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: ReactNode }) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
          ✖
        </button>
        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
