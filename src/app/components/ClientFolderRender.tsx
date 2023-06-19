'use client'
import { ViewPreferenceContext } from '../contexts/ViewPreferenceContext';
import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import React, { useContext } from 'react';

interface ComponentProps {
    GridView: React.ReactNode;
    ListView: React.ReactNode;
    category: string;
}

const ClientFolderRender: React.FC<ComponentProps> = ({ GridView, ListView, category }) => {
    const { gridView, toggleView } = useContext(ViewPreferenceContext);
    return (
        <>
            <div className='pt-5 pl-14'>
                <div className='flex justify-between'>
                    <h1 className='text-title'>{category}</h1>
                    <button
                        onClick={toggleView}
                        className='rounded-full mr-20 mt-1 hover:bg-slate-200 p-5'
                        title={gridView ? 'Grid view' : 'List view'}
                    >
                        {gridView ? <BsGrid3X3Gap size={25} /> : <BsListUl size={25} />}
                    </button>
                </div>
                <hr className='mb-5 mt-8 mr-5' />
                {/* Displays all of the pdf files */}
                {gridView ? GridView : ListView}
            </div>
        </>
    );
};

export default ClientFolderRender;