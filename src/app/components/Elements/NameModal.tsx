'use client'
import React, { ChangeEvent, FormEvent } from 'react';

interface NameModalProps {
  name: string;
  isLoading: boolean;
  handleSubmit: (e: FormEvent) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
  isCreate: boolean;
}

const NameModal: React.FC<NameModalProps> = ({
  name,
  isLoading,
  handleSubmit,
  handleInputChange,
  closeModal,
  isCreate
}) => {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">{isCreate ? 'Create Folder' : 'Rename'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="new name"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            value={name}
            onChange={handleInputChange}
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 text-sm text-gray-500"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
              disabled={isLoading}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NameModal;