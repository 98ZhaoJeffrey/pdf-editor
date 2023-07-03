'use client'
import { ViewPreferenceContext } from '../../contexts/ViewPreferenceContext';
import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import React, { useContext } from 'react';
import { handleDrop } from '@/app/utils/drag-actions';
import { useParams, useRouter } from 'next/navigation'

interface ComponentProps {
    GridView: React.ReactNode;
    ListView: React.ReactNode;
    category: string;
}

const ClientFolderRender: React.FC<ComponentProps> = ({ GridView, ListView, category }) => {
    const { gridView, toggleView } = useContext(ViewPreferenceContext);
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className='pt-5 pl-14'>
                <div className='flex justify-between'
                    onDrop={async (e) => {
                        if (params.folderID !== undefined) {
                            await handleDrop(e, params.folderID, true);
                            router.refresh();
                        }
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                    }}>

                    <h1 className='text-title p-5 border-sky-500 rounded-3xl' id='text-title'>{category}</h1>
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