'use client'
import Link from 'next/link';
import React from 'react'
import { AiFillFolder, AiFillFilePdf } from 'react-icons/ai';

interface SearchItemProps {
    isFolder: boolean;
    name: string;
    id: string;
}

function SearchItem({ isFolder, name, id }: SearchItemProps) {
    const destinationLink = isFolder ? `/dashboard/folders/${id}` : `/editor/${id}`
    return (
        <Link className={`w-full flex justify-between px-5 py-2 bg-white z-10 relative hover:bg-slate-200`} href={destinationLink}>
            <div className='flex gap-5'>
                {isFolder ? <AiFillFolder size={25} /> : <AiFillFilePdf size={25} color='red'/>}
                <h1 className='w-96 truncate'>{name}</h1>
            </div>
        </Link>
    )
}

export default SearchItem
