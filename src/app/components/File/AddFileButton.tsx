'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import jsPDF from 'jspdf';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import NameModal from '../Elements/NameModal';

function AddFileButton() {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    const params = useParams();
    const router = useRouter();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Perform file creation logic
        try {
            const doc = new jsPDF();

            const pdfBlob = doc.output('blob');
            const formData = new FormData();
            formData.append('file', pdfBlob, fileName);

            let parentID = null
            if (params.folderID !== undefined) {
                parentID = params.folderID
            } else {
                router.replace('/dashboard');
            }
            const response = await fetch(`/api/files/${parentID}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error(await response.text())
        } catch (e: any) {
            // Handle errors here
            console.error(e)
        }
        router.refresh();

        closeModal();
        setFileName("");
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
            <button className='text-white w-full text-center p-5 rounded-xl hover:bg-emerald-600 hover:text-white font-medium'
                onClick={openModal}>
                <div className='flex items-center justify-start gap-3'>
                    <MdAdd size={20} /> New File
                </div>
            </button>

            {open && (
                <NameModal
                    name={fileName}
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    closeModal={closeModal}
                    title={"New File"}
                />
            )}
        </>
    )
}

export default AddFileButton
