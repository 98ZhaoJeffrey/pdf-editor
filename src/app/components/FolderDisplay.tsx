'use client'
import React, { useState } from 'react'
import FolderGridCard from './FolderGridCard'
import PDFGridCard from './PDFGridCard'

import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import FolderListCard from './FolderListCard';
import PDFListCard from './PDFListCard';

const GridView: React.FC = () => {
    return (
        <div className='overflow-y-scroll h-[76vh]'>
            <div className='flex flex-row flex-wrap gap-7'>
                <FolderGridCard />
                <FolderGridCard />
                <PDFGridCard />
                <PDFGridCard />
                <PDFGridCard />
                <PDFGridCard />
                <PDFGridCard />
            </div>
        </div>
    )
}

const ListView: React.FC = () => {
    return (
        <div className='overflow-y-scroll h-[75vh]'>
            <div className='flex flex-col'>
                <FolderListCard />
                <FolderListCard />
                <PDFListCard />
                <PDFListCard />
                <PDFListCard />
            </div>
        </div>
    )
}

interface FolderDisplayProps {
    category: string;
}

const FolderDisplay: React.FC<FolderDisplayProps> = ({ category }) => {
    const [gridView, setGridView] = useState<boolean>(true);
    return (
        <div className='pt-5 pl-14'>
            <div className='flex justify-between'>
                <h1 className='text-title'>{category}</h1>
                <button
                    onClick={() => setGridView(prev => !prev)}
                    className='rounded-full mr-20 mt-1 hover:bg-slate-200 p-5'
                    title={gridView ? 'Grid view' : 'List view'}
                >
                    {gridView ? <BsGrid3X3Gap size={25} /> : <BsListUl size={25} />}
                </button>
            </div>
            <hr className='mb-5 mt-8 mr-5' />
            {/* Displays all of the pdf files */}
            {gridView ? <GridView /> : <ListView />}
        </div>
    )
}

export default FolderDisplay