'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { MdCreateNewFolder } from 'react-icons/md';
import { useParams } from 'next/navigation'

function AddFolderButton(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const params = useParams();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Perform folder creation logic
    console.log("test")
    if (params.folderID === undefined) {
      console.log('Creating folder in my drive:', folderName);
    } else {
      console.log(`Creating folder in ${params.folderID}: ${folderName}`);
    }
    closeModal();
    setFolderName("");
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        className="text-white w-full text-center p-5 rounded-xl hover:bg-emerald-600 hover:text-white font-medium"
        onClick={openModal}
      >
        <div className="flex items-center justify-start gap-3">
          <MdCreateNewFolder size="20" /> New Folder
        </div>
      </button>

      {open && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Create Folder</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Folder name"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                value={folderName}
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
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddFolderButton;