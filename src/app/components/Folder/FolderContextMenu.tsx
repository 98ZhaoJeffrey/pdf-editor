'use client'
import React from 'react';

interface ContextMenuProps {
  x: number,
  y: number,
  onClose: () => void;
  onOptionSelect: (option: string) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onOptionSelect }) => {

  var posX;
  var posY;
  (x < window.innerWidth / 2) ? posX = x : posX = x - 100;
  (y < window.innerHeight / 2) ? posY = y : posY = y - 80;

  const handleContextMenuOption = (option: string) => {
    onOptionSelect(option);
    onClose();
  };

  return (
    <div className="fixed z-10 flex flex-col bg-white border border-gray-300 rounded-md shadow-lg" style={{ top: `${posY}px`, left: `${posX}px` }}>
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