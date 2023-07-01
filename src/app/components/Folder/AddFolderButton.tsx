'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { MdCreateNewFolder } from 'react-icons/md';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import NameModal from '../Elements/NameModal';

async function saveFolder(folder: any) {
  const response = await fetch('/api/folders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(folder)
  });

  if (!response.ok) {
    alert("Something went wrong, please try again")
  }
  return await response.json();
}

function AddFolderButton(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [folderName, setFolderName] = useState('');
  const params = useParams();
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Perform folder creation logic
    let parentID = null
    if (params.folderID !== undefined) {
      parentID = params.folderID
    } else {
      router.replace('/dashboard');
    }

    const folder = {
      name: folderName,
      folderParentFolderId: parentID,
    }

    await saveFolder(folder)
    router.refresh();

    closeModal();
    setFolderName("");
    setIsLoading(false);
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
        <NameModal
          name={folderName}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          closeModal={closeModal}
          isCreate={true}
        />
      )}
    </>
  );
}

export default AddFolderButton;