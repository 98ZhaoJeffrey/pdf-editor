'use client'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { AiFillFilePdf } from 'react-icons/ai';
import ContextMenu from '../Elements/ContextMenu';
import NameModal from '../Elements/NameModal';
import { changeFileName, deleteFile, downloadFile } from '@/app/utils/dashboard-action';
import { handleDragEnd, handleDragStart } from '@/app/utils/drag-actions';
import Link from 'next/link';

const PDFGridCard: React.FC<{ name: string, lastUpdated: Date, size: number, fileID: string }> = ({ name, lastUpdated, size, fileID }) => {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState(name);
    const router = useRouter();
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);


        await changeFileName(fileName, fileID)
        router.refresh();

        closeModal();
        setFileName("");
        setIsLoading(false);
    };

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setMousePosition({
            x: event.clientX,
            y: event.clientY
        })
        setShowContextMenu(true);
    };

    const handleContextMenuOption = async (option: string) => {
        if (option === 'rename') {
            // Handle rename logic
            console.log('Rename option clicked');
            openModal();
        } else if (option === 'delete') {
            // Handle delete logic
            console.log('Delete option clicked');
            await deleteFile(fileID)
            router.refresh();
        } else if (option === 'download') {
            // handle download
            await downloadFile(fileID, name)
        }
        setShowContextMenu(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
            setShowContextMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div ref={cardRef}
                onContextMenu={handleContextMenu}
                className='relative'
                onDragStart={(e) => handleDragStart(e, fileID, true)}
                onDragEnd={handleDragEnd}>
                <Link className='hover:drop-shadow-md' draggable href={`/editor/${fileID}`}>
                    <div className="flex flex-col w-52 h-56 max-h-56 bg-white rounded-3xl mb-8 p-6 justify-between">
                        <AiFillFilePdf size={50} color='red' />
                        <div>
                            <h1 className='text-l font-bold truncate'>{name}</h1>
                            <h2 className='mt-1 mb-8 text-sm font-medium text-slate-400'>{lastUpdated ? lastUpdated.toLocaleDateString() : ''}</h2>
                        </div>
                    </div>
                    <div className='w-52 bg-slate-200 -mt-16 p-4 pl-6 rounded-b-3xl text-sm font-medium'>{(size / 1000000).toFixed(1)} Mb</div>
                </Link>
                {showContextMenu &&
                    <ContextMenu
                        isFile={true}
                        x={mousePosition.x}
                        y={mousePosition.y}
                        onClose={() => setShowContextMenu(false)}
                        onOptionSelect={handleContextMenuOption}
                    />}
            </div>
            {open && (
                <NameModal
                    name={fileName}
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    closeModal={closeModal}
                    title='Rename'
                />
            )}
        </>

    );
}

export default PDFGridCard;