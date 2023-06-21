import React from 'react'
import FolderGridCard from './FolderGridCard'
import PDFGridCard from './PDFGridCard'
import FolderListCard from './FolderListCard';
import PDFListCard from './PDFListCard';
import ClientFolderRender from './ClientFolderRender';
import { Folder } from '@prisma/client';

const GridView: React.FC<{ folders: Array<Folder> }> = ({ folders }) => {
    return (
        <div className='overflow-y-scroll h-[76vh]'>
            <div className='flex flex-row flex-wrap gap-7'>
                {folders && folders.map((folder) => (
                    <FolderGridCard folderID={folder.id} lastAccessed={folder.lastUpdated} name={folder.name} />
                ))}
                <PDFGridCard />
                <PDFGridCard />
                <PDFGridCard />
                <PDFGridCard />
                <PDFGridCard />
            </div>
        </div>
    );
};

const ListView: React.FC<{ folders: Array<Folder> }> = ({ folders }) => {
    return (
        <div className='overflow-y-scroll h-[75vh]'>
            <div className='flex flex-col'>
                {folders && folders.map((folder) => (
                    <FolderListCard folderID={folder.id} lastAccessed={folder.lastUpdated} name={folder.name} />
                ))}
                <PDFListCard />
                <PDFListCard />
                <PDFListCard />
            </div>
        </div>
    )
}

interface FolderDisplayProps {
    category: string;
    folders: Array<Folder>
}

const FolderDisplay: React.FC<FolderDisplayProps> = ({ category, folders }) => {
    return (
        <ClientFolderRender GridView={<GridView folders={folders} />} ListView={<ListView folders={folders} />} category={category} />
    )
}

export default FolderDisplay