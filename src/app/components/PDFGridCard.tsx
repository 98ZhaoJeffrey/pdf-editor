import React from 'react';
import { AiFillFilePdf } from 'react-icons/ai';

const PDFGridCard: React.FC = () => {
    return (
        <div className='hover:drop-shadow-md'>
            <div className="flex flex-col w-52 h-56 max-h-56 bg-white rounded-3xl mb-8 p-6 justify-between">
                <AiFillFilePdf size={50} color='red' />
                <div>
                    <h1 className='text-l font-bold'>File name</h1>
                    <h2 className='mt-1 mb-8 text-sm font-medium text-slate-400'>2023-06-06</h2>
                </div>
            </div>
            <div className='w-52 bg-slate-200 -mt-16 p-4 pl-6 rounded-b-3xl text-sm font-medium'>20 Mb</div>
        </div>
    );
}

export default PDFGridCard;