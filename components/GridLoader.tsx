"use client const [isModalOpen, setIsModalOpen] = useState(false);";
import { ReactNode, useState } from "react";
import "./GridLoader.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

const GridLoader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="main">
        <div className="tap"></div>
        <div className="tap"></div>
        <div className="tap"></div>
        <div className="tap"></div>
        <div className="body"></div>
        <div className="thumb"></div>
      </div>
    </Modal>
  );
};

export default GridLoader;
