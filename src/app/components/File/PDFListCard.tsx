'use client'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { AiFillFilePdf } from 'react-icons/ai';
import ContextMenu from '../Elements/ContextMenu';
import NameModal from '../Elements/NameModal';
import { changeFileName, deleteFile, downloadFile } from '@/app/utils/dashboard-action';
import { handleDragEnd, handleDragStart } from '@/app/utils/drag-actions';

const PDFListCard: React.FC<{ name: string, lastUpdated: Date, size: number, fileID: string }> = ({ name, lastUpdated, size, fileID }) => {

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
                <div className='hover:drop-shadow-md' draggable>
                    <div className="flex w-full h-20 bg-white p-6 justify-between border-b-slate-200 border-b">
                        <div className='flex h-full gap-5 items-center'>
                            <AiFillFilePdf size={30} color='red' />
                            <h1 className='text-l font-medium truncate  '>{name}</h1>
                        </div>
                        <div className='flex h-full items-center w-1/4 justify-between'>
                            <h2 className='text-sm font-medium w-30'>{lastUpdated ? lastUpdated.toLocaleDateString() : ''}</h2>
                            <div className='text-sm font-medium w-20'>{(size / 1000000).toFixed(1)} Mb</div>
                        </div>
                    </div>
                </div>
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
                    isCreate={false}
                />
            )}
        </>
    );
}

export default PDFListCard;