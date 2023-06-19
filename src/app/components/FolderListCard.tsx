import Link from 'next/link';
import React from 'react';
import { AiFillFolder } from 'react-icons/ai';

const FolderListCard: React.FC = () => {
    const folderID = "6490d4b8cec69343651d0bd4";
    return (
        <Link className='hover:drop-shadow-md' href={`/dashboard/folders/${folderID}`}>
            <div className="flex w-full h-20 bg-white p-6 justify-between border-b-slate-200 border-b">
                <div className='flex h-full gap-5 items-center'>
                    <AiFillFolder size={30} />
                    <h1 className='text-l font-medium'>Folder name</h1>
                </div>
                <div className='flex h-full items-center w-1/4 justify-between'>
                <h2 className='text-sm font-medium w-30'>2023-06-07</h2>
                    <div className='text-sm font-medium w-20'>―</div>
                </div>
            </div>
        </Link>
    );
}

export default FolderListCard;