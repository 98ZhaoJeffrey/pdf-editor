import Link from 'next/link';
import React from 'react';
import { AiFillFolder } from 'react-icons/ai';

const FolderGridCard: React.FC = () => {
    const folderID = "Folder_name";
    return (
        <Link className='hover:drop-shadow-md' href={`/dashboard/folders/${folderID}`}>
            <div className="flex flex-col w-52 h-56 bg-white rounded-3xl mb-8 p-6  justify-between">
                <AiFillFolder size={50} />

                <div>
                    <h1 className='text-l font-bold'>Folder name</h1>
                    <h2 className='mt-1 mb-8 text-sm font-medium text-slate-400'>2023-06-07</h2>
                </div>
            </div>
            <div className='w-52 bg-slate-200 -mt-16 p-4 pl-6 rounded-b-3xl text-sm font-medium'>―</div>
        </Link>
    );
}

export default FolderGridCard;