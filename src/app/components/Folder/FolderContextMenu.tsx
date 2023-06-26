'use client'
import React from 'react';

interface ContextMenuProps {
  onClose: () => void;
  onOptionSelect: (option: string) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ onClose, onOptionSelect }) => {
  const handleContextMenuOption = (option: string) => {
    onOptionSelect(option);
    onClose();
  };

  return (
    <div className="absolute z-10 -mt-10 right-0 flex flex-col bg-white border border-gray-300 rounded-md shadow-lg">
      <div
        onClick={() => handleContextMenuOption('rename')}
        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        <span className="mr-2">Rename</span>
      </div>
      <div
        onClick={() => handleContextMenuOption('delete')}
        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        <span className="mr-2">Delete</span>
      </div>
    </div>
  );
};

export default ContextMenu;