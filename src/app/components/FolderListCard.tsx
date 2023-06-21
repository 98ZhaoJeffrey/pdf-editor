import Link from 'next/link';
import React from 'react';
import { AiFillFolder } from 'react-icons/ai';

const FolderListCard: React.FC<{ folderID: string, lastAccessed: Date, name: string }> = ({ folderID, lastAccessed, name }) => {
    return (
        <Link className='hover:drop-shadow-md' href={`/dashboard/folders/${folderID}`}>
            <div className="flex w-full h-20 bg-white p-6 justify-between border-b-slate-200 border-b">
                <div className='flex h-full gap-5 items-center'>
                    <AiFillFolder size={30} />
                    <h1 className='text-l font-medium'>{name}</h1>
                </div>
                <div className='flex h-full items-center w-1/4 justify-between'>
                    <h2 className='text-sm font-medium w-30'>{lastAccessed ? lastAccessed.toLocaleDateString() : ''}</h2>
                    <div className='text-sm font-medium w-20'>―</div>
                </div>
            </div>
        </Link>
    );
}

export default FolderListCard;