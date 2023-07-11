"use client"
import { Folder, File } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import { usePathname  } from 'next/navigation'

interface SearchbarProps {
    setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const Searchbar: React.FC<SearchbarProps> = ({ setFolders, setFiles }) => {
    const pathname = usePathname()
    const [hasRes, setHasRes] = useState(false);

    useEffect(() => {
        setHasRes(false)
        setFolders([])
        setFiles([])
    }, [pathname])
    const onChangeHandler = async (e: any) => {
        const value = e.target.value;
        if (value) {
            setHasRes(true)
            try {
                const res = await fetch(`/api/documents/${value}`)
                const data = await res.json()
                setFolders(data.folders)
                setFiles(data.files)
            } catch (e) {
                console.log(e)
                setFolders([])
                setFiles([])
            }
        } else {
            setHasRes(false)
            setFolders([])
            setFiles([])
        }
    }
    return (
        <form onChange={onChangeHandler} className={`relative flex m-2 rounded-3xl bg-white h-12 ${!hasRes ? "focus-within: shadow-2xl" : ''}`}>
            <div className="grid place-items-center h-full w-12 text-gray-300">
                <button type='submit' className='hover:bg-slate-200 rounded-full p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
            <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 rounded-3xl bg-white"
                type="text"
                placeholder="Search files"
            />
        </form>
    )
}

export default Searchbar
