import React from 'react'
import FolderGridCard from './FolderGridCard'
import PDFGridCard from './PDFGridCard'
import FolderListCard from './FolderListCard';
import PDFListCard from './PDFListCard';
import ClientFolderRender from './ClientFolderRender';

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
    return (
        <ClientFolderRender GridView={<GridView />} ListView={<ListView />} category={category} />
    )
}

export default FolderDisplay