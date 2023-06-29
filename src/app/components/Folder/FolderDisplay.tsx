import React from 'react'
import FolderGridCard from './FolderGridCard'
import PDFGridCard from '../File/PDFGridCard'
import FolderListCard from './FolderListCard';
import PDFListCard from '../File/PDFListCard';
import ClientFolderRender from './ClientFolderRender';
import { Folder } from '@prisma/client';

interface File {
    name: string,
    lastUpdated: Date,
    size: number
}

const GridView: React.FC<{ folders: Array<Folder>, files: Array<File> }> = ({ folders, files }) => {
    return (
        <div className='overflow-y-scroll h-[76vh]'>
            <div className='flex flex-row flex-wrap gap-7'>
                {folders && folders.map((folder) => (
                    <FolderGridCard folderID={folder.id} lastAccessed={folder.lastUpdated} name={folder.name} />
                ))}
                {files && files.map((file) => (
                    <PDFGridCard name={file.name} lastUpdated={file.lastUpdated} size={file.size} />
                ))}
            </div>
        </div>
    );
};

const ListView: React.FC<{ folders: Array<Folder>, files: Array<File> }> = ({ folders, files }) => {
    return (
        <div className='overflow-y-scroll h-[75vh]'>
            <div className='flex flex-col'>
                {folders && folders.map((folder) => (
                    <FolderListCard folderID={folder.id} lastAccessed={folder.lastUpdated} name={folder.name} />
                ))}
                {files && files.map((file) => (
                    <PDFListCard name={file.name} lastUpdated={file.lastUpdated} size={file.size} />
                ))}
            </div>
        </div>
    )
}

interface FolderDisplayProps {
    category: string;
    folders: Array<Folder>
    files: Array<File>
}

const FolderDisplay: React.FC<FolderDisplayProps> = ({ category, folders, files }) => {
    return (
        <ClientFolderRender GridView={<GridView folders={folders} files={files} />} ListView={<ListView folders={folders} files={files} />} category={category} />
    )
}

export default FolderDisplay