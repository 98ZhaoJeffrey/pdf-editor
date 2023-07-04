import { handleDrop } from '@/app/utils/drag-actions';
import Link from 'next/link'
import React from 'react'
import { useRouter } from "next/navigation"

const BreadCrumbItem: React.FC<{ isActive: boolean, url: string, name: string, folderID: string | null}> = ({ isActive, url, name, folderID }) => {
    const router = useRouter()
    return (
        <>
            {!isActive ?
                <div className='text-3xl flex py-4'
                    onDrop={async (e) => {
                        if (folderID !== undefined) {
                            await handleDrop(e, folderID);
                            router.refresh();
                        }
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                    }}>
                    <Link className='hover:bg-slate-200 px-5 mx-3 rounded-full' href={url}>
                        {name}
                    </Link>
                    <h1 className='text-gray-500 text-xl pt-1'>&gt;</h1>
                </div >
                :
                <h1 className='text-3xl pl-5 py-4 mx-3'>
                    {name}
                </h1>
            }
        </>

    )
}

export default BreadCrumbItem
