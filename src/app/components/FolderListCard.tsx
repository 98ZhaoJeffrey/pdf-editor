import React from 'react'

import { AiFillFolder } from "react-icons/ai";
const FolderListCard: React.FC = () => {
    return (
        <>
            <div className='hover:drop-shadow-md'>
                <div className="flex w-full h-20 bg-white p-6  justify-between border-b-slate-200 border-b">
                    <div className='flex h-full gap-5 items-center'>
                        <AiFillFolder size={30} />
                        <h1 className='text-l font-medium'>Folder name</h1>
                    </div>
                    <div className='flex h-full items-center w-1/4 justify-around'>
                        <h2 className='text-sm font-medium'>10 files</h2>
                        <div className='text-sm font-medium'>20 Mb</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FolderListCard