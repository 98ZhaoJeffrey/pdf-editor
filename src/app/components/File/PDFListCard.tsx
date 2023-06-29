import React from 'react';
import { AiFillFilePdf } from 'react-icons/ai';

const PDFListCard: React.FC<{ name: string, lastUpdated: Date, size: number }> = ({ name, lastUpdated, size }) => {
    return (
        <div className='hover:drop-shadow-md'>
            <div className="flex w-full h-20 bg-white p-6 justify-between border-b-slate-200 border-b">
                <div className='flex h-full gap-5 items-center'>
                    <AiFillFilePdf size={30} color='red' />
                    <h1 className='text-l font-medium'>{name}</h1>
                </div>
                <div className='flex h-full items-center w-1/4 justify-between'>
                    <h2 className='text-sm font-medium w-30'>{lastUpdated ? lastUpdated.toLocaleDateString() : ''}</h2>
                    <div className='text-sm font-medium w-20'>{(size / 1000).toFixed(1)} Mb</div>
                </div>
            </div>
        </div>
    );
}

export default PDFListCard;