'use client'
import React, { ChangeEvent } from 'react'
import { MdAdd } from 'react-icons/md'

function AddFileButton() {
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        // Perform upload logic with the selected file here
        console.log('Selected file:', file?.name);
    };

    const handleClick = () => {
        const input = document.createElement('input');
        input.name = 'userfile';
        input.type = 'file';
        input.accept = 'application/pdf';
        input.addEventListener('change', (event) =>
            handleFileUpload(event as unknown as ChangeEvent<HTMLInputElement>)
        );
        input.click();
    };

    return (
        <button className='text-white w-full text-center p-5 rounded-xl hover:bg-emerald-600 hover:text-white font-medium'
            onClick={handleClick}>
            <div className='flex items-center justify-start gap-3'>
                <MdAdd size={20} /> New File
            </div>
        </button>
    )
}

export default AddFileButton