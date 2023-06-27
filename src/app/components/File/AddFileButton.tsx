'use client'
import React, { ChangeEvent } from 'react'
import { MdAdd } from 'react-icons/md'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation';

function AddFileButton() {
    const params = useParams();
    const router = useRouter();

    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        // Perform upload logic with the selected file here
        if (file) {

            const maxSizeInBytes = 16 * 1024 * 1024;

            if (file.size >= maxSizeInBytes) {
                console.log("file exceeds max size")
                return
            }

            let parentID = null
            if (params.folderID !== undefined) {
                parentID = params.folderID
            } else {
                router.replace('/dashboard');
            }

            try {
                const formData = new FormData();
                formData.set('file', file);

                const response = await fetch(`/api/files/${parentID}`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) throw new Error(await response.text())
            } catch (e: any) {
                // Handle errors here
                console.error(e)
            }
        }
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